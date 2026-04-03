import { expect, test } from "@playwright/test";

test.describe("build integrity", () => {
  test("sitemap-index.xml returns 200 with valid XML", async ({ request }) => {
    const response = await request.get("/sitemap-index.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<sitemapindex");
  });

  test("sitemap contains all known routes", async ({ request }) => {
    const response = await request.get("/sitemap-index.xml");
    const body = await response.text();
    // The sitemap-index references child sitemaps; fetch the first one
    const sitemapUrlMatch = body.match(/<loc>(.*?)<\/loc>/);
    expect(sitemapUrlMatch).not.toBeNull();

    const sitemapResponse = await request.get(
      new URL(sitemapUrlMatch![1]).pathname,
    );
    const sitemapBody = await sitemapResponse.text();

    const expectedRoutes = ["/blog", "/projects", "/experience", "/tags"];
    for (const route of expectedRoutes) {
      expect(sitemapBody).toContain(route);
    }
  });

  test("rss.xml returns 200 with valid XML", async ({ request }) => {
    const response = await request.get("/rss.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<rss");
  });

  test("rss.xml contains at least one item", async ({ request }) => {
    const response = await request.get("/rss.xml");
    const body = await response.text();
    expect(body).toContain("<item>");
  });

  test("og:image meta tag resolves to a valid image", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).not.toBeNull();
    const imageResponse = await request.get(ogImage!);
    expect(imageResponse.status()).toBe(200);
  });

  test("no broken internal links", async ({ page, request }) => {
    test.setTimeout(30000); // Crawling multiple pages takes longer than the default 5s
    const pagesToCrawl = [
      "/",
      "/blog",
      "/projects",
      "/experience",
      "/tags",
    ];
    const checkedUrls = new Set<string>();
    const brokenLinks: string[] = [];

    for (const pageUrl of pagesToCrawl) {
      await page.goto(pageUrl);
      const links = await page.locator("a[href^='/']").all();
      for (const link of links) {
        const href = await link.getAttribute("href");
        if (!href || checkedUrls.has(href)) continue;
        checkedUrls.add(href);

        const response = await request.get(href);
        if (response.status() >= 400) {
          brokenLinks.push(`${pageUrl} -> ${href} (${response.status()})`);
        }
      }
    }

    expect(brokenLinks, `Broken links found:\n${brokenLinks.join("\n")}`).toHaveLength(0);
  });
});
