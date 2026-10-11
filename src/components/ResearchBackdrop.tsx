"use client";

import Grainient from "@/components/Grainient";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

// One continuous field behind the whole research run — both the current and
// the previous panels — so the two read as a single surface rather than a
// gradient that stops at a seam.
export default function ResearchBackdrop() {
  const reduced = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <Grainient
        color1="#FFFFFF"
        color2="#4A4A4A"
        color3="#050509"
        // Monochrome by construction: saturation 0 holds the field to black
        // and white whatever the stops drift to.
        saturation={0}
        contrast={1.25}
        // Edges land outside the ±0.45 the uv range can reach at this zoom,
        // so the ramp is continuous corner to corner. At the stock 0.05 the
        // smoothstep saturates before the midline and everything past it
        // clamps to the darkest stop — that is the dead right half.
        blendSoftness={0.45}
        blendAngle={-18}
        zoom={1.1}
        // A slow sway of the blend axis. The stock 500 spins it through full
        // flips; this keeps the motion to a drift you notice but don't watch.
        rotationAmount={70}
        noiseScale={1.6}
        timeSpeed={reduced ? 0 : 0.12}
        warpStrength={1}
        warpFrequency={3.2}
        warpSpeed={reduced ? 0 : 1.2}
        warpAmplitude={26}
        grainAmount={0.12}
        grainScale={2.5}
        grainAnimated={!reduced}
      />

      {/* Keeps the white cards reading against the brighter passes. */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hands off from the white hero above. Multi-stop rather than a
          two-stop linear so the falloff reads as an ease instead of the
          flat, slightly banded ramp a straight interpolation gives. It
          clears before the first heading, which is set in white. */}
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(to_bottom,#ffffff_0%,rgba(255,255,255,0.88)_16%,rgba(255,255,255,0.6)_34%,rgba(255,255,255,0.3)_56%,rgba(255,255,255,0.1)_76%,rgba(255,255,255,0)_100%)] sm:h-64" />

      {/* Settles to flat before the white footer, so that cut is a clean
          line rather than a slice through mid-gradient. */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#050509]" />
    </div>
  );
}
