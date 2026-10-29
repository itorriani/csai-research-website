#!/usr/bin/env python3
"""Turns a scanned drawing into a plate that can stand behind the masthead.

The About sheet's figure set the treatment and this reproduces it rather than
inventing a second one: the drawings all have to read as one set, printed in
the same ink on the same paper, or the mastheads stop looking like pages of
the same publication.

Three things happen, in this order, and each of them matters:

  1. The paper is taken out. A scanned drawing carries the tooth of the stock
     it was drawn on, and that tooth is the same mid-grey as the faintest
     washes in the drawing itself. A fixed threshold cannot serve all three
     of these scans — one is smooth cartridge, one is heavy cold-press whose
     tooth is darker than the lightest wash on the smooth one — so the cut is
     made from each sheet's own grain instead: find the tone the bare paper
     sits at, measure how far that tone wanders, and cut below the wander.
     Rough stock cuts deeper, smooth stock barely at all, and neither needs a
     number chosen by hand.

  2. What is left is read as ink *coverage* rather than as colour. The source
     scans are variously black ink, grey wash and one maroon bleed; mapping
     their hues through would give three different plates. Luminance alone
     gives one, and it is the right one: a brush leaves more or less ink, and
     that is all this needs to know.

  3. The coverage is printed in the house ink on the house stock, by
     interpolating between the two anchors below. They are read off the About
     figure, so a plate made here lands on exactly the tone that one does.

The plates are laid on the sheet with `mix-blend-multiply`, so the paper tone
written here is what drops out against the stock. It is not white: a pure
white ground would knock a hole in a cream or off-white sheet.

    python3 scripts/ink-plate.py SOURCE DEST [SOURCE DEST ...]

Writes PNG. Unlike film-grade.py this never writes in place and keeps no
manifest — the sources live outside the repo, and the destinations are
derived artefacts that can always be made again.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

# Both read off public/about/figure-ink.png, which is the reference plate.
INK = np.array([40, 74, 127], dtype=np.float64)
PAPER = np.array([244, 245, 248], dtype=np.float64)

# How many spreads of the paper's own tooth to cut below it. The tone and the
# spread are both taken with median statistics rather than a mean and a
# standard deviation, and that is the whole trick: the drawing is a long dark
# tail on the histogram, and a mean walks toward it while a median does not.
# One spread clears the tooth on all three of these stocks — the cold-press
# scan, whose tooth is six times rougher than the others', cuts six times
# deeper for free, which is exactly what it needs.
TOOTH_SPREADS = 1.0

# Scales the median absolute deviation so one unit of it means the same thing
# a standard deviation would on a normal distribution.
MAD_TO_SIGMA = 1.4826

# How dark the darkest stroke is allowed to get, as a fraction of full ink.
# Short of 1.0 on purpose: these sit at low opacity behind type, and a plate
# that reaches full ink anywhere pulls the eye to that spot.
MAX_COVERAGE = 0.96

# Bends the coverage ramp. Above 1 holds the mid-tones back, which keeps a
# wash reading as a wash instead of filling in to a solid.
GAMMA = 1.22


def plate(src: Path, dest: Path) -> None:
    image = Image.open(src).convert("RGB")
    rgb = np.asarray(image, dtype=np.float64) / 255.0

    # Rec. 709 luma. Not the mean of the channels: the maroon bleed in one of
    # these scans is far darker to the eye than its average channel suggests,
    # and averaging would print it as a pale ghost.
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722])

    tone = float(np.median(luma))
    tooth = float(np.median(np.abs(luma - tone))) * MAD_TO_SIGMA
    white = tone - TOOTH_SPREADS * tooth
    black = max(float(luma.min()), 0.0)
    if white <= black:
        white = black + 1e-3

    # Coverage: 0 where the sheet is bare, 1 at the darkest stroke.
    coverage = np.clip((white - luma) / (white - black), 0.0, 1.0)
    coverage = coverage ** GAMMA * MAX_COVERAGE

    out = PAPER + (INK - PAPER) * coverage[..., None]
    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(dest)

    print(
        f"{dest}  {image.width}x{image.height}  "
        f"paper cut at {white:.3f}  ink over {coverage.mean():.1%} of the sheet"
    )


def main(argv: list[str]) -> int:
    if len(argv) < 2 or len(argv) % 2:
        print(__doc__, file=sys.stderr)
        return 2
    for src, dest in zip(argv[0::2], argv[1::2]):
        plate(Path(src), Path(dest))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
