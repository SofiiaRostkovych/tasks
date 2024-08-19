import { test, expect, Locator } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("TS Trainee course");
});

test("Create button UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByRole("button", { name: "Create" });
 
  await expect(el).toBeVisible;
  await expect(el).toHaveClass("btn btn-primary");
  await expect(el).toHaveCSS("background-color", "rgb(13, 110, 253)");
  await el.hover();
  await expect(el).toHaveCSS("background-color", "rgb(11, 94, 215)");
});

test("Cancel button UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByRole("link", { name: "Cancel" });
  

  await expect(el).toHaveClass("btn btn-secondary");
  await expect(el).toHaveCSS("background-color", "rgb(108, 117, 125)");
  await el.hover();
  await expect(el).toHaveCSS("background-color", "rgb(92, 99, 106)");
});

test("User name UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByLabel("User Name");
  const placeholder = await el.getAttribute("placeholder");

  await expect(el).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(el).toHaveText("");

});
test("Year of Birth", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByLabel("Year of Birth");
  const placeholder = await el.getAttribute("placeholder");

  await expect(el).toBeVisible;
  await expect(placeholder).toEqual("Year of Birth");
  await expect(el).toHaveText("");

});
