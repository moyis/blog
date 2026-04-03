import { expect, test } from "@playwright/test";

test.describe("blog post page", () => {
  let postUrl: string;

  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
    const firstPost = page.getByRole("listitem").first();
    const link = firstPost.getByRole("link");
    postUrl = (await link.getAttribute("href")) ?? "";
    await page.goto(postUrl);
  });

  test("should display the post title as heading", async ({ page }) => {
    await expect(
      page.locator("h1"),
    ).toBeVisible();
  });

  test("should display a date", async ({ page }) => {
    await expect(
      page.locator("time"),
    ).toBeVisible();
  });

  test("should have article content", async ({ page }) => {
    const article = page.locator("article");
    await expect(article).toBeVisible();
    const text = await article.textContent();
    expect(text!.trim().length).toBeGreaterThan(0);
  });

  test("should have a back link to the blog", async ({ page }) => {
    const backLink = page.getByRole("link", { name: "Volver al blog" });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/blog");
  });
});
