import { expect, test } from "@playwright/test";

test("should display the All Tags heading", async ({ page }) => {
  await page.goto("/tags");
  await expect(
    page.getByRole("heading", { name: "All Tags" }),
  ).toBeVisible();
});

test("should display at least one tag", async ({ page }) => {
  await page.goto("/tags");
  const tags = page.locator('a[href^="/tags/"]');
  await expect(tags.first()).toBeVisible();
  expect(await tags.count()).toBeGreaterThan(0);
});

test("should navigate to tag detail page", async ({ page }) => {
  await page.goto("/tags");
  const firstTag = page.locator('a[href^="/tags/"]').first();
  const href = await firstTag.getAttribute("href");
  await firstTag.click();
  await expect(page).toHaveURL(href!);
});

test("should display filtered posts on tag detail page", async ({ page }) => {
  await page.goto("/tags");
  const firstTag = page.locator('a[href^="/tags/"]').first();
  const href = await firstTag.getAttribute("href");
  await page.goto(href!);
  await expect(
    page.getByRole("heading", { name: /Posts tagged with/ }),
  ).toBeVisible();
  const posts = page.locator('a[href^="/blog/"]');
  expect(await posts.count()).toBeGreaterThan(0);
});
