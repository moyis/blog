import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://moyis.dev",
  integrations: [sitemap(), mdx(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Geist Sans",
        cssVariable: "--font-blog",
        weights: ["400", "500", "600"],
        fallbacks: ["ui-sans-serif", "system-ui", "sans-serif", 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
      },
      {
        provider: fontProviders.fontsource(),
        name: "Geist Mono",
        cssVariable: "--font-code",
        weights: ["400", "500", "600"],
        fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", 'Liberation Mono', 'Courier New', "monospace"]

      }
    ],
  },
});
