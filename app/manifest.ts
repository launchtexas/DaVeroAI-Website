import type { MetadataRoute } from "next";

// Brand kit 03_Digital_Assets favicons.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DaVero AI",
    short_name: "DaVero AI",
    start_url: "/",
    display: "browser",
    background_color: "#081630",
    theme_color: "#081630",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
