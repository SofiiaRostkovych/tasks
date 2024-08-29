import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { HomePage } from "../pages/homePage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { URLS } from "../config/urlProvider";
import { AddUserSteps } from "../steps/addUserSteps";
import { HomeSteps } from "../steps/homeSteps";

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

let addUserPage: AddUserPage, deleteUserPage: DeleteUserPage;
let addUserSteps: AddUserSteps, homeSteps: HomeSteps;

test.beforeEach(async ({ page }) => {
  const pageFactory: PageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();
  deleteUserPage = pageFactory.getDeleteUserPage();
  addUserSteps = new AddUserSteps(page);
  homeSteps = new HomeSteps(page);

  addUserSteps.goToPage(URLS.ADD_USER);
});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test(`Check successful creation of new user "${userNameValue}"`, async () => {
    await addUserSteps.selectGenderOption(genderValue);
    await addUserSteps.fillField(addUserPage.userNameField, userNameValue);
    await addUserSteps.fillField(
      addUserPage.yearOfBirthField, yearOfBirthValue
    );

    await addUserPage.createBtn.click();

    expect(await homeSteps.getYearOfBirthOfUser(userNameValue)).toBe(
      yearOfBirthValue,
    );
    expect(await homeSteps.getSelectedGenderOfUser(userNameValue)).toBe(
      GenderOptions[genderValue],
    );

    await homeSteps.clickDeleteUserBtn(userNameValue);
    await deleteUserPage.yesBtn.click();
  });
});
