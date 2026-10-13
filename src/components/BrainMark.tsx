// The CSAI brain-network mark, redrawn as vector so it scales cleanly and
// inherits its colour from the text around it (white over the hero, ink on
// white pages). Two fills of the same graph: "light" leaves most nodes open,
// "heavy" solidifies them.
//
// The edges are masked at every node so an open circle reads as a true hole —
// nothing shows through it — which lets the mark sit over the hero video
// without needing an opaque backing colour.

type Node = { id: string; x: number; y: number; r: number };

const NODES: Node[] = [
  { id: "a", x: 56.4, y: 3.0, r: 3.6 },
  { id: "b", x: 21.4, y: 13.0, r: 5.4 },
  { id: "c", x: 42.7, y: 18.7, r: 5.0 },
  { id: "d", x: 67.7, y: 24.1, r: 5.0 },
  { id: "e", x: 88.9, y: 27.1, r: 3.6 },
  { id: "f", x: 8.2, y: 39.5, r: 8.0 },
  { id: "g", x: 28.2, y: 27.1, r: 3.0 },
  { id: "h", x: 53.5, y: 39.2, r: 7.5 },
  { id: "i", x: 78.1, y: 47.2, r: 5.0 },
  { id: "j", x: 96.6, y: 52.4, r: 3.6 },
  { id: "k", x: 30.1, y: 57.6, r: 5.0 },
  { id: "l", x: 54.2, y: 61.7, r: 3.6 },
  { id: "m", x: 73.7, y: 75.3, r: 5.4 },
];

const EDGES: [string, string][] = [
  ["b", "a"], ["a", "e"], ["a", "c"],
  ["b", "f"], ["b", "g"], ["g", "c"],
  ["c", "d"], ["d", "e"], ["f", "g"],
  ["g", "k"], ["f", "k"], ["k", "h"],
  ["k", "l"], ["h", "l"], ["h", "d"],
  ["d", "i"], ["i", "e"], ["i", "j"],
  ["e", "j"], ["i", "l"], ["l", "m"],
  ["m", "j"],
];

// Which nodes are solid discs. The two variants are complements of each other.
const SOLID_LIGHT = new Set(["a", "e", "g", "j", "l"]);

const byId = new Map(NODES.map((n) => [n.id, n]));

export type BrainVariant = "light" | "heavy";

export default function BrainMark({
  variant = "light",
  className = "",
  style,
  title,
  /** Edge weight. The default is the house stroke; raise it where the mark
      has to carry more ink than its drawing alone gives it. */
  strokeWidth = 2.4,
}: {
  variant?: BrainVariant;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  strokeWidth?: number;
}) {
  const maskId = `brain-holes-${variant}`;
  const isSolid = (id: string) =>
    variant === "light" ? SOLID_LIGHT.has(id) : !SOLID_LIGHT.has(id);

  return (
    <svg
      viewBox="-2 -2 105 86"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <mask id={maskId}>
        <rect x="-2" y="-2" width="105" height="86" fill="white" />
        {NODES.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill="black" />
        ))}
      </mask>

      <g mask={`url(#${maskId})`}>
        {EDGES.map(([from, to]) => {
          const a = byId.get(from)!;
          const b = byId.get(to)!;
          return (
            <line key={`${from}${to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          );
        })}
      </g>

      {NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={isSolid(n.id) ? "currentColor" : "none"}
        />
      ))}
    </svg>
  );
}
