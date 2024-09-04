import { test, expect, APIResponse } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { UserDto } from "../DTO/UserDto";
import { UserDtoResponse } from "../DTO/UserDtoResponse";
import { UserApiClient } from "../api/userApiClient";
import { ApiSteps } from "../api/apiSteps/apiSteps";
import { UserSteps } from "../steps/userSteps";
import { RandomGeneratorHelper } from "../helpers/randomGeneratorHelper";

let createdUserId: string = "";
let userApiClient: UserApiClient;
let apiSteps: ApiSteps;
let userDto: UserDto;
let userDtoForUpdate: UserDto;

test.beforeEach(async ({ request }) => {
  userApiClient = new UserApiClient(request);
  apiSteps = new ApiSteps();
  userDto = {
    name: RandomGeneratorHelper.generateRandomUserName(5),
    yearOfBirth: "1900",
    gender: GenderOptions.Undefined,
  };

  userDtoForUpdate = {
    name: RandomGeneratorHelper.generateRandomUserName(4),
    yearOfBirth: "2005",
    gender: GenderOptions.Female,
  };
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
  const createdUserId: string = createdUser.id;

  const responseForUserDeletion: APIResponse =
    await userApiClient.deleteUser(createdUserId);

  await apiSteps.verifySuccessResponse(responseForUserDeletion);

  const responseForListAllUsers: APIResponse =
    await userApiClient.getUserList();
  const users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(UserSteps.isUserInList(createdUser, users)).toBe(false);
});

test.afterEach(async () => {
  if (createdUserId != "") {
    await userApiClient.deleteUser(createdUserId);
  }
});
