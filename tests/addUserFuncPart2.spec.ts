import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
import { URLS } from "../src/config/urlProvider";
import { PageFactory } from "../page-factory/page-factory";

const invalidYearOfBirth = [
  "1899",
  "1898",
  (new Date().getFullYear() - 17).toString(),
  (new Date().getFullYear() - 16).toString(),
];

let addUserPage, homePage, deleteUserPage;

test.beforeEach(async ({ page }) => {
  const pageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();
  homePage = pageFactory.getHomePage();
  deleteUserPage = pageFactory.getDeleteUserPage();

  await addUserPage.navigateToAddUserPage();
});

test(`Check creation of user with empty fields`, async () => {
  await addUserPage.clickCreate();

  await expect(await addUserPage.page).toHaveURL(URLS.ADDUSER);
  await expect(await addUserPage.getUserNameFieldError()).toBe(
    "Name is requried",
  );
  await expect(await addUserPage.getYearOfBirthFieldError()).toBe(
    "Year of Birth is requried",
  );
});

test(`Check creation of user with invalid 'User Name' input`, async () => {
  const testStr = generateRandomUserName(addUserPage.minUserNameLength - 1);

  await addUserPage.fillUserNameField(testStr);
  await addUserPage.fillYearOfBirthField("1900");

  await addUserPage.pressEnterUserNameField();

  await expect(await addUserPage.getUserNameFieldError()).toBe(
    "Name is too short",
  );
  await expect(await addUserPage.page).toHaveURL(URLS.ADDUSER);
});

invalidYearOfBirth.forEach((yearOfBirthValue) => {
  test(`Check creation of user with invalid 'Year of Birth' ${yearOfBirthValue}`, async () => {
    const testStr = generateRandomUserName(addUserPage.minUserNameLength);

    await addUserPage.fillUserNameField(testStr);
    await addUserPage.fillYearOfBirthField(yearOfBirthValue);

    await addUserPage.pressEnterYearOfBirthField();

    await expect(await addUserPage.getYearOfBirthFieldError()).toBe(
      "Not valid Year of Birth is set",
    );
    await expect(await addUserPage.page).toHaveURL(URLS.ADDUSER);
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async () => {
  // checking maximum symbols limit - 14 characters for User Name input
  const testStr = generateRandomUserName(addUserPage.maxUserNameLength + 5);
  await addUserPage.fillUserNameField(testStr);
  await expect(await addUserPage.userNameField).toHaveValue(
    testStr.substring(0, addUserPage.maxUserNameLength),
  );
});
