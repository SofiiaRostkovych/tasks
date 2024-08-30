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

let userDto = new UserDto("user to delete", "1956", GenderOptions.Undefined);
let createdUser: UserDtoResponse;
let deleteUserPage: DeleteUserPage;
let homeSteps: HomeSteps;
let userApiClient: UserApiClient;

test.beforeEach(async ({ page, request }) => {
  const response: APIResponse = await request.post(URLS.USER_API, {
    data: userDto,
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  createdUser = await response.json();

  const pageFactory: PageFactory = new PageFactory(page);

  deleteUserPage = pageFactory.getDeleteUserPage();
  homeSteps = new HomeSteps(page);

  await homeSteps.goToPage("");
});

test(`Check successful deletion of a user "${userDto.name}"`, async ({
  request,
}) => {
  await homeSteps.clickDeleteUserBtn(userDto.name);
  await deleteUserPage.yesBtn.click();

  userApiClient = new UserApiClient(request);
  let responseForListAllUsers: APIResponse = await userApiClient.listUsers();
  let users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(containsUser(userDto, users)).toBe(false);
});
