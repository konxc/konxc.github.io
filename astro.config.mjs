// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://www.konxc.space",

  integrations: [sitemap(), svelte()],
  
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: "standalone"
  })
});