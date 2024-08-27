import { test, expect } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { GenderOptions } from "../enums/GenderOptions";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { URLS } from "../src/config/urlProvider";

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.ADDUSER);
});

test("Check that 'Add User' page has title - TS Trainee course", async ({
  page,
}) => {
  await expect(page).toHaveTitle("TS Trainee course");
});

test("Verify 'Create' button design on the 'Add User' page", async ({
  page,
}) => {
  const createBtn = page.locator(
    'xpath=//button[@data-testid="button-Create"]',
  );
  await expect(createBtn).toBeVisible;
  await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);

  await createBtn.hover();
  await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
});

test("Verify 'Cancel' button design on the 'Add User' page", async ({
  page,
}) => {
  const cancelBtn = page.locator('xpath=//a[@data-testid="button-Cancel"]');
  await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);

  await cancelBtn.hover();
  await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
});

test("Verify 'User Name' field placeholder on the 'Add User' page", async ({
  page,
}) => {
  const userNameField = page.locator('xpath=//input[@id="inputUserName"]');
  const placeholder = await userNameField.getAttribute("placeholder");

  await expect(userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(userNameField).toHaveValue("");
});

test("Verify 'Year of Birth' field placeholder and only number input on the 'Add User' page", async ({
  page,
}) => {
  const yearOfBirthField = page.locator(
    'xpath=//input[@id="inputYearOfBirth"]',
  );
  const placeholder = await yearOfBirthField.getAttribute("placeholder");
  await expect(yearOfBirthField).toBeVisible;
  await expect(yearOfBirthField).toHaveValue("");
  await expect(placeholder).toEqual("Year of Birth");

  // check that non-number input is ignored be the Year of Birth field
  await yearOfBirthField.click();
  await page.keyboard.insertText("!a@");
  await expect(yearOfBirthField).toHaveValue("");
});

test("Check 'Gender' field content on the 'Add User' page", async ({
  page,
}) => {
  const genderField = page.locator('xpath=//select[@id="selectGender"]');
  await expect(genderField).toBeVisible;

  // checking option 1 for gender input - Male
  await genderField.selectOption(GenderOptions.Male.toString());
  expect(await extractSelectedDisplayedValue(genderField)).toBe(
    GenderOptions[GenderOptions.Male],
  );

  // checking option 2 for gender input - Female
  await genderField.selectOption(GenderOptions.Female.toString());
  expect(await extractSelectedDisplayedValue(genderField)).toBe(
    GenderOptions[GenderOptions.Female],
  );

  // checking option 0 for gender input - Undefined
  await genderField.selectOption(GenderOptions.Undefined.toString());
  expect(await extractSelectedDisplayedValue(genderField)).toBe(
    GenderOptions[GenderOptions.Undefined],
  );
});

// using Header to practice writing tests using XPath functions and axis
test("Verify Header content on the 'Add User' page", async ({ page }) => {
  // checking the content of the first listitem of the header
  let listitem = page.locator("xpath=//ul/li[position()<2]/child::a");
  await expect(listitem).toHaveText("Home");
  await expect(listitem).toHaveAttribute("href", "/");

  // checking the content of the second listitem of the header
  listitem = listitem.locator(
    "xpath=/parent::li/following-sibling::li[1]/descendant::a",
  );
  await expect(listitem).toHaveText("Add User");
  await expect(listitem).toHaveAttribute("href", URLS.ADDUSER);

  // checking the content of last listitem of the header
  listitem = listitem.locator(
    'xpath=ancestor::ul/descendant::a[contains(text(),"Add Address")]',
  );
  await expect(listitem).toHaveText("Add Address");
  await expect(listitem).toHaveAttribute("href", URLS.ADDADDRESS);
});
