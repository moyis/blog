import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import opengraphImages from "astro-opengraph-images";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
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
});
