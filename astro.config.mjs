import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import pagefind from "astro-pagefind";
import { defineConfig, fontProviders } from "astro/config";
import fs from "node:fs";

import opengraphImages from "astro-opengraph-images";
import { ogImage } from "./src/components/OgImage";

// https://astro.build/config
export default defineConfig({
  site: "https://moyis.dev",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap(),
    mdx(),
    pagefind(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Geist Sans",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff",
            ),
          },
        ],
      },
      render: ogImage,
    }),
    compress({
      CSS: true,
      HTML: false,
      Image: false, // Using Astro's image optimization instead
      JavaScript: true,
      SVG: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
    formats: ["avif", "webp"],
    quality: 80,
    svg: {
      size: "optimize", // Optimize SVG file size
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist Sans",
        cssVariable: "--font-blog",
        weights: ["400", "500", "600"],
        fallbacks: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      {
        provider: fontProviders.google(),
        name: "Geist Mono",
        cssVariable: "--font-code",
        weights: ["400", "500", "600"],
        fallbacks: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    ],
    csp: false,
  },
});
