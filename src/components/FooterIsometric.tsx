// The isometric lattice that closes the footer.
//
// Boxes drawn as open wireframes and type laid flat onto the planes they
// imply — the construction is the picture. The reference for it is white on
// a deep blue; on the footer's paper the whole thing is inverted and set in
// the cover's own blue, which turns it from a poster into what the drawing
// has always really been, which is a blueprint.
//
// Everything is placed in grid units rather than in pixels. The three unit
// vectors below are the whole geometry: a point at (x, y, z) in box-space is
// x steps along one floor axis, y along the other, z up.

const U = 40; // one grid unit, in svg px

const EX: [number, number] = [0.866 * U, 0.5 * U]; // right and down
const EY: [number, number] = [-0.866 * U, 0.5 * U]; // left and down
const UP = U; // straight up

function at(x: number, y: number, z: number): [number, number] {
  return [x * EX[0] + y * EY[0], x * EX[1] + y * EY[1] - z * UP];
}

// The nine edges of a box that are actually visible from above. A cube seen
// isometrically hides exactly one vertex — the far-bottom one — and the three
// edges that meet there; drawing all twelve is what makes a wireframe read as
// a diagram rather than as an object.
function box(ox: number, oy: number, oz: number, w: number, d: number, h: number) {
  const v = (x: number, y: number, z: number) => at(ox + x, oy + y, oz + z);
  const [p0, p1, , p3, p4, p5, p6, p7] = [
    v(0, 0, 0), v(w, 0, 0), v(w, d, 0), v(0, d, 0),
    v(0, 0, h), v(w, 0, h), v(w, d, h), v(0, d, h),
  ];
  const seg = (a: [number, number], b: [number, number]) =>
    `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  return [
    seg(p0, p1), seg(p0, p3), seg(p0, p4), // the near corner
    seg(p1, p5), seg(p3, p7), // the two standing edges beside it
    seg(p4, p5), seg(p5, p6), seg(p6, p7), seg(p7, p4), // the lid
  ].join("");
}

// A line of the floor grid, run well past the boxes so the lattice reads as a
// fragment of something larger rather than as three objects on a white field.
function rule(a: [number, number, number], b: [number, number, number]) {
  const [ax, ay] = at(...a);
  const [bx, by] = at(...b);
  return `M${ax.toFixed(1)} ${ay.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}`;
}

// The two planes type can lie on. Both keep the vertical vertical — letters
// are sheared onto the plane, not rotated into it, which is what the
// reference does and why its words stay readable.
const DESCENDING = "matrix(0.866, 0.5, 0, 1, 0, 0)"; // runs down to the right
const ASCENDING = "matrix(0.866, -0.5, 0, 1, 0, 0)"; // runs up to the right

export default function FooterIsometric({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-190 -230 610 450"
      // Fitted whole and pinned to the bottom right rather than cropped to
      // the band's height. The drawing is a construction — a box cut off
      // halfway down reads as a rendering fault, where the same box drawn
      // small and complete reads as a diagram.
      preserveAspectRatio="xMaxYMax meet"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ color: "var(--color-poster-blue)" }}
    >
      {/* The floor, then the boxes standing on it. */}
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
        <path d={rule([-2, 0, 0], [9, 0, 0])} />
        <path d={rule([-2, 3.4, 0], [9, 3.4, 0])} />
        <path d={rule([0, -2, 0], [0, 7, 0])} />
        <path d={rule([5.2, -2, 0], [5.2, 7, 0])} />
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.62">
        <path d={box(0, 0, 0, 5.2, 3.4, 1.5)} />
        <path d={box(5.2, 0, 0, 2.4, 3.4, 3.6)} />
        <path d={box(0, 3.4, 0, 2.2, 2.2, 2.4)} />
      </g>

      {/* The name, laid on the plane the tall box faces. */}
      <text
        transform={`translate(-46 -92) ${DESCENDING}`}
        fill="currentColor"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 900,
          fontSize: 92,
          letterSpacing: "-0.03em",
        }}
      >
        CSAI
      </text>

      {/* The season, on the plane running the other way. */}
      <text
        transform={`translate(168 -4) ${ASCENDING}`}
        fill="currentColor"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 900,
          fontSize: 40,
          letterSpacing: "-0.02em",
        }}
      >
        W26
      </text>

      {/* A caption block, set small and tracked on an ascending plane, the way
          the reference tucks its paragraphs into the faces. */}
      <text
        transform={`translate(-178 92) ${ASCENDING}`}
        fill="currentColor"
        opacity="0.72"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 9.5,
          letterSpacing: "0.18em",
        }}
      >
        <tspan x="0" dy="0">CSAI RESEARCH</tspan>
        <tspan x="0" dy="14">CAL POLY, SAN LUIS OBISPO</tspan>
        <tspan x="0" dy="14">93407 CALIFORNIA</tspan>
      </text>
    </svg>
  );
}
