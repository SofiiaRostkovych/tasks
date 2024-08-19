import { test, expect } from "@playwright/test";

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
  // checking btn reaction to hover
  await el.hover();
  await expect(el).toHaveCSS("background-color", "rgb(11, 94, 215)");
});

test("Cancel button UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByRole("link", { name: "Cancel" });

  await expect(el).toHaveClass("btn btn-secondary");
  await expect(el).toHaveCSS("background-color", "rgb(108, 117, 125)");
  // checking btn reaction to hover
  await el.hover();
  await expect(el).toHaveCSS("background-color", "rgb(92, 99, 106)");
});

test("User name UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByLabel("User Name");
  const placeholder = await el.getAttribute("placeholder");

  await expect(el).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(el).toHaveValue("");

  //checking error msg for too short value
  await el.fill("ab");
  await expect(el).toHaveValue("ab");
  const err = page.getByText("Name is too short");
  await expect(err).toBeVisible;

  //checking maximum symbols limit - 14 characters
  await el.fill("12345678901234567890");
  await expect(el).toHaveValue("12345678901234");
});

test("Year of Birth", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByPlaceholder("Year of Birth");
  await expect(el).toBeVisible;
  await expect(el).toHaveValue("");
});

test("Gender UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.getByLabel("Gender");
  await expect(el).toBeVisible;

  //checking default value
  await expect(el).toHaveValue("0");

  //checking option 1 - Male
  await el.selectOption({ label: "Male" });
  await expect(el).toHaveValue("1");

  //checking option 2 - Female
  await el.selectOption({ label: "Female" });
  await expect(el).toHaveValue("2");
});
