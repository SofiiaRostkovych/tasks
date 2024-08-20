import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("TS Trainee course");
});

test("Create button UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
  const el = page.locator("xpath=//div[4]/button");
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

  //checking the error msg after entering empty field
  await el.press("Enter");
  let err = page.locator(
    'xpath=//span[last()][@data-valmsg-for="User.YearOfBirth"]',
  );
  await expect(err).toBeVisible;
  await expect(err).toContainText("Year of Birth is requried");

  //checking the error msg after entering invalid Year of Birth(<1900)
  await el.fill("1899");
  await expect(el).toHaveValue("1899");
  await el.press("Enter");
  err = page.locator('xpath=//*[@id="inputYearOfBirth-error"]');
  await expect(err).toBeVisible;
  await expect(err).toContainText("Not valid Year of Birth is set");

  await el.fill("1900");
  await expect(el).toHaveValue("1900");
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

test("Header UI", async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");

  //getting first listitem
  let el = page.locator("xpath=//ul/li[position()<2]");
  await expect(el).toBeVisible;
  await expect(el).toHaveRole("listitem");
  //checking the child of first listitem, which is a link
  let child = el.locator("xpath=child::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Home");
  await expect(child).toHaveAttribute("href", "/");

  //getting the next listitem
  el = el.locator("xpath=following-sibling::li[1]");
  await expect(el).toBeVisible();
  await expect(el).toHaveRole("listitem");
  //checking the child of second listitem, which is a link
  child = el.locator("xpath=descendant::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Add User");
  await expect(child).toHaveAttribute("href", "/Forms/AddUser");

  //checking the last listitem
  el = el
    .locator("xpath=ancestor::ul") //getting the parent of el - the list element
    .locator('xpath=descendant::a[contains(text(),"Add Address")]'); //getting last link by text it contains
  await expect(el).toHaveRole("link");
  await expect(el).toContainText("Add Address");
  await expect(el).toHaveAttribute("href", "/Forms/AddAddress");
});
