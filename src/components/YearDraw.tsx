// The issue's year, drawn rather than typed. It was HTML text with a
// -webkit-text-stroke and a left-to-right clip wipe, which uncovered a
// finished word instead of making one: the stroke appeared all at once
// along a moving edge. These are the same letterforms — Inter at the Bold
// weight, the face the research headings use, pulled out of the variable
// font as outlines — but each one is a path the stroke now travels along,
// so the line starts at a point and arrives at the end of the digit.
//
// Digit by digit, left to right, with each counter — the hole in the 0 and
// the 6 — held back until its outer line is nearly closed, the order a
// hand would take them in. The geometry is in font units (2048 to the em)
// and the sizing is in em, so one viewBox carries every screen the clamp
// covers and the line keeps its weight across them.
export default function YearDraw({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -1510 2701 1510"
      // The box is the digits' own bounding box, so its foot is the
      // baseline and the SVG sits on the text's baseline as an inline box
      // with no nudging. The line's outer half and the 0 and 6's overshoot
      // fall outside it, hence the visible overflow.
      style={{ height: "0.7373em", width: "1.3188em", overflow: "visible" }}
      className={`year-draw ${className}`}
      role="img"
      aria-label="26"
    >
      {/* 2 — outer */}
      <path
        d="M123.8 0V-219.6L651.7 -715Q719.6 -781.3 766.5 -834.4Q813.4 -887.6 837.9 -939.1Q862.4 -990.6 862.4 -1051Q862.4 -1117.6 832.1 -1165.7Q801.9 -1213.8 749.9 -1239.7Q698 -1265.6 631 -1265.6Q561.6 -1265.6 509.9 -1237.6Q458.2 -1209.6 429.9 -1157.6Q401.6 -1105.6 401.6 -1033H110.5Q110.5 -1178.5 176.6 -1285.5Q242.7 -1392.5 360.7 -1451.3Q478.7 -1510 633.3 -1510Q791.1 -1510 909 -1453.7Q1026.9 -1397.4 1092.4 -1298.3Q1157.9 -1199.1 1157.9 -1070.2Q1157.9 -986.5 1125.4 -905.7Q1092.9 -824.9 1009.6 -724.7Q926.4 -624.4 773.3 -483.9L547.8 -261.6V-250.7H1178.1V0Z"
        pathLength={1}
        style={{ "--yd-delay": "1900ms", "--yd-duration": "520ms" } as React.CSSProperties}
      />
      {/* 6 — outer */}
      <path
        d="M2054.7 20Q1941.7 20 1835.8 -17.8Q1729.8 -55.6 1646.3 -140.4Q1562.8 -225.3 1513.8 -365.2Q1464.8 -505.2 1464.8 -709.6Q1464.8 -898 1506.9 -1046.1Q1549 -1194.3 1628.1 -1297.9Q1707.1 -1401.5 1818.1 -1455.8Q1929.1 -1510 2066.4 -1510Q2213 -1510 2326 -1452.7Q2439.1 -1395.4 2508.3 -1297.5Q2577.5 -1199.6 2592.2 -1076.7H2291.8Q2273.2 -1155.8 2213.8 -1201.4Q2154.3 -1247 2066.4 -1247Q1968 -1247 1900.7 -1189.1Q1833.3 -1131.3 1799 -1024.5Q1764.7 -917.7 1764.7 -770.6H1774.6Q1808.6 -835.8 1865.2 -882.8Q1921.7 -929.7 1994.7 -954.5Q2067.8 -979.4 2148.6 -979.4Q2280.9 -979.4 2384.5 -917.5Q2488 -855.6 2547.8 -746.8Q2607.5 -638 2607.5 -497.7Q2607.5 -347.4 2537.9 -230.4Q2468.4 -113.4 2344 -46.7Q2219.7 20 2054.7 20Z"
        pathLength={1}
        style={{ "--yd-delay": "2320ms", "--yd-duration": "520ms" } as React.CSSProperties}
      />
      {/* 6 — counter */}
      <path
        d="M2052.6 -222.1Q2126.9 -222.1 2185.1 -257.6Q2243.4 -293.2 2277.3 -353.8Q2311.2 -414.5 2311.2 -490.2Q2311.2 -565 2278 -625.2Q2244.7 -685.4 2187 -720.5Q2129.2 -755.5 2054.9 -755.5Q1999.8 -755.5 1952.7 -734.7Q1905.5 -713.9 1870.1 -677.1Q1834.8 -640.3 1815.1 -592.2Q1795.5 -544 1795.5 -489.3Q1795.5 -415.8 1828.9 -355.2Q1862.4 -294.5 1920.9 -258.3Q1979.4 -222.1 2052.6 -222.1Z"
        pathLength={1}
        style={{ "--yd-delay": "2660ms", "--yd-duration": "320ms" } as React.CSSProperties}
      />
    </svg>
  );
}
