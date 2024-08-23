import { test, expect } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../page-factory/page-factory";
let addUserPage;

test.beforeEach(async ({ page }) => {
  const pageFactory = new PageFactory(page);
  
  addUserPage = pageFactory.getAddUserPage();
  addUserPage.navigateToAddUserPage();
});

/*test("Check that 'Add User' page has title - TS Trainee course", async ({
  page,
}) => {
  await expect(page).toHaveTitle("TS Trainee course");
});*/

test("Verify 'Create' button design on the 'Add User' page", async ({
  page,
}) => {
  const createBtn = addUserPage.createBtn;
  await expect(createBtn).toBeVisible;
  await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);
  await createBtn.hover();
  await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
});

test("Verify 'Cancel' button design on the 'Add User' page", async ({
  page,
}) => {
  const cancelBtn = addUserPage.cancelBtn;

  await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);
  await cancelBtn.hover();
  await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
});

test("Verify 'User Name' field design on the 'Add User' page", async ({
  page,
}) => {
  const placeholder = await addUserPage.userNameField.getAttribute("placeholder");

  await expect(addUserPage.userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(addUserPage.userNameField).toHaveValue("");
});

test("Verify 'Year of Birth' field design and only number input on the 'Add User' page", async ({
  page,
}) => {
  
  await expect(addUserPage.yearOfBirthField).toBeVisible;
  await expect(addUserPage.yearOfBirthField).toHaveValue("");

  // check that non-number input is ignored be the Year of Birth field
  await addUserPage.yearOfBirthField.click();
  await page.keyboard.insertText("!a@");
  await expect(addUserPage.yearOfBirthField).toHaveValue("");
});

test("Check 'Gender' field design and content on the 'Add User' page", async ({
  page,
}) => {
  await expect(addUserPage.genderField).toBeVisible;
  // TODO: update locators which use Label
  // checking option 1 for gender input - Male
  await addUserPage.genderField.selectOption({ label: GenderOptions[1] });
  await expect(addUserPage.genderField).toHaveValue(GenderOptions.Male.toString());

  // checking option 2 for gender input - Female
  await addUserPage.genderField.selectOption({ label: GenderOptions[2] });
  await expect(addUserPage.genderField).toHaveValue(GenderOptions.Female.toString());

  // checking option 0 for gender input - Undefined
  await addUserPage.genderField.selectOption({ label: GenderOptions[0] });
  await expect(addUserPage.genderField).toHaveValue(GenderOptions.Undefined.toString());
});
