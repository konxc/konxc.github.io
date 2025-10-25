// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import svelte from "@astrojs/svelte";

import astroIcon from "astro-icon";

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
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),
});
