export function readingTime(html: string, lang: "en" | "es" = "en") {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return lang === "es"
    ? `${readingTimeMinutes} min de lectura`
    : `${readingTimeMinutes} min read`;
}

/**
 * Build the OG image URL for a page. Local replica of astro-opengraph-images'
 * `getImagePath`, kept in-house so Head.astro doesn't import that package at
 * request time: it eagerly loads @resvg/resvg-js (a native CJS addon) which
 * throws "require is not defined" under Astro's dev/SSR ESM runner. The OG
 * images themselves are still generated at build by the (build-only) integration.
 */
export function getImagePath({
  url,
  site,
}: {
  url: URL;
  site: URL | undefined;
}): string {
  if (site === undefined) {
    throw new Error(
      "`site` must be set in your Astro configuration: https://docs.astro.build/en/reference/configuration-reference/#site",
    );
  }
  let target = url.pathname;
  // A trailing slash means a directory; otherwise append .png to the route.
  target = target.endsWith("/") ? target + "index.png" : target + ".png";
  // Astro emits these as top-level files rather than in a folder.
  if (target === "/404/index.png") return site.toString() + "404.png";
  if (target === "/500/index.png") return site.toString() + "500.png";
  return site.toString() + target.slice(1);
}
