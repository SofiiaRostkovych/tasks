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

test.beforeEach(async ({page})=> {
  const pageFactory = new PageFactory(page);
  
  addUserPage = pageFactory.getAddUserPage();
  homePage = pageFactory.getHomePage();
  deleteUserPage = pageFactory.getDeleteUserPage();

  addUserPage.navigateToAddUserPage();

});

test(`Check creation of user with empty fields`, async () => {
  
  await addUserPage.clickCreate();
    await expect(addUserPage.page).toHaveURL(
      URLS.ADDUSER
    );

    await expect(addUserPage.userNameFieldError).toContainText("Name is requried");

    await expect(addUserPage.yearOfBirthFieldError).toContainText(
      "Year of Birth is requried",
    );

});

test(`Check creation of user with invalid 'User Name' input`, async () => {
  const testStr = generateRandomUserName(2);

  await addUserPage.fillUserNameField(testStr);
  await addUserPage.fillYearOfBirthField("1900");
  await addUserPage.pressEnterUserNameField();
  await expect(await addUserPage.getUserNameFieldError()).toBe("Name is too short");
  await expect(addUserPage.page).toHaveURL(
    URLS.ADDUSER
  );
});

invalidYearOfBirth.forEach((yearOfBirthValue) => {
  test(`Check creation of user with invalid 'Year of Birth' ${yearOfBirthValue}`, async ({
    page,
  }) => {
    const testStr = generateRandomUserName(3);

    await addUserPage.fillUserNameField(testStr);
    await addUserPage.fillYearOfBirthField(yearOfBirthValue);
    await addUserPage.pressEnterYearOfBirthField();
    await expect(await addUserPage.getYearOfBirthFieldError()).toBe("Not valid Year of Birth is set");
    await expect(addUserPage.page).toHaveURL(
      URLS.ADDUSER
    );
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async () => {
    // checking maximum symbols limit - 14 characters for User Name input
    const testStr = generateRandomUserName(20);
    await addUserPage.fillUserNameField(testStr);
    await expect(addUserPage.userNameField).toHaveValue(testStr.substring(0, 14));
});
