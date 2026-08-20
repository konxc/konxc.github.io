// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import qwik from "@qwikdev/astro";
import astroIcon from "astro-icon";
import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
  site: "https://www.konxc.space",

  integrations: [sitemap(), qwik(), astroIcon()],

  vite: {
    plugins: [
      tailwindcss(),
      /** @type {any} */ (visualizer({
        filename: "dist/bundle-analysis.html",
        template: "treemap", // treemap, sunburst, or network
        gzipSize: true,
        brotliSize: true,
      })),
    ],
  },

  adapter: node({
    mode: "standalone",
  }),
});
