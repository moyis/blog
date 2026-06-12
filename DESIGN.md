---
name: Fausto Moya
description: Personal blog and portfolio — a monochrome reading room for Spanish-language software writing.
colors:
  ink-light: "#000000"
  ink-dark: "#fafafa"
  surface-light: "#f5f5f5"
  surface-dark: "#171717"
  code-surface-light: "#fafafa"
  code-surface-dark: "#09090b"
  syntax-keyword: "#f47067"
  syntax-string: "#00a99a"
  syntax-function: "#429996"
  syntax-number: "#2b70c5"
  syntax-regex: "#ae42a0"
  syntax-url: "#8d85ff"
  syntax-punctuation: "#8996a3"
  syntax-comment: "#a19595"
typography:
  display:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.9em"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  page-x: "12px"
  block: "24px"
  section: "128px"
  max-width: "640px"
components:
  button-ghost:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  card-arrow:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  callout-info:
    backgroundColor: "#dbeafe"
    textColor: "#172554"
    rounded: "{rounded.md}"
    padding: "12px"
---

# Design System: Fausto Moya

## 1. Overview

**Creative North Star: "The Engineer's Notebook"**

This is a monochrome reading instrument, not a marketing site. Geist Sans carries the prose; Geist Mono carries the code. The page is ink on near-white paper (and near-white ink on near-black paper in dark mode), with no brand accent color competing for attention. Color enters in exactly two places: the syntax highlighting inside code blocks, and the four semantic callout tints. Everywhere else, hierarchy is built from weight, size, and space, the way a well-set technical book is.

The system is **flat**. There are no drop shadows. Depth comes from hairline borders (`black/15`, `white/20`) and faint hover tints (`black/5`, `white/5`), never from elevation. The single atmospheric flourish is the header: a translucent `neutral-100/75` bar with `backdrop-blur-xs` and `saturate-200`, so content scrolls softly behind it. Interaction is **tactile and confident**: controls have real borders and visible hover/focus states, arrows slide and scale on hover, the theme toggles pulse. Restraint is the resting state, not the only state.

It explicitly rejects the generic SaaS/template blog (no hero-metric cards, no identical icon-heading-text grids), the corporate/cold stock-photo aesthetic, the over-designed/flashy gradient-and-glass look, and the cluttered ad-rail-and-widget pileup. The writing leads; the design defends the read.

**Key Characteristics:**
- Strictly monochrome chrome; color is reserved for code and callouts.
- Flat by default — borders and tints convey depth, never shadows.
- Two-weight-superfamily type system: Geist Sans + Geist Mono.
- Full light/dark parity, theme-switchable (light / dark / system).
- Lowercase, understated navigation; the lightning bolt (⚡️) is the only mark.

## 2. Colors

A monochrome neutral system with two reserved color vocabularies: syntax highlighting and semantic callouts.

### Primary
- **Ink** (`#000000` light / `#fafafa` dark): Headings render at full ink; body text at 75% opacity (`black/75`, `white/75`) for comfortable long-form reading. Links inherit `currentColor` and resolve to full ink on hover.

### Neutral
- **Paper** (`#f5f5f5` `neutral-100` light / `#171717` `neutral-900` dark): The page surface. Calm, slightly off-pure to reduce glare.
- **Code Paper** (`#fafafa` light / `#09090b` dark): Code-block surfaces, set one step apart from the page so listings read as inset panels.
- **Hairline Border** (`black/15` light / `white/20` dark): Every border on the site. One token, used everywhere.
- **Hover Wash** (`black/5` light / `white/5` dark): The faint tint on interactive surfaces at hover/focus.

### Tertiary — Syntax Palette
Reserved exclusively for code tokens; never used as UI color.
- **Keyword** (`#f47067`), **String** (`#00a99a`), **Function / Class** (`#429996`), **Number / Constant** (`#2b70c5`), **Regex** (`#ae42a0`), **URL** (`#8d85ff`), **Punctuation** (`#8996a3`), **Comment** (`#a19595`). Dark mode shifts functions/numbers/regex to lighter tints for contrast.

### Tertiary — Callout Semantics
Four states, each a Tailwind 100/800/950 triad: **Default/Tip** (orange), **Info** (blue), **Warning** (yellow), **Error** (red). Used only inside `<Callout>` blocks within prose.

### Named Rules
**The Monochrome Chrome Rule.** The interface is grayscale. Color appears only inside code blocks (syntax) and callouts (semantics). A colored button, a colored heading, or a brand accent anywhere in the chrome is forbidden — it breaks the reading-room contract.

## 3. Typography

**Display / Body Font:** Geist Sans (with `ui-sans-serif, system-ui, sans-serif`)
**Code / Mono Font:** Geist Mono (with `ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** One geometric superfamily in two voices. Geist Sans is clean, neutral, and Dutch-modern — it gets out of the way of the prose. Geist Mono handles code and the occasional technical label. Weights are limited to 400 / 500 / 600; there is no light or heavy extreme. The contrast in the system is sans-vs-mono and weight-vs-size, not serif-vs-sans.

### Hierarchy
- **Display** (600, `clamp(1.875rem, 5vw, 2.25rem)`, lh 1.2): Page and post titles. Set with `text-wrap: balance`.
- **Headline** (600, ~1.5rem, lh 1.3): In-article `h2`/`h3`, via `@tailwindcss/typography` `prose`.
- **Body** (400, 1rem, lh ~1.6): Article prose at `black/75`. Capped to a comfortable measure by the 640px container.
- **Label** (400, 0.875rem / 0.75rem): Navigation, metadata, dates, button text. Lowercase by authorial choice (`blog / experience / projects`).
- **Mono** (400, ~0.9em): Inline code and code blocks in Geist Mono.

### Named Rules
**The Lowercase Nav Rule.** Primary navigation and small UI labels stay lowercase. It is a deliberate voice signal — understated, personal, not corporate. Don't title-case or uppercase them.

## 4. Elevation

This system is **flat by default**. There are no drop shadows anywhere. Depth and separation are conveyed by hairline borders (`black/15`, `white/20`), one-step surface shifts (page vs. code panel), and faint hover washes. The only blur in the system is the header's `backdrop-blur-xs` + `saturate-200`, which is atmospheric, not elevational.

### Named Rules
**The No-Shadow Rule.** Surfaces never lift with `box-shadow`. If something needs to feel distinct, give it a hairline border or a one-step surface tint, not a shadow. State (hover, focus) is shown with a background wash and color shift, never elevation.

## 5. Components

Components are **tactile and confident**: real borders, visible hover/focus states, and short directional motion. All transitions are `300ms ease-in-out` on color, or `ease-out` on the entrance animation.

### Buttons
- **Shape:** Small radius (`rounded-sm`, 4px). Square-ish, compact.
- **Ghost (search, theme toggles):** Transparent/`neutral` background, hairline border (`black/15` / `white/20`), `text-xs`/`size-9`. Hover and `focus-visible` add a `black/5` wash and shift text/stroke to full ink. Theme-toggle icons `animate-pulse` on hover.
- **Back-to-top:** Same ghost treatment; an arrow slides in (`translate-x` + `scale-x`) on hover. Reveals on scroll via a `.scrolled` class on `html`.

### Cards
- **Arrow Card (post/project list item):** `rounded-lg` (8px), hairline border, `px-4 py-3`. `not-prose`. Title at `font-semibold`, description at `text-sm`. On hover: `black/5` wash, text to full ink, and a right-pointing arrow draws itself in (line scales from 0, chevron slides). The signature interactive component of the site.
- **No nested cards. No shadow.** Separation is the border alone.

### Callouts
- **Style:** `rounded` (md), full hairline border in the state hue, tinted background, matching text color. Leading emoji (💡 ℹ️ ⚠️ 🚨) in the gutter, `not-prose`.
- **States:** default (orange), info (blue), warning (yellow), error (red).

### Navigation
- **Style:** Lowercase `text-sm` links separated by literal `/` glyphs. Underline links use `underline-offset-[3px]` with `decoration-*/30`, deepening to `/50` on hover. The header is a fixed, translucent, blurred bar; `transition:persist` across view transitions.

### Code Block (signature)
- Inset panel on `code-surface`, hairline border, `py-5`. A `copy-code` ghost button (`size-9`, `rounded-sm`) sits top-right, scales to 90% on `:active`. Syntax via the reserved syntax palette.

## 6. Do's and Don'ts

### Do:
- **Do** keep the chrome strictly monochrome — color belongs to code and callouts only (The Monochrome Chrome Rule).
- **Do** build depth from hairline borders (`black/15` / `white/20`) and one-step surface tints, never shadows.
- **Do** maintain full light/dark parity — every new surface, border, and text color needs both variants, contrast-checked to WCAG AA.
- **Do** keep navigation and small labels lowercase (The Lowercase Nav Rule).
- **Do** use Geist Sans for prose and Geist Mono for code/technical labels; lean on weight (400/500/600) and size for hierarchy.
- **Do** give every animation a `prefers-reduced-motion: reduce` path, and gate reveal animations on a visible default (the `<noscript>` fallback already does this for `.animate`).
- **Do** cap body measure with the 640px container for a comfortable reading line.

### Don't:
- **Don't** introduce a brand accent color, gradient, or `background-clip: text` anywhere in the chrome.
- **Don't** use drop shadows or decorative glassmorphism (the header blur is the one sanctioned, atmospheric exception).
- **Don't** ship the generic SaaS/template blog look: no hero-metric cards, no identical icon-heading-text card grids.
- **Don't** drift corporate/cold or over-designed/flashy; no stock-photo business aesthetic, no gratuitous animation.
- **Don't** clutter the page with ad rails, popups, or competing widgets — the writing leads.
- **Don't** nest cards, or use a `border-left` color stripe as an accent; use the full hairline border.
- **Don't** title-case or uppercase the navigation; don't set body copy in all caps.
