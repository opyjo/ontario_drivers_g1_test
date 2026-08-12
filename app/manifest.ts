import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "../lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Ontario G1 Test Prep`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#ffffff",
    theme_color: "#2563eb",
    lang: "en-CA",
    categories: ["education", "utilities"],
    shortcuts: [
      {
        name: "Study Guide",
        short_name: "Study",
        description: "Continue the Ontario G1 handbook study guide",
        url: "/study-guide",
        icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
      },
      {
        name: "Practice Tests",
        short_name: "Practice",
        description: "Choose an Ontario G1 practice test",
        url: "/g1-practice-test",
        icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
      },
    ],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
