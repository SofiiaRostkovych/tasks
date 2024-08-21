import { test, expect } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { generateRandomUserName } from "../helpers/generateRandomUserName";

test.beforeEach(async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
});

test("Check that page Add User has title", async ({ page }) => {
  await expect(page).toHaveTitle("TS Trainee course");
});

test("Verify Create button design on the Add User page", async ({ page }) => {
  const createBtn = page.locator("xpath=//div[4]/button");
  await expect(createBtn).toBeVisible;
  await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);
  await createBtn.hover();
  await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
});

test("Verify Cancel button design on the Add User page", async ({ page }) => {
  const cancelBtn = page.getByRole("link", { name: "Cancel" });

  await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);
  await cancelBtn.hover();
  await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
});

test("Verify User Name field design and maximum symbols limit on the Add User page", async ({
  page,
}) => {
  const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
  const placeholder = await userNameField.getAttribute("placeholder");

  await expect(userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(userNameField).toHaveValue("");

  //checking maximum symbols limit - 14 characters for User Name input
  const testStr = generateRandomUserName(20);
  await userNameField.fill(testStr);
  await expect(userNameField).toHaveValue(testStr.substring(0, 14));
});

test("Verify Year of Birth field design and only number input on the Add User page", async ({
  page,
}) => {
  const yearOfBirthField = page.getByPlaceholder("Year of Birth");
  await expect(yearOfBirthField).toBeVisible;
  await expect(yearOfBirthField).toHaveValue("");

  //check that non-number input is ignored be the Year of Birth field
  await yearOfBirthField.click();
  await page.keyboard.insertText("!a@");
  await expect(yearOfBirthField).toHaveValue("");
});

test("Check Gender field design and content on the Add User page", async ({
  page,
}) => {
  const genderField = page.locator('xpath=//*[@id="selectGender"]');
  await expect(genderField).toBeVisible;
  //TODO: update locators which use Label
  //checking option 1 for gender input - Male
  await genderField.selectOption({ label: "Male" });
  await expect(genderField).toHaveValue("1");

  //checking option 2 for gender input - Female
  await genderField.selectOption({ label: "Female" });
  await expect(genderField).toHaveValue("2");

  //checking option 0 for gender input - Undefined
  await genderField.selectOption({ label: "Undefined" });
  await expect(genderField).toHaveValue("0");
});

test("Verify Header design and content on the Add User page", async ({
  page,
}) => {
  //getting first listitem of the header
  let listitem = page.locator("xpath=//ul/li[position()<2]");
  await expect(listitem).toBeVisible;
  await expect(listitem).toHaveRole("listitem");
  //checking the content of the child of first listitem of the header, which is a link
  let child = listitem.locator("xpath=child::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Home");
  await expect(child).toHaveAttribute("href", "/");

  //getting the next listitem of the header
  listitem = listitem.locator("xpath=following-sibling::li[1]");
  await expect(listitem).toBeVisible();
  await expect(listitem).toHaveRole("listitem");
  //checking the content of the child of second listitem, which is a link
  child = listitem.locator("xpath=descendant::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Add User");
  await expect(child).toHaveAttribute("href", "/Forms/AddUser");

  //checking the content of last listitem of the header
  child = listitem
    .locator("xpath=ancestor::ul")
    .locator('xpath=descendant::a[contains(text(),"Add Address")]');
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Add Address");
  await expect(child).toHaveAttribute("href", "/Forms/AddAddress");
});
