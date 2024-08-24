import { test, expect } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { GenderOptions } from "../enums/GenderOptions";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { URLS } from "../src/config/urlProvider";
import { PageFactory } from "../page-factory/page-factory";

let addUserPage, homePage, deleteUserPage;

test.beforeEach(async ({page})=> {
  const pageFactory = new PageFactory(page);
  
  addUserPage = pageFactory.getAddUserPage();
  homePage = pageFactory.getHomePage();
  deleteUserPage = pageFactory.getDeleteUserPage();

  addUserPage.navigateToAddUserPage();

});


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

test("Verify 'User Name' field placeholder on the 'Add User' page", async ({
  page,
}) => {
  const placeholder = await addUserPage.userNameField.getAttribute("placeholder");

  await expect(addUserPage.userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(addUserPage.userNameField).toHaveValue("");
});

test("Verify 'Year of Birth' field placeholder and only number input on the 'Add User' page", async ({
  page,
}) => {
  
  await expect(addUserPage.yearOfBirthField).toBeVisible;
  await expect(addUserPage.yearOfBirthField).toHaveValue("");
  const placeholder = await addUserPage.yearOfBirthField.getAttribute("placeholder");
  await expect(placeholder).toEqual("Year of Birth");

  // check that non-number input is ignored be the Year of Birth field
  await addUserPage.yearOfBirthField.click();
  await addUserPage.page.keyboard.insertText("!a@");
  await expect(addUserPage.yearOfBirthField).toHaveValue("");
});

test("Check 'Gender' field content on the 'Add User' page", async ({
  page,
}) => {
  await expect(addUserPage.genderField).toBeVisible;

  // checking option 1 for gender input - Male
  await addUserPage.selectGenderOption("1");
  expect(await addUserPage.getGenderSelectedOption()).toBe(GenderOptions[1]);

  // checking option 2 for gender input - Female
  await addUserPage.selectGenderOption("2");
  expect(await addUserPage.getGenderSelectedOption()).toBe(GenderOptions[2]);

  // checking option 0 for gender input - Undefined
  await addUserPage.selectGenderOption("0");
  expect(await addUserPage.getGenderSelectedOption()).toBe(GenderOptions[0]);

});

test("Verify Header content on the 'Add User' page", async ({ page }) => {
  // getting first listitem of the header
  let listitem = page.locator("xpath=//ul/li[position()<2]");
  await expect(listitem).toBeVisible;
  await expect(listitem).toHaveRole("listitem");
  // checking the content of the child of first listitem of the header, which is a link
  let child = listitem.locator("xpath=child::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Home");
  await expect(child).toHaveAttribute("href", "/");

  // getting the next listitem of the header
  listitem = listitem.locator("xpath=following-sibling::li[1]");
  await expect(listitem).toBeVisible();
  await expect(listitem).toHaveRole("listitem");
  // checking the content of the child of second listitem, which is a link
  child = listitem.locator("xpath=descendant::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Add User");
  await expect(child).toHaveAttribute("href", URLS.ADDUSER);

  // checking the content of last listitem of the header
  child = listitem
    .locator("xpath=ancestor::ul")
    .locator('xpath=descendant::a[contains(text(),"Add Address")]');
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Add Address");
  await expect(child).toHaveAttribute("href", URLS.ADDADDRESS);
});
