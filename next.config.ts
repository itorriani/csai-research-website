import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The project stills are large photographs carrying display type over
    // them, and 75 leaves visible blocking in the dark, low-contrast
    // passages those photographs are mostly made of. 90 is what it takes for
    // the grain in the night shots to stay grain rather than turning to
    // mush — these are the page, not decoration behind it.
    qualities: [75, 90],
  },
};

export default nextConfig;
