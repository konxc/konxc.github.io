// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import svelte from "@astrojs/svelte";

import astroIcon from "astro-icon";

import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
  site: "https://www.konxc.space",

  integrations: [
    sitemap(),
    svelte(),
    astroIcon({
      iconSets: ["heroicons"],
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        filename: "dist/bundle-analysis.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },

  adapter: node({
    mode: "standalone",
  }),
});
