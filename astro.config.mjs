import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import { defineConfig, fontProviders } from "astro/config";
import fs from "node:fs";

import rehypePrismPlus from "rehype-prism-plus";

// OG images are build-time social-card artifacts (never rendered in the page UI).
// astro-opengraph-images pulls in @resvg/resvg-js, a native CJS addon that throws
// "require is not defined" under Astro's dev/SSR ESM module runner. Importing it
// statically evaluates resvg at config-load time even in dev, so load it lazily
// and only for `astro build`. `getImagePath` (in Head.astro) is a pure path helper
// with no resvg dependency, so og:image meta tags still resolve in dev.
const isBuild = process.argv.includes("build");
const ogImagesIntegration = isBuild
  ? await (async () => {
      const { default: opengraphImages } = await import(
        "astro-opengraph-images"
      );
      const { ogImage } = await import("./src/components/OgImage");
      return opengraphImages({
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
      });
    })()
  : null;

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
    // Force a single Spanish index. The site is bilingual (en home/projects/
    // experience, es blog/tags), so by default pagefind builds separate per-lang
    // indexes and the search UI only queries the one matching the current page's
    // <html lang> -- hiding every Spanish blog post from search opened on an en
    // page. `forceLanguage` indexes the whole site as one (es) index. The Node API
    // used by this integration ignores PAGEFIND_FORCE_LANGUAGE, so it must be set
    // here, not via env var.
    pagefind({ indexConfig: { forceLanguage: "es" } }),
    ...(ogImagesIntegration ? [ogImagesIntegration] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // syntaxHighlight stays at markdown level (read from shared config by the
    // processor); rehype plugins move onto `unified()` per the Astro 7 deprecation.
    syntaxHighlight: false,
    processor: unified({
      rehypePlugins: [rehypePrismPlus],
    }),
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
        // 'wasm-unsafe-eval' lets Pagefind compile its search-index WebAssembly.
        // It is the narrow WASM token (not general 'unsafe-eval'): it permits
        // WebAssembly.instantiate only, no eval()/new Function() on JS strings.
        resources: ["'self'", "'wasm-unsafe-eval'", "https://giscus.app"],
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
