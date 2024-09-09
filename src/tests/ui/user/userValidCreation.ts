import {
  test,
  expect,
  request as playwrightRequest,
  APIRequestContext,
  Page,
} from "@playwright/test";
import { GenderOptions } from "../../../enums/GenderOptions";
import { PageFactory } from "../../../pageFactory/pageFactory";
import { AddUserPage } from "../../../pages/user/addUserPage";
import { DeleteUserPage } from "../../../pages/user/deleteUserPage";
import { URLS } from "../../../providers/urlProvider";
import { AddUserSteps } from "../../../steps/user/addUserSteps";
import { HomeSteps } from "../../../steps/homeSteps";
import { UserDto } from "../../../dto/UserDto";
import { UserApiClient } from "../../../api/userApiClient";
import { GenericSteps } from "../../../steps/base/genericSteps";
import { RegexHelper } from "../../../helpers/regexHelper";
import { RandomGeneratorHelper } from "../../../helpers/randomGeneratorHelper";

let validUserData: UserDto[] = [
  {
    name: "1",
    yearOfBirth: "1900",
    gender: GenderOptions.Undefined,
  },
  {
    name: "2",
    yearOfBirth: "2005",
    gender: GenderOptions.Male,
  },
  {
    name: "3",
    yearOfBirth: "2004",
    gender: GenderOptions.Female,
  },
  // TODO: uncomment last user in array after bugfix:
  // 'The User with Year of Birth 2006 is considered underage'
  // Bug report - https://requirements-trainee.atlassian.net/browse/KAN-1
  /*
  {
    name: "4",
    yearOfBirth: (new Date().getFullYear() - 18).toString(),
    gender: GenderOptions.Male,
  },
  */
];

let addUserPage: AddUserPage;
let homeSteps: HomeSteps;
let createdUserId: string = "";
let genericSteps: GenericSteps;
let request: APIRequestContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  request = await playwrightRequest.newContext();
  const context = await browser.newContext();
  page = await context.newPage();
});

test.beforeEach(async () => {
  const pageFactory: PageFactory = new PageFactory(page);
  genericSteps = new GenericSteps(page);
  addUserPage = pageFactory.getPage(AddUserPage);
  homeSteps = new HomeSteps(page);

  genericSteps.goToPage(URLS.ADD_USER);
});

validUserData.forEach((userDTO: UserDto) => {
  userDTO.name += RandomGeneratorHelper.generateRandomUserName(
    RandomGeneratorHelper.generateRandomNumber(2, 13),
  );

  test(`Check successful creation of new user #${userDTO.name.charAt(0)} @user @desktop @mobile`, async () => {
    await genericSteps.selectOption(addUserPage.genderField, userDTO.gender);
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

// test designed to fail to verify retries in Github Actions
test("Failing test @desktop", async () => {
  expect(1).toBe(2);
});

test.afterEach(async () => {
  if (createdUserId != "") {
    const userApiClient: UserApiClient = new UserApiClient(request);
    await userApiClient.deleteUser(createdUserId);
  }
});
