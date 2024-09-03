import { test, expect, APIResponse } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { HomeSteps } from "../steps/homeSteps";
import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";
import { containsUser } from "../helpers/containsUser";
import { URLS } from "../config/urlProvider";
import { UserApiClient } from "../api/userApiClient";
import { generateRandomUserName } from "../helpers/generateRandomUserName";

let userDto: UserDto;
let createdUser: UserDtoResponse;
let deleteUserPage: DeleteUserPage;
let homeSteps: HomeSteps;
let userApiClient: UserApiClient;

test.beforeEach(async ({ page, request }) => {
  userDto = new UserDto(
    generateRandomUserName(10),
    "1956",
    GenderOptions.Undefined,
  );
  userApiClient = new UserApiClient(request);
  const response = await userApiClient.createUser(userDto);
  createdUser = await response.json();

  const pageFactory: PageFactory = new PageFactory(page);
  deleteUserPage = pageFactory.getDeleteUserPage();

  homeSteps = new HomeSteps(page);
  await homeSteps.goToPage("");
});

test(`Check successful deletion of a user`, async ({ request }) => {
  await homeSteps.clickDeleteUserBtn(userDto.name);
  await deleteUserPage.yesBtn.click();

  userApiClient = new UserApiClient(request);
  const responseForListAllUsers: APIResponse =
    await userApiClient.getUserList();
  const users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(containsUser(userDto, users)).toBe(false);
});
