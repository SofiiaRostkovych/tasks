import { test, expect, APIResponse } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";
import { UserApiClient } from "../api/userApiClient";
import { containsUser } from "../helpers/containsUser";

let userDto: UserDto = new UserDto("user api", "1900", GenderOptions.Undefined);
let userApiClient: UserApiClient;
let userDtoForUpdate: UserDto = new UserDto(
  "updated user",
  "2005",
  GenderOptions.Female,
);

test.beforeEach(async ({ request }) => {
  userApiClient = new UserApiClient(request);
});

test("Verify API GET '/api/User'", async () => {
  const responseForListAllUsers: APIResponse = await userApiClient.listUsers();

  expect(responseForListAllUsers.ok()).toBeTruthy();
  expect(responseForListAllUsers.status()).toBe(200);

  let users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(users.length > 0).toBeTruthy();
});

test("Verify API POST '/api/User'", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  expect(responseForUserCreation.ok()).toBeTruthy();
  expect(responseForUserCreation.status()).toBe(200);

  let createdUser: UserDtoResponse = await responseForUserCreation.json();
  let createdUserId: string = createdUser.id;

  expect(createdUser.gender).toBe(userDto.gender);
  expect(createdUser.name).toBe(userDto.name);
  expect(createdUser.yearOfBirth.toString()).toBe(userDto.yearOfBirth);

  await userApiClient.deleteUser(createdUserId);
});

test("Verify API GET '/api/User/{id}'", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  let createdUser: UserDtoResponse = await responseForUserCreation.json();
  let createdUserId: string = createdUser.id;

  const responseForGetUserById: APIResponse =
    await userApiClient.getUser(createdUserId);

  expect(responseForGetUserById.ok()).toBeTruthy();
  expect(responseForGetUserById.status()).toBe(200);

  let user: UserDtoResponse = await responseForGetUserById.json();

  expect(user.gender).toBe(createdUser.gender);
  expect(user.name).toBe(createdUser.name);
  expect(user.yearOfBirth).toBe(createdUser.yearOfBirth);
  expect(user.created).toBe(createdUser.created);

  await userApiClient.deleteUser(createdUserId);
});

test("Verify API PUT '/api/User/{id}'", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  let createdUser: UserDtoResponse = await responseForUserCreation.json();
  let createdUserId: string = createdUser.id;

  const responseForUserDeletion: APIResponse = await userApiClient.updateUser(
    createdUserId,
    userDtoForUpdate,
  );

  expect(responseForUserDeletion.ok()).toBeTruthy();
  expect(responseForUserDeletion.status()).toBe(200);

  let user: UserDtoResponse = await responseForUserDeletion.json();

  expect(user.gender).toBe(userDtoForUpdate.gender);
  expect(user.name).toBe(userDtoForUpdate.name);
  expect(user.yearOfBirth.toString()).toBe(userDtoForUpdate.yearOfBirth);
  expect(user.created).not.toBe(createdUser.created);

  await userApiClient.deleteUser(createdUserId);
});

test("Verify API DELETE '/api/User/{id}'", async () => {
  const responseForUserCreation: APIResponse =
    await userApiClient.createUser(userDto);

  let createdUser: UserDtoResponse = await responseForUserCreation.json();
  let createdUserId: string = createdUser.id;

  const responseForUserDeletion: APIResponse =
    await userApiClient.deleteUser(createdUserId);

  expect(responseForUserDeletion.ok()).toBeTruthy();
  expect(responseForUserDeletion.status()).toBe(200);

  const responseForListAllUsers: APIResponse = await userApiClient.listUsers();
  let users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(containsUser(createdUser, users)).toBe(false);
});
