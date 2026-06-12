# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Bun**. Astro 6 + Tailwind v4.

- `bun run dev` — dev server at `http://localhost:4321`.
- `bun run build` — `astro check` (type check) then `astro build`. Forces Pagefind to index in English (`PAGEFIND_FORCE_LANGUAGE=en`).
- `bun run preview` — serve the production build locally.
- `bun run lint` / `bun run lint:fix` — ESLint over the repo (also lints JSON and Markdown).
- `bun run test` — Playwright E2E suite. **Non-CI runs build + preview first** (`webServer.command` = `bun run build && bun run preview`), so a clean run is slow; the server is reused if already up.
- Single test file: `bunx playwright test test/home.spec.ts`. By title: `bunx playwright test -g "renders the hero"`. Debug UI: `bun run test:ui`.

Tests live in `test/` (not `src`). In CI they hit `BASE_URL`; locally they hit `http://localhost:4321/`.

## Architecture

Content-driven personal blog + portfolio built on the **astro-micro** theme. Static output, deployed to **Vercel** (`outputDirectory: dist`).

**Content collections** ([src/content.config.ts](src/content.config.ts)) are the data layer. Two glob collections, `blog` and `projects`, load Markdown/MDX from `src/content/<collection>/<slug>/index.md(x)`. Each entry is a folder so co-located images ship with the post. Zod schemas enforce frontmatter (`title`, `description`, `date`, optional `draft`, `tags`/`demoURL`/`repoURL`). Adding a post = adding a folder; routes generate automatically.

**Routing** is file-based in [src/pages/](src/pages/). Dynamic routes `blog/[...id].astro` and `projects/[...id].astro` use `getStaticPaths` over the collections; `tags/[id].astro` generates a page per tag. `rss.xml.js` and the sitemap integration derive from the same collections — collections are the single source of truth for content.

**Bilingual (ES/EN).** Site content is primarily Spanish; UI/metadata is bilingual. [src/consts.ts](src/consts.ts) centralizes site/author/socials/work-experience and carries `*_ES` fields (e.g. `BIO_ES`, `JOB_TITLE_ES`). `lang` flows from page → `Layout` → `Head`, where it sets `<html lang>` and the OG locale. Edit `consts.ts` for site-wide text, not individual components.

**Layout chain.** [src/layouts/Layout.astro](src/layouts/Layout.astro) is the only layout: it renders `Head` (global CSS import, fonts, `ClientRouter` view transitions, OG/meta), `Header`, `<slot/>`, `Footer`, and the Pagefind search modal. The `Container` component (`max-w-(--breakpoint-sm)`, 640px) sets the reading measure everywhere.

**Styling.** Tailwind v4 via the Vite plugin — **no `tailwind.config`**; theme tokens live in `@theme` inside [src/styles/global.css](src/styles/global.css), which also holds base element styles, the `.animate` reveal classes, and the Prism syntax-highlighting token palette (light + dark). Dark mode is class-based (`.dark` on `<html>`), driven by [src/scripts/theme.ts](src/scripts/theme.ts) (light/dark/system, persisted). The `@components`/`@consts`/`@types` import aliases resolve to `src/*` via the `@*` tsconfig path.

**Fonts & CSP.** Fonts use Astro's experimental `fonts` API ([astro.config.mjs](astro.config.mjs)): Geist Sans (`--font-blog`, fontsource) and Geist Mono (`--font-code`, google), exposed as Tailwind `--font-sans`/`--font-mono`. The same config defines a **build-time Content Security Policy** (`security.csp`) — when adding external scripts/frames/images (e.g. another embed like Giscus), update those directives or the built pages will block them. Security headers are duplicated in [public/_headers](public/_headers) and [vercel.json](vercel.json).

**Client scripts** ([src/scripts/](src/scripts/)) are small vanilla-TS enhancements wired up through view transitions: `animate.ts` (scroll reveal), `scroll.ts`, `copy-code.ts`, `theme.ts`, `giscus.ts` (comments), `pagefind.ts` (search). Reveal animations have a `<noscript>` fallback in `Layout.astro` so content is visible without JS.

**OG images** are generated at build by `astro-opengraph-images` using [src/components/OgImage.tsx](src/components/OgImage.tsx) (the repo's only React/JSX, hence the `react`/`@types/react` dev deps).

## Design Context

Before any UI/design task, read [PRODUCT.md](PRODUCT.md) (strategic: register, users, voice, anti-references) and [DESIGN.md](DESIGN.md) (visual system). Register is **brand** (personal blog/portfolio — design IS the product). These power the impeccable design skill; `/impeccable` lists its commands, `/impeccable live` is pre-configured.

Visual identity to preserve:
- **Monochrome chrome.** Grayscale `neutral-100`/`neutral-900` surfaces, `black`/`white` ink at 75% for body. Color is reserved for code syntax and the four semantic callouts — never a brand accent in the chrome.
- **Flat, no shadows.** Depth comes from hairline borders (`black/15`, `white/20`) and hover tints (`black/5`, `white/5`).
- **Geist Sans (prose) + Geist Mono (code)**, weights 400/500/600.
- **Full light/dark parity**, WCAG AA; lowercase navigation as a voice signal.

## Conventions

- Commits follow Conventional Commits (`feat:`, `fix:`, `build(deps):`, …); attribution is disabled.
- Dependency bumps are automated via Dependabot with auto-merge; most history is dep PRs.
