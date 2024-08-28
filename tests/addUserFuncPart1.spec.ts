import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { HomePage } from "../pages/homePage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { URLS } from "../config/urlProvider";

const validUserData = [
  {
    userNameValue: "nб3-w",
    yearOfBirthValue: "1900",
    genderValue: GenderOptions.Undefined,
  },
  {
    userNameValue: "йцу",
    yearOfBirthValue: "2005",
    genderValue: GenderOptions.Male,
  },
  {
    userNameValue: "new user",
    yearOfBirthValue: "2004",
    genderValue: GenderOptions.Female,
  },
  // TODO: uncomment after bugfix:
  // 'The User with Year of Birth 2006 is considered underage'
  // Bug report - https://requirements-trainee.atlassian.net/browse/KAN-1
  /* 
  {
    userNameValue: "adult test",
    yearOfBirthValue: (new Date().getFullYear()-18).toString(),
    genderValue: GenderOptions[0],
  },
  */
];

let addUserPage: AddUserPage,
  homePage: HomePage,
  deleteUserPage: DeleteUserPage;

test.beforeEach(async ({ page }) => {
  await test.step("Intitialize the Page Objects using Page Factory", async () => {
    const pageFactory = new PageFactory(page);

    addUserPage = pageFactory.getAddUserPage();
    homePage = pageFactory.getHomePage();
    deleteUserPage = pageFactory.getDeleteUserPage();
  });

  await test.step("Navigate to the 'Add User' page", async () => {
    addUserPage.goToPage(URLS.ADDUSER);
  });
});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test(`Check successful creation of new user "${userNameValue}"`, async () => {
    await test.step("Create new user with valid data", async () => {
      await addUserPage.selectGenderOption(genderValue);
      await addUserPage.fillUserNameField(userNameValue);
      await addUserPage.fillYearOfBirthField(yearOfBirthValue);

      await addUserPage.createBtn.click();
    });

    await test.step("Verify the created user's data", async () => {
      await homePage.getUserByUserName(userNameValue);

      expect(await homePage.getYearOfBirthOfUser()).toBe(yearOfBirthValue);
      expect(await homePage.getSelectedGenderOfUser()).toBe(
        GenderOptions[genderValue],
      );
    });

    await test.step("Delete created user", async () => {
      await homePage.clickDeleteUserBtn();
      await deleteUserPage.yesBtn.click();
    });
  });
});
