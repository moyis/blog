import { expect, test } from "@playwright/test";

test("my name in the nav bar redirects to home page", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("link", { name: "Fausto Moya⚡️" }).click();
  await expect(page).toHaveURL("/");
});

test("blog in the nav bar redirects to blog page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "blog" }).click();
  await expect(page).toHaveURL("/blog");
});

test("projects in the nav bar redirects to projects page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "projects", exact: true }).click();
  await expect(page).toHaveURL("/projects");
});

test("experience in the nav bar redirects to experience page", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "experience" }).click();
  await expect(page).toHaveURL("/experience");
});

test("nav is visible on all main pages", async ({ page }) => {
  const pages = ["/", "/blog", "/projects", "/experience"];
  for (const url of pages) {
    await page.goto(url);
    await expect(page.locator("header nav")).toBeVisible();
  }
});

test("all nav links are visible on mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 851 }); // Pixel 5
  await page.goto("/");
  await expect(page.getByRole("link", { name: "blog" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "experience" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "projects", exact: true }),
  ).toBeVisible();
});
