import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import { defineConfig, fontProviders } from "astro/config";
import fs from "node:fs";

import opengraphImages from "astro-opengraph-images";
import { ogImage } from "./src/components/OgImage";
import rehypePrismPlus from "rehype-prism-plus";

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
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypePrismPlus],
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
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "frame-src 'self' https://giscus.app",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
      ],
      scriptDirective: {
        resources: ["'self'", "https://giscus.app"],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
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
});
