#!/usr/bin/env python3
"""Re-screens the poster tiles as dither, for the Collections cover.

The homepage poster and the Collections cover are after two different printed
things. The poster is a screen print, and its tiles are drawn in a concentric
line screen. The cover is after a risograph-ish sheet whose photographs are
stippled — error-diffused noise, not lines — and dropping line-screen tiles
into that grid would read as two publications on one page.

The source photographs are not in the repo; the club's set is outside it and
only the baked tiles are committed. That is not actually a problem, because a
line screen is a tone encoding and not a destruction of one: tone was written
into the *width* of each ring, so blurring across the ring pitch reads it
straight back out. That recovered grey is what gets dithered here. Going
through the line screen costs some fine detail, which at the size these are
displayed is below what the eye gets anyway.

Three steps, and each one has a reason:

  1. Blur at the ring pitch to recover tone. Too tight and the rings survive
     as a moiré under the dither; too loose and the picture turns to fog.
  2. Stretch what comes back. Recovered tone sits in a narrow band around
     mid-grey — the screen never asked for the extremes — and a dither of a
     narrow band is an even field of noise with no picture in it.
  3. Floyd–Steinberg to one bit. Ordered dither would lay a regular lattice
     over the grid, and a regular lattice next to a ruled grid reads as a
     screen-door artefact rather than as ink.

    python3 scripts/stipple-tiles.py

It also writes one image that is not a tile: `title-ink.png`, the texture the
cover's title is filled with. A letterform is a far narrower window than a
cell is — all you see of the picture through an O is a few dozen pixels — so
filling type with a whole photograph gives a word that is solid for most of
its letters and hollow wherever the picture happened to be bright. The fill is
instead the densest band of the darkest tile, mirror-tiled across: mirroring
is what makes it seamless, because the strip then begins and ends on the same
column of pixels and can repeat against itself without a join.

    python3 scripts/stipple-tiles.py

Writes public/projects/stipple/NN.png beside the line-screen set.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "projects" / "poster"
DEST = ROOT / "public" / "projects" / "stipple"

# The tiles are 820px carrying 76 rings, so a ring is about 10.8px. Blurring
# at roughly half a pitch averages each ring against its neighbour without
# reaching across more than one.
BLUR = 5.0

# What the cover's tiles are actually seen at. Dither has to be applied at
# display size: a one-bit pattern baked at 820px and then resampled down to
# 190 by the browser is averaged back into grey mush, which is the one thing
# a stipple must not become.
SIZE = 320

# Where the recovered tone is cut off at each end, as percentiles, before it
# is stretched back across the full range.
FLOOR, CEIL = 4.0, 96.0

# Pushes the stretched tone toward white. The reference sheet is mostly paper
# with the picture emerging out of it, so the tiles want to sit light.
GAMMA = 1.35


def dither(tone: np.ndarray) -> np.ndarray:
    """Floyd-Steinberg, in place, serpentine-free. Operates on 0..1."""
    out = tone.copy()
    h, w = out.shape
    for y in range(h):
        for x in range(w):
            old = out[y, x]
            new = 1.0 if old > 0.5 else 0.0
            out[y, x] = new
            err = old - new
            if x + 1 < w:
                out[y, x + 1] += err * 7 / 16
            if y + 1 < h:
                if x:
                    out[y + 1, x - 1] += err * 3 / 16
                out[y + 1, x] += err * 5 / 16
                if x + 1 < w:
                    out[y + 1, x + 1] += err * 1 / 16
    return out


def stipple(src: Path, dest: Path) -> None:
    image = Image.open(src).convert("L")
    # Blur first, at full size, then resample: blurring after the downsample
    # would be blurring a picture whose rings had already aliased.
    tone = image.filter(ImageFilter.GaussianBlur(BLUR)).resize(
        (SIZE, SIZE), Image.LANCZOS
    )
    arr = np.asarray(tone, dtype=np.float64) / 255.0

    lo, hi = np.percentile(arr, FLOOR), np.percentile(arr, CEIL)
    if hi - lo < 1e-3:
        hi = lo + 1e-3
    arr = np.clip((arr - lo) / (hi - lo), 0.0, 1.0) ** (1.0 / GAMMA)

    out = (dither(arr) * 255).astype(np.uint8)
    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out, mode="L").save(dest, optimize=True)


# Which tile the title is filled from, and the band of it that is densest.
TITLE_SOURCE = "02.png"
TITLE_BAND = (0.10, 0.40)
TITLE_REPEATS = 4


def title_ink(dest: Path) -> None:
    band = Image.open(DEST / TITLE_SOURCE).convert("L")
    top = int(band.height * TITLE_BAND[0])
    bottom = int(band.height * TITLE_BAND[1])
    strip = band.crop((0, top, band.width, bottom))

    flipped = strip.transpose(Image.FLIP_LEFT_RIGHT)
    out = Image.new("L", (strip.width * TITLE_REPEATS, strip.height))
    for i in range(TITLE_REPEATS):
        out.paste(strip if i % 2 == 0 else flipped, (i * strip.width, 0))
    out.save(dest, optimize=True)
    print(f"{dest.relative_to(ROOT)}  {out.width}x{out.height}  title fill")


def main() -> int:
    tiles = sorted(p for p in SRC.glob("[0-9][0-9].png"))
    if not tiles:
        print(f"no tiles in {SRC}")
        return 1
    for tile in tiles:
        dest = DEST / tile.name
        stipple(tile, dest)
        print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} kB")
    title_ink(DEST / "title-ink.png")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
