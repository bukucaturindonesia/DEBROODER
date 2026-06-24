import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DEBRODER",
    short_name: "DEBRODER",
    description: "Kaos Polos Import & Sablon",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F0",
    theme_color: "#003B0A",
    icons: [
      {
        src: "/brand/debroder/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/brand/debroder/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
