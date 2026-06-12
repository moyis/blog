export function setGiscusTheme(): void {
  const giscus = document.querySelector<HTMLIFrameElement>(".giscus-frame");
  if (!giscus) return;

  const isDark = document.documentElement.classList.contains("dark");
  const url = new URL(giscus.src);
  url.searchParams.set("theme", isDark ? "dark" : "light");
  giscus.src = url.toString();
}

let initialThemeSynced = false;

export function init(): void {
  // `setGiscusTheme()` rewrites the iframe `src`, which forces the giscus iframe
  // to reload. Doing that on every `astro:after-swap` reloads comments on each
  // navigation. Run the initial sync only once; later theme toggles still call
  // `setGiscusTheme()` directly (from theme.ts) when the theme actually changes.
  if (initialThemeSynced) {
    return;
  }
  initialThemeSynced = true;
  setGiscusTheme();
}
