#!/usr/bin/env python3
"""Puts a 35mm motion-picture grade on the project photographs.

The stills are stock photographs and they arrive looking like stock
photographs: clean, even, digital. This emulates colour negative shot on 35mm
and printed — which is a specific set of things, not just "contrast and
noise":

  * The curve has a toe and a shoulder. Film does not clip, it rolls off, and
    nothing on a print reaches zero.
  * Highlights lose their colour. As a dye layer saturates it stops
    discriminating hue, so a bright passage drifts toward white. Digital does
    the opposite and clips into a colour.
  * Shadows go cool and highlights go warm. This is the single move that most
    reads as "film" to an eye that has watched a lot of film.
  * The bright passages bleed. Light scatters off the back of the base and
    re-exposes the emulsion from behind, and because the red layer is
    furthest down it bleeds reddest. That is halation.
  * Grain is in three layers, not one. The three dye layers are independently
    grainy and the blue layer is the worst of them, so film grain carries a
    faint colour speckle that monochrome noise never gets right.

    Grain size is the thing most often got wrong. It is a physical size on
    the negative, so what matters is how big it lands *on a screen*, not how
    big it is in the file. A grain baked one pixel wide into a 3840px master
    is a third of a pixel by the time the page has resampled it to fit, and
    it disappears. These clusters are sized against the width the picture is
    actually displayed at.

    python3 scripts/film-grade.py [paths...]

It writes in place, which means it has to know what it has already done: a
second pass would curve an already-curved photograph and grain the grain.
Every result's digest is recorded in `.film-grade.json` beside the pictures,
and a file whose digest is already in there is skipped. Pass `--regrade` to do
it anyway — after editing the numbers below, say.
"""

import hashlib
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "public" / "projects" / ".film-grade.json"

# The photographs the run is built from. The poster tiles are not here: they
# are two-tone by the time they are written and carry their own screen.
DEFAULT = [
    "public/projects/mind-the-noise-band.jpg",
    "public/projects/canary-siren-color.jpg",
    "public/projects/social-simulation-crowd.jpg",
]

# How wide these are actually seen. The stills are full-bleed, so this is a
# laptop's worth of CSS pixels — the master is two to three times that, and
# the grain is scaled by the ratio.
DISPLAY_W = 1600
GRAIN_PX = 1.9  # how big a grain cluster should land, in display pixels
GRAIN = 0.042  # and how hard it bites in the midtones

# Relative graininess of the three dye layers. Blue is the fastest and the
# worst, which is where film's colour speckle comes from.
LAYER = np.array([1.0, 0.78, 1.45], np.float32)

SATURATION = 1.26
CONTRAST = 0.40
TOE = 0.040  # how far off zero the blacks sit
HIGHLIGHT_BLEACH = 0.40  # how much colour the brightest passages give up
VIGNETTE = 0.30


def smoothstep(x):
    return x * x * (3 - 2 * x)


def grade(im, seed):
    rng = np.random.default_rng(seed)
    a = np.asarray(im.convert("RGB"), dtype=np.float32) / 255.0
    H, W, _ = a.shape

    def lum(t):
        return (t * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(-1, keepdims=True)

    a = np.clip(lum(a) + (a - lum(a)) * SATURATION, 0, 1)

    # Toe, S, shoulder. The shoulder is the one that matters: it is why a
    # window in a film frame goes soft and warm instead of turning into a
    # flat white hole.
    a = a * (1 - TOE) + TOE
    a = a + CONTRAST * (smoothstep(a) - a)
    a = 1 - (1 - a) ** 1.14

    # Highlights bleach toward white as the dye layers saturate.
    bleach = np.clip((lum(a) - 0.58) / 0.42, 0, 1) ** 1.4
    a = a + (lum(a) - a) * bleach * HIGHLIGHT_BLEACH

    # Shadows cool, highlights warm.
    y = lum(a)
    shadow, highlight = (1 - y) ** 2, y**2
    a = a + np.concatenate(
        [
            0.042 * highlight - 0.020 * shadow,
            0.008 * highlight - 0.002 * shadow,
            0.050 * shadow - 0.026 * highlight,
        ],
        axis=-1,
    )
    a = np.clip(a, 0, 1)

    # Halation, reddest because the red layer sits deepest in the stack.
    hot = np.clip((lum(a) - 0.64) / 0.36, 0, 1) ** 2
    hot = (
        np.asarray(
            Image.fromarray((hot[..., 0] * 255).astype(np.uint8)).filter(
                ImageFilter.GaussianBlur(min(W, H) / 55)
            ),
            dtype=np.float32,
        )[..., None]
        / 255.0
    )
    a = 1 - (1 - a) * (1 - hot * np.array([0.38, 0.15, 0.06], np.float32))

    # Grain. Sized against the width this will be seen at, drawn once per dye
    # layer, and weighted to the midtones — film grain thins out in the toe
    # and is scarcely there at all in a blown highlight.
    cluster = max(2.0, GRAIN_PX * (W / DISPLAY_W))
    gh, gw = max(2, round(H / cluster)), max(2, round(W / cluster))
    layers = []
    for k in LAYER:
        small = np.clip(rng.normal(0, 1, (gh, gw)) * 52 + 128, 0, 255).astype(np.uint8)
        up = np.asarray(
            Image.fromarray(small).resize((W, H), Image.BICUBIC), dtype=np.float32
        )
        layers.append((up - 128) / 52.0 * k)
    y = lum(a)
    a = a + np.stack(layers, axis=-1) * GRAIN * (0.30 + 0.70 * (1 - np.abs(2 * y - 1)))

    # The corners fall away, and toward the page's own ink rather than grey.
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    r = np.sqrt(((xx / W - 0.5) * 2) ** 2 + ((yy / H - 0.5) * 2) ** 2)[..., None] / 1.414
    a = a * (1 - VIGNETTE * np.clip(r, 0, 1) ** 2.1)

    out = Image.fromarray(np.clip(a * 255, 0, 255).astype(np.uint8))

    # The red and blue records land at very slightly different scales, the way
    # a spherical lens puts them down. Under a pixel at the edges.
    bands = list(out.split())
    for i, scale in ((0, 1.0008), (2, 0.9993)):
        b = bands[i].resize((round(W * scale), round(H * scale)), Image.BICUBIC)
        ox, oy = (b.width - W) // 2, (b.height - H) // 2
        bands[i] = b.crop((ox, oy, ox + W, oy + H))
    return Image.merge("RGB", bands)


def main():
    args = [a for a in sys.argv[1:] if a != "--regrade"]
    regrade = "--regrade" in sys.argv[1:]
    targets = [ROOT / a for a in (args or DEFAULT)]

    done = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}

    for path in targets:
        if not path.exists():
            print(f"  skipped {path.name} — not found")
            continue
        key = str(path.relative_to(ROOT))
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if not regrade and done.get(key) == digest:
            print(f"  {path.name} already graded")
            continue

        # The seed is the file's own name, so a picture grains the same way
        # every time it is graded rather than differently on every run.
        seed = int(hashlib.sha256(path.name.encode()).hexdigest()[:8], 16)
        # 4:2:2 rather than full chroma. Grain is by design the part of a
        # picture a codec cannot predict, so it is expensive to encode — and
        # the delivered file is a webp the optimiser writes at 4:2:0 anyway,
        # so full chroma here buys weight and nothing else.
        grade(Image.open(path), seed).save(
            path, quality=88, subsampling=1, optimize=True, progressive=True
        )
        done[key] = hashlib.sha256(path.read_bytes()).hexdigest()
        print(f"  {path.name}: {path.stat().st_size / 1e6:.2f} MB")

    MANIFEST.write_text(json.dumps(done, indent=2, sort_keys=True) + "\n")


if __name__ == "__main__":
    main()
