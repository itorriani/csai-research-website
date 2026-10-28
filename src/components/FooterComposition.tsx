// The square composition that closes the footer.
//
// Seven solid squares on a white field, in the concrete-art tradition the
// rest of the site borrows from: no perspective, no outline, nothing drawn
// that isn't mass. The arrangement is the picture.
//
// Measured off the reference print rather than eyeballed. Every square is
// exact, every gap between them is the same six units, and three of them
// hang from a shared top edge — that regularity is why the cluster reads as
// a construction instead of as scatter, and it is the first thing lost if
// the numbers are nudged by hand.

// x, y, size — in composition units, origin at the cluster's top left.
const SQUARES: [number, number, number][] = [
  [0, 0, 78],     // the left block, top-aligned with the mass
  [84, 0, 145],   // the mass
  [235, 0, 14],   // the outlier, holding the same top edge
  [235, 95, 63],  // right of the mass, dropped
  [84, 151, 50],  // the two below, hung off the mass's lower edge
  [140, 151, 35],
  [264, 164, 40], // the far corner, carrying the eye out
];

const W = 304;
const H = 204;

export default function FooterComposition({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      // Pinned bottom right and fitted whole. The composition depends on the
      // relative weight of the squares, so it is never cropped — a clipped
      // corner reads as a layout fault rather than as part of the drawing.
      preserveAspectRatio="xMaxYMax meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {SQUARES.map(([x, y, s]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={s} height={s} fill="currentColor" />
      ))}
    </svg>
  );
}
