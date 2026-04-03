import { expect, test } from "@playwright/test";

test("should display the Blog heading", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
});

test("should display blogs", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("listitem")).not.toHaveCount(0);
});

test("should redirect to blog post", async ({ page }) => {
  await page.goto("/blog");
  const blogPosts = page.getByRole("listitem");
  const count = await blogPosts.count();
  const randomIndex = Math.floor(Math.random() * count);
  const blogPost = blogPosts.nth(randomIndex);
  blogPost.click();
  const blogPostUrl =
    (await blogPost.getByRole("link").getAttribute("href")) ?? "";
  await expect(page).toHaveURL(blogPostUrl);
});

test("blog list items have visible titles and descriptions", async ({ page }) => {
  await page.goto("/blog");
  const items = page.getByRole("listitem");
  const count = await items.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const link = items.nth(i).getByRole("link");
    await expect(link).toBeVisible();
    // ArrowCard renders title (font-semibold) and description (text-sm)
    await expect(link.locator(".font-semibold")).toBeVisible();
    await expect(link.locator(".text-sm")).toBeVisible();
  }
});

test("page does not overflow horizontally", async ({ page }) => {
  await page.goto("/blog");
  const hasOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
