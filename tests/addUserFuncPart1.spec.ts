import { test, expect, APIResponse } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { URLS } from "../config/urlProvider";
import { AddUserSteps } from "../steps/addUserSteps";
import { HomeSteps } from "../steps/homeSteps";
import { UserDto } from "../DTO/UserDto";
import { UserApiClient } from "../api/userApiClient";
import { GenericSteps } from "../steps/genericSteps";
import { RegexHelper } from "../helpers/regexHelper";

const validUserData: UserDto[] = [
  { name: "nб3-w", yearOfBirth: "1900", gender: GenderOptions.Undefined },
  { name: "йцу", yearOfBirth: "2005", gender: GenderOptions.Male },
  { name: "new user", yearOfBirth: "2004", gender: GenderOptions.Female },
  // TODO: uncomment last user in array after bugfix:
  // 'The User with Year of Birth 2006 is considered underage'
  // Bug report - https://requirements-trainee.atlassian.net/browse/KAN-1

  // Uncommented to check retry with GithubAction

  {
    name: "adult test",
    yearOfBirth: (new Date().getFullYear() - 18).toString(),
    gender: GenderOptions.Male,
  },
];

let addUserPage: AddUserPage, deleteUserPage: DeleteUserPage;
let addUserSteps: AddUserSteps, homeSteps: HomeSteps;
let createdUserId: string;
let genericSteps: GenericSteps;

test.beforeEach(async ({ page }) => {
  const pageFactory: PageFactory = new PageFactory(page);

  genericSteps = new GenericSteps(page);
  addUserPage = pageFactory.getAddUserPage();
  deleteUserPage = pageFactory.getDeleteUserPage();
  addUserSteps = new AddUserSteps(page);
  homeSteps = new HomeSteps(page);

  genericSteps.goToPage(URLS.ADD_USER);
});

validUserData.forEach((userDTO) => {
  test(`Check successful creation of new user "${userDTO.name}"`, async () => {
    await addUserSteps.selectGenderOption(userDTO.gender);
    await genericSteps.fillField(addUserPage.userNameField, userDTO.name);
    await genericSteps.fillField(
      addUserPage.yearOfBirthField,
      userDTO.yearOfBirth,
    );

    await addUserPage.createBtn.click();

    expect(await homeSteps.getYearOfBirthOfUser(userDTO.name)).toBe(
      userDTO.yearOfBirth,
    );
    expect(await homeSteps.getSelectedGenderOfUser(userDTO.name)).toBe(
      GenderOptions[userDTO.gender],
    );

    await homeSteps.clickDeleteUserBtn(userDTO.name);

    createdUserId = RegexHelper.getIdFromUrl(homeSteps.page.url());
  });
});

test.afterEach(async ({ request }) => {
  const userApiClient: UserApiClient = new UserApiClient(request);
  await userApiClient.deleteUser(createdUserId);
});
