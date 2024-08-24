import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
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

let addUserPage, homePage, deleteUserPage;

test.beforeEach(async ({page})=> {
  const pageFactory = new PageFactory(page);
  
  addUserPage = pageFactory.getAddUserPage();
  homePage = pageFactory.getHomePage();
  deleteUserPage = pageFactory.getDeleteUserPage();

  addUserPage.navigateToAddUserPage();

});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test(`Check successful creation of new user "${userNameValue}"`, async ({
    page,
  }) => {

    await addUserPage.selectGenderOption(genderValue);
    await addUserPage.fillUserNameField(userNameValue);
    await addUserPage.fillYearOfBirthField(yearOfBirthValue);

    await addUserPage.clickCreate();

    let user = await homePage.getUserByUserName(userNameValue);

    await expect(await homePage.getYearOfBirthOfUser()).toBe(
      yearOfBirthValue,
    );
   
    await homePage.clickDeleteUserBtn(userNameValue);
    await deleteUserPage.confirmUserDeletion();
/*
    await expect(createdUser.getByTestId("td-UserName")).toHaveText(
      userNameValue,
    );

   
    */
  });
});

