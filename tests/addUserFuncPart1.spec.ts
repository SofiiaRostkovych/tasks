import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { HomePage } from "../pages/homePage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { URLS } from "../config/urlProvider";

const validUserData: {
  userNameValue: string;
  yearOfBirthValue: string;
  genderValue: GenderOptions;
}[] = [
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
  const pageFactory: PageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();
  homePage = pageFactory.getHomePage();
  deleteUserPage = pageFactory.getDeleteUserPage();

  addUserPage.goToPage(URLS.ADD_USER);
});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test(`Check successful creation of new user "${userNameValue}"`, async () => {
    await addUserPage.selectGenderOption(genderValue);
    await addUserPage.fillUserNameField(userNameValue);
    await addUserPage.fillYearOfBirthField(yearOfBirthValue);

    await addUserPage.createBtn.click();

    expect(await homePage.getYearOfBirthOfUser(userNameValue)).toBe(yearOfBirthValue);
    expect(await homePage.getSelectedGenderOfUser(userNameValue)).toBe(
      GenderOptions[genderValue],
    );

    await homePage.clickDeleteUserBtn(userNameValue);
    await deleteUserPage.yesBtn.click();
  });
});
