import { expect, test } from "@playwright/test";

test("should display the Projects heading", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
});

test("should display projects", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("listitem")).not.toHaveCount(0);
});

test("should redirect to project", async ({ page }) => {
  await page.goto("/projects");
  const projects = page.getByRole("listitem");
  const count = await projects.count();
  const randomIndex = Math.floor(Math.random() * count);
  const project = projects.nth(randomIndex);
  project.click();
  const projectUrl =
    (await project.getByRole("link").getAttribute("href")) ?? "";
  await expect(page).toHaveURL(projectUrl);
});

test("project list items have visible titles and descriptions", async ({ page }) => {
  await page.goto("/projects");
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
  await page.goto("/projects");
  const hasOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
