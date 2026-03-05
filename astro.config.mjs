// @ts-check

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [],
  adapter: cloudflare({
    imageService: "compile",
  }),

  i18n: {
    defaultLocale: "pt-br",
    locales: ["en", "pt-br", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
