import { test, expect } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { GenderOptions } from "../enums/GenderOptions";

test.beforeEach(async ({ page }) => {
  await page.goto("/Forms/AddUser");
});

test("Check that 'Add User' page has title - TS Trainee course", async ({
  page,
}) => {
  await expect(page).toHaveTitle("TS Trainee course");
});

test("Verify 'Create' button design on the 'Add User' page", async ({
  page,
}) => {
  const createBtn = page.locator("xpath=//div[4]/button");
  await expect(createBtn).toBeVisible;
  await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);
  await createBtn.hover();
  await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
});

test("Verify 'Cancel' button design on the 'Add User' page", async ({
  page,
}) => {
  const cancelBtn = page.getByRole("link", { name: "Cancel" });

  await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);
  await cancelBtn.hover();
  await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
});

test("Verify 'User Name' field design on the 'Add User' page", async ({
  page,
}) => {
  const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
  const placeholder = await userNameField.getAttribute("placeholder");

  await expect(userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(userNameField).toHaveValue("");
});

test("Verify 'Year of Birth' field design and only number input on the 'Add User' page", async ({
  page,
}) => {
  const yearOfBirthField = page.getByPlaceholder("Year of Birth");
  await expect(yearOfBirthField).toBeVisible;
  await expect(yearOfBirthField).toHaveValue("");

  // check that non-number input is ignored be the Year of Birth field
  await yearOfBirthField.click();
  await page.keyboard.insertText("!a@");
  await expect(yearOfBirthField).toHaveValue("");
});

test("Check 'Gender' field design and content on the 'Add User' page", async ({
  page,
}) => {
  const genderField = page.locator('xpath=//*[@id="selectGender"]');
  await expect(genderField).toBeVisible;
  // TODO: update locators which use Label
  // checking option 1 for gender input - Male
  await genderField.selectOption({ label: GenderOptions[1] });
  await expect(genderField).toHaveValue(GenderOptions.Male.toString());

  // checking option 2 for gender input - Female
  await genderField.selectOption({ label: GenderOptions[2] });
  await expect(genderField).toHaveValue(GenderOptions.Female.toString());

  // checking option 0 for gender input - Undefined
  await genderField.selectOption({ label: GenderOptions[0] });
  await expect(genderField).toHaveValue(GenderOptions.Undefined.toString());
});
