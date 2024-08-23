import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
import { PageFactory } from "../page-factory/page-factory";

const validUserData = [
  {
    userNameValue: "nб3-w",
    yearOfBirthValue: "1900",
    genderValue: "0",
  },
  {
    userNameValue: "йцу",
    yearOfBirthValue: "2005",
    genderValue: "1",
  },
  {
    userNameValue: "new user",
    yearOfBirthValue: "2004",
    genderValue: "2",
  },
];

let addUserPage, homePage, deleteUserPage;

test.beforeEach(async ({page})=> {
  const pageFactory = new PageFactory(page);
  
  addUserPage = pageFactory.getAddUserPage();
  homePage = pageFactory.getHomePage();
  deleteUserPage = pageFactory.getDeleteUserPage();

  addUserPage.navigateToAddUserPage();

});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test.describe(`Verify user "${userNameValue}" creation with valid data`, () => {
    test(`Check successful creation of new user`, async ({ page }) => {
      const genderField = page.locator('xpath=//*[@id="selectGender"]');
      const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
      const yearOfBirthField = page.locator(
        'xpath=//*[@id="inputYearOfBirth"]',
      );
      const createBtn = page.locator("xpath=//div[4]/button");
      await addUserPage.selectGenderOption(genderValue);
      await addUserPage.fillUserNameField(userNameValue);
      await addUserPage.fillYearOfBirthField(yearOfBirthValue);

      await addUserPage.clickCreate();
      await homePage.getYearOfBirthOfUser(userNameValue);
      await expect(homePage.yearOfBirthOfUser).toHaveText(
        yearOfBirthValue,
      );
    });

    test.afterEach(async ({ page }) => {
      await homePage.clickDeleteUserBtn(userNameValue);
      await deleteUserPage.confirmUserDeletion();
    });
  });
});

test.describe(`Check unsuccessful user creation`, () => {
  test(`Check creation of user with empty fields`, async ({ page }) => {
    await addUserPage.clickCreate();
    await expect(addUserPage.page).toHaveURL(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser",
    );

    await expect(addUserPage.userNameFieldError).toContainText("Name is requried");

    await expect(addUserPage.yearOfBirthFieldError).toContainText(
      "Year of Birth is requried",
    );
    
  });

  test(`Check creation of user with invalid username`, async () => {
 
    const testStr = generateRandomUserName(2);

    await addUserPage.fillUserNameField(testStr);
    await addUserPage.fillYearOfBirthField("1900");
    await addUserPage.pressEnterUserNameField();
    await expect(addUserPage.page.getByTestId('inputError-UserName')).toContainText("Name is too short");
    await expect(addUserPage.page).toHaveURL(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser",
    );
  });

  test(`Check creation of user with invalid year of birth`, async ({}) => {

    const testStr = generateRandomUserName(3);

    await addUserPage.fillUserNameField(testStr);
    await addUserPage.fillYearOfBirthField("1899");
    await addUserPage.pressEnterYearOfBirthField();
    await expect(addUserPage.yearOfBirthFieldError).toContainText("Not valid Year of Birth is set");
    await expect(addUserPage.page).toHaveURL(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser",
    );
  });
});
