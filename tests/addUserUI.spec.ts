import { test, expect } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../page-factory/page-factory";

let addUserPage;

test.beforeEach(async ({ page }) => {
  const pageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();

  await addUserPage.navigateToAddUserPage();
});

test("Verify 'Create' button design on the 'Add User' page", async () => {
  const createBtn = addUserPage.createBtn;

  await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);
  await createBtn.hover();
  await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
});

test("Verify 'Cancel' button design on the 'Add User' page", async () => {
  const cancelBtn = await addUserPage.cancelBtn;

  await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);
  await cancelBtn.hover();
  await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
});

test("Verify 'User Name' field placeholder on the 'Add User' page", async () => {
  const placeholder =
    await addUserPage.userNameField.getAttribute("placeholder");

  await expect(addUserPage.userNameField).toBeVisible();
  await expect(placeholder).toEqual("User Name");
  await expect(addUserPage.userNameField).toHaveValue("");
});

test("Verify 'Year of Birth' field placeholder and only number input on the 'Add User' page", async () => {
  await expect(addUserPage.yearOfBirthField).toBeVisible();
  await expect(addUserPage.yearOfBirthField).toHaveValue("");
  const placeholder =
    await addUserPage.yearOfBirthField.getAttribute("placeholder");
  await expect(placeholder).toEqual("Year of Birth");

  // check that non-number input is ignored by the Year of Birth field
  await addUserPage.yearOfBirthField.click();
  await addUserPage.page.keyboard.insertText("!a@");
  await expect(addUserPage.yearOfBirthField).toHaveValue("");
});

test("Check 'Gender' field content on the 'Add User' page", async () => {
  await expect(addUserPage.genderField).toBeVisible();

  // checking option 1 for gender input - Male
  await addUserPage.selectGenderOption(GenderOptions.Male);
  expect(await addUserPage.getGenderSelectedOption()).toBe(GenderOptions[GenderOptions.Male]);

  // checking option 2 for gender input - Female
  await addUserPage.selectGenderOption(GenderOptions.Female);
  expect(await addUserPage.getGenderSelectedOption()).toBe(GenderOptions[GenderOptions.Female]);

  // checking option 0 for gender input - Undefined
  await addUserPage.selectGenderOption(GenderOptions.Undefined);
  expect(await addUserPage.getGenderSelectedOption()).toBe(GenderOptions[GenderOptions.Undefined]);
});

// this test was used to practice writing tests with XPath functions and axis
/*test("Verify Header content on the 'Add User' page", async ({ page }) => {
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
});*/