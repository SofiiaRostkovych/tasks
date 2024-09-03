import { test, expect, APIResponse } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";
import { UserApiClient } from "../api/userApiClient";
import { containsUser } from "../helpers/containsUser";
import { ApiSteps } from "../api/apiSteps/apiSteps";
import { generateRandomUserName } from "../helpers/generateRandomUserName";

let createdUserId: string = "";
let userApiClient: UserApiClient;
let apiSteps: ApiSteps;
let userDto: UserDto;
let userDtoForUpdate: UserDto;

test.beforeEach(async ({ request }) => {
  userApiClient = new UserApiClient(request);
  apiSteps = new ApiSteps();
  userDto = new UserDto(
    generateRandomUserName(5),
    "1900",
    GenderOptions.Undefined,
  );
  userDtoForUpdate = new UserDto(
    generateRandomUserName(4),
    "2005",
    GenderOptions.Female,
  );
});

test("Verify getting list of users using API", async () => {
  const responseForListAllUsers: APIResponse =
    await userApiClient.getUserList();

  apiSteps.verifySuccessResponse(responseForListAllUsers);

  const users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(users.length).toBeGreaterThan(0);
});

test("Check user creation using API", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  apiSteps.verifySuccessResponse(responseForUserCreation);

  const createdUser: UserDtoResponse = await responseForUserCreation.json();
  createdUserId = createdUser.id;

  apiSteps.verifyReceivedUser(createdUser, userDto);
});

test("Verify getting user's info by id using API", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  const createdUser: UserDtoResponse = await responseForUserCreation.json();
  createdUserId = createdUser.id;

  const responseForGetUserById: APIResponse =
    await userApiClient.getUser(createdUserId);

  await apiSteps.verifySuccessResponse(responseForGetUserById);

  const user: UserDtoResponse = await responseForGetUserById.json();

  await apiSteps.verifyReceivedUser(createdUser, userDto);
  expect(user.created).toBe(createdUser.created);
});

test("Check updating the user using API", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  const createdUser: UserDtoResponse = await responseForUserCreation.json();
  createdUserId = createdUser.id;

  const responseForUserUpdate: APIResponse = await userApiClient.updateUser(
    createdUserId,
    userDtoForUpdate,
  );

  await apiSteps.verifySuccessResponse(responseForUserUpdate);

  const user: UserDtoResponse = await responseForUserUpdate.json();

  await apiSteps.verifyReceivedUser(user, userDtoForUpdate);
  expect(user.created).not.toBe(createdUser.created);
});

test("Verify user deletion using API", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  const createdUser: UserDtoResponse = await responseForUserCreation.json();
  const createdUserId = createdUser.id;

  const responseForUserDeletion: APIResponse =
    await userApiClient.deleteUser(createdUserId);

  await apiSteps.verifySuccessResponse(responseForUserDeletion);

  const responseForListAllUsers: APIResponse =
    await userApiClient.getUserList();
  const users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(containsUser(createdUser, users)).toBe(false);
});

test.afterEach(async () => {
  if (createdUserId != "") await userApiClient.deleteUser(createdUserId);
});
