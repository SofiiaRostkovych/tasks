import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { HomePage } from "../pages/homePage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { URLS } from "../config/urlProvider";
import { AddUserSteps } from "../steps/addUserSteps";
import { HomeSteps } from "../steps/homeSteps";
import { UserDTO } from "../dto/userDTO";

const validUserData: UserDTO[] = [
  new UserDTO("nб3-w", "1900", GenderOptions.Undefined),
  new UserDTO("йцу", "2005", GenderOptions.Male),
  new UserDTO("new user", "2004", GenderOptions.Female),
  // TODO: uncomment after bugfix:
  // 'The User with Year of Birth 2006 is considered underage'
  // Bug report - https://requirements-trainee.atlassian.net/browse/KAN-1
  /* 
   new UserDTO("adult test", (new Date().getFullYear()-18).toString(), GenderOptions[0]),
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

validUserData.forEach((userDTO) => {
  test(`Check successful creation of new user "${userDTO.userNameValue}"`, async () => {
    await addUserSteps.selectGenderOption(userDTO.genderValue);
    await addUserSteps.fillField(
      userDTO.userNameValue,
      addUserPage.userNameField,
    );
    await addUserSteps.fillField(
      userDTO.yearOfBirthValue,
      addUserPage.yearOfBirthField,
    );

    await addUserPage.createBtn.click();

    expect(await homeSteps.getYearOfBirthOfUser(userDTO.userNameValue)).toBe(
      userDTO.yearOfBirthValue,
    );
    expect(await homeSteps.getSelectedGenderOfUser(userDTO.userNameValue)).toBe(
      GenderOptions[userDTO.genderValue],
    );

    await homeSteps.clickDeleteUserBtn(userDTO.userNameValue);
    await deleteUserPage.yesBtn.click();
  });
});
