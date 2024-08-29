import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
import { URLS } from "../config/urlProvider";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";

const invalidYearOfBirth: string[] = [
  "1899",
  "1898",
  (new Date().getFullYear() - 17).toString(),
  (new Date().getFullYear() - 16).toString(),
];

let addUserPage: AddUserPage;

test.beforeEach(async ({ page }) => {
  const pageFactory: PageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();

  await addUserPage.goToPage(URLS.ADD_USER);
});

test(`Check creation of user with empty fields`, async () => {
  await addUserPage.createBtn.click();

  await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
  expect(await addUserPage.getUserNameFieldError()).toBe("Name is requried");
  expect(await addUserPage.getYearOfBirthFieldError()).toBe(
    "Year of Birth is requried",
  );
});

test(`Check creation of user with invalid 'User Name' input`, async () => {
  const testStr: string = generateRandomUserName(
    addUserPage.minUserNameLength - 1,
  );

  await addUserPage.fillUserNameField(testStr);
  await addUserPage.fillYearOfBirthField("1900");

  await addUserPage.pressEnterUserNameField();

  expect(await addUserPage.getUserNameFieldError()).toBe("Name is too short");
  await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
});

invalidYearOfBirth.forEach((yearOfBirthValue) => {
  test(`Check creation of user with invalid 'Year of Birth' ${yearOfBirthValue}`, async () => {
    const testStr: string = generateRandomUserName(
      addUserPage.minUserNameLength,
    );

    await addUserPage.fillUserNameField(testStr);
    await addUserPage.fillYearOfBirthField(yearOfBirthValue);

    await addUserPage.pressEnterYearOfBirthField();

    expect(await addUserPage.getYearOfBirthFieldError()).toBe(
      "Not valid Year of Birth is set",
    );
    await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async () => {
  // checking maximum symbols limit - 14 characters for User Name input
  const testStr: string = generateRandomUserName(
    addUserPage.maxUserNameLength + 5,
  );
  await addUserPage.fillUserNameField(testStr);
  await expect(addUserPage.userNameField).toHaveValue(
    testStr.substring(0, addUserPage.maxUserNameLength),
  );
});