#!/usr/bin/env python3
"""Bakes the halftone tiles the homepage poster is built from.

The cover is set after a screen-printed match poster: a flat blue ground, a
sparse three-by-four grid, and eight photographs reduced to a concentric line
screen — black and white, no grey except what the line weight makes.

Three things have to happen to a photograph before it reads that way, and the
order matters:

  1. It is blown up. The tiles in the reference are not pictures of a match,
     they are small crops of one enlarged past the point of being readable.
     That abstraction is the effect; a whole lecture hall shrunk into a square
     would just be a small photograph with a pattern over it.
  2. It is pushed to near two tones. The line screen can only draw what the
     midtones ask for — where the picture is almost black or almost white, the
     screen closes up or opens out entirely, and those solid passages are what
     give the tiles their shapes.
  3. Then the screen goes on: rings about a centre, usually a centre outside
     the tile, so most tiles carry long shallow arcs and only one or two show
     the bullseye.

Run it against the photo set:

    python3 scripts/poster-tiles.py <photo-dir>

The photographs are not in the repo — they are the CSAI group set. Only the
tiles and the ground texture this writes are committed.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

# More tiles than the grid has cells: each cell holds a pair and trades
# between them, so the poster keeps changing without ever showing the same
# photograph in two places at once.
TILES = 16
SIZE = 820

# Rings across the width of a tile. Finer than the first pass, because the
# ring count is the screen's tonal resolution as well as its texture: fewer
# rings means fewer steps of line weight available to describe a face, and a
# room drawn in four tones is a pattern rather than a photograph. Still far
# coarser than the reference, which is print — a tile is only a couple of
# hundred pixels on a screen, and a screen as fine as the poster's would land
# under two pixels a ring and turn to mud.
RINGS = 76

SEED = 31


def choose(photos, want, seed):
    """Pick a varied set.

    The frames come in runs — the same room, the same minute, a few degrees
    apart — so each photograph is reduced to a coarse thumbnail and the set is
    built greedily: take the frame least like everything already taken.
    """
    signatures = np.stack(
        [
            np.asarray(
                Image.open(p).convert("L").resize((12, 12), Image.BILINEAR), dtype=np.float32
            ).ravel()
            for p in photos
        ]
    )
    signatures -= signatures.mean(axis=1, keepdims=True)  # ignore plain exposure

    rng = np.random.default_rng(seed)
    taken = [int(rng.integers(len(photos)))]
    distance = np.linalg.norm(signatures - signatures[taken[0]], axis=1)
    while len(taken) < want:
        nxt = int(distance.argmax())
        taken.append(nxt)
        distance = np.minimum(distance, np.linalg.norm(signatures - signatures[nxt], axis=1))
    return [photos[i] for i in taken]


def enlarge(path, rng):
    """A small square of the photograph, blown up past legibility.

    The window is not placed at random. A lecture hall is mostly ceiling and
    wall, and a window dropped into one of those comes back as an even grey
    that the screen renders as a flat field of identical rings. Several
    candidates are tried and the one with the most going on wins.
    """
    img = Image.open(path).convert("L")
    w, h = img.size
    side = int(min(w, h) * rng.uniform(0.32, 0.48))

    best, best_score = None, -1.0
    for _ in range(24):
        x = int(rng.uniform(0, w - side))
        y = int(rng.uniform(0, h - side))
        window = img.crop((x, y, x + side, y + side))
        a = np.asarray(window.resize((64, 64), Image.BILINEAR), dtype=np.float32)
        detail = 0.5 * (np.abs(np.diff(a, axis=0)).mean() + np.abs(np.diff(a, axis=1)).mean())
        score = a.std() - 0.9 * detail
        if score > best_score:
            best, best_score = window, score

    return best.resize((SIZE, SIZE), Image.LANCZOS)


def two_tone(img, rng):
    """Lift the contrast, but stop well short of two tones.

    The first pass threw an S at this twice over and came back with eight
    tiles of black-and-white shapes — the effect, and nothing of the room
    left under it. One moderate S instead: enough that the screen has real
    blacks and real whites to close and open on, little enough that the
    midtones in between still carry the ceiling, the rows of seats and the
    people in them.
    """
    # Just enough to keep sensor noise from breaking every ring; less than
    # before, because at this crop the detail is the picture.
    a = np.asarray(img.filter(ImageFilter.GaussianBlur(SIZE / 700)), dtype=np.float32) / 255.0

    # Stretch to the frame's own range before the curve, so a flatly lit room
    # and a backlit one arrive at the curve on the same terms.
    lo, hi = np.percentile(a, 2), np.percentile(a, 98)
    a = np.clip((a - lo) / max(hi - lo, 1e-3), 0, 1)

    a = np.clip(a * rng.uniform(0.94, 1.06) + rng.uniform(-0.03, 0.03), 0, 1)
    # Opened up before the S. These are rooms lit from the front, and left
    # as they are the whole back half of one closes the screen up into a
    # solid black that no amount of line weight gets back out of.
    a = a**0.82
    return a + 0.40 * (a * a * (3 - 2 * a) - a)


def screen(tone, rng):
    """Lay the line screen over the tone.

    Rings about a centre. Where the picture is dark the black ring is fat and
    the white gap thin; where it is light, the reverse — so tone is carried by
    line weight, which is what a line screen is.
    """
    yy, xx = np.mgrid[0:SIZE, 0:SIZE].astype(np.float32)

    # The centre is usually off the tile. Keeping it on the tile every time
    # would put a bullseye in every square and the grid would read as
    # wallpaper rather than as eight separate prints.
    if rng.random() < 0.3:
        cx, cy = rng.uniform(0.2, 0.8, size=2) * SIZE
    else:
        angle = rng.uniform(0, 2 * np.pi)
        reach = rng.uniform(1.1, 3.0) * SIZE
        cx, cy = SIZE / 2 + np.cos(angle) * reach, SIZE / 2 + np.sin(angle) * reach

    dx, dy = xx - cx, yy - cy
    r = np.sqrt(dx * dx + dy * dy)
    # A slow wobble around the centre, so the rings are drawn rather than
    # plotted — the reference's rings are never quite concentric.
    pitch = SIZE / RINGS
    r = r + pitch * 0.28 * np.sin(np.arctan2(dy, dx) * rng.integers(2, 5) + rng.uniform(0, 6.3))

    wave = np.abs(2 * (r / pitch % 1.0) - 1)  # a triangle along the radius

    # Soft edge of about a pixel. A hard threshold is what the print has, but
    # a hard threshold at this pitch aliases into moiré the moment a browser
    # resamples it, and a browser always resamples it.
    aa = 2.4 / pitch
    return np.clip((wave - tone) / aa + 0.5, 0, 1)


def ground(size, seed):
    """The woven texture the blue ground is printed on, as a tile."""
    rng = np.random.default_rng(seed)
    a = rng.normal(0.5, 0.16, (size, size)).astype(np.float32)
    # Pull the noise into a weave by smearing it along each axis in turn and
    # averaging — a canvas is threads, not grain.
    warp = np.asarray(
        Image.fromarray(np.clip(a * 255, 0, 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(0.6)
        ),
        dtype=np.float32,
    )
    weave = 0.5 * (np.roll(warp, 1, axis=0) + np.roll(warp, 1, axis=1))
    out = np.clip(0.5 * warp + 0.5 * weave, 0, 255)
    # Wrap the edges into each other so the tile repeats without a seam.
    k = size // 8
    ramp = np.linspace(0, 1, k, dtype=np.float32)
    out[:k] = out[:k] * ramp[:, None] + out[-k:][::-1] * (1 - ramp[:, None])
    out[:, :k] = out[:, :k] * ramp[None, :] + out[:, -k:][:, ::-1] * (1 - ramp[None, :])
    return Image.fromarray(out.astype(np.uint8), mode="L")


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "photos")
    photos = sorted(p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"})
    if len(photos) < TILES:
        sys.exit(f"need at least {TILES} photographs in {src}, found {len(photos)}")

    out = Path(__file__).resolve().parent.parent / "public" / "projects" / "poster"
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*.png"):
        old.unlink()

    rng = np.random.default_rng(SEED)
    total = 0
    for i, photo in enumerate(choose(photos, TILES, SEED), 1):
        tone = two_tone(enlarge(photo, rng), rng)
        plate = Image.fromarray((screen(tone, rng) * 255).astype(np.uint8), mode="L")
        path = out / f"{i:02d}.png"
        # PNG, not JPEG: these are two-tone, and JPEG puts a grey halo on
        # every edge of them — which at this line pitch is every pixel.
        plate.save(path, optimize=True)
        total += path.stat().st_size

    ground(256, SEED).save(out / "ground.png", optimize=True)
    print(f"{TILES} tiles at {SIZE}x{SIZE}, {total / 1e6:.2f} MB, plus the ground texture")


if __name__ == "__main__":
    main()
