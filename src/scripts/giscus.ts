export function setGiscusTheme(): void {
  const giscus = document.querySelector<HTMLIFrameElement>(".giscus-frame");
  if (!giscus) return;

  const isDark = document.documentElement.classList.contains("dark");
  const url = new URL(giscus.src);
  url.searchParams.set("theme", isDark ? "dark" : "light");
  giscus.src = url.toString();
}

export function init(): void {
  setGiscusTheme();
}
