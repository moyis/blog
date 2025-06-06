import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import { defineConfig, fontProviders } from "astro/config";

import opengraphImages from "astro-opengraph-images";
import { ogImage } from "./src/components/OgImage";

// https://astro.build/config
export default defineConfig({
  site: "https://moyis.dev",
  integrations: [
    sitemap(),
    mdx(),
    pagefind(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Roboto",
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
    ,
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
    experimentalLayout: 'constrained',
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
    responsiveImages: true,
  },
});
