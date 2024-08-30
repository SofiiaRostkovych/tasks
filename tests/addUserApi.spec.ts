import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { HomeSteps } from "../steps/homeSteps";
import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";
import { containsObject } from "../helpers/containsObject"
import { UserApiClient } from "../api/userApiClient";

let userDto = new UserDto("nб3-w", "1900", GenderOptions.Undefined);
let userDtoForUpdate = new UserDto("updated user", "2005", GenderOptions.Female);
let createdUser: UserDtoResponse;
let createdUserId: string;
let deleteUserPage: DeleteUserPage;
let homeSteps: HomeSteps;

let userApiClient: UserApiClient;

test.beforeEach(async ({ request }) => {
   userApiClient = new UserApiClient(request);
  
  });

  test('Check API Get all users', async () => {
    const response = await userApiClient.listUsers();
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    let users: UserDtoResponse[] = await response.json();
    expect(users.length>0).toBeTruthy();
});

test('Check API Post - create new user', async ({request}) => {
    const response = await userApiClient.createUser(userDto);
    createdUser = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    createdUserId = await createdUser.id;
    expect(createdUser.gender).toBe(userDto.gender);
    expect(createdUser.name).toBe(userDto.name);
    expect(createdUser.yearOfBirth.toString()).toBe(userDto.yearOfBirth);

    await userApiClient.deleteUser(createdUserId);
});

test('Check API Get user by id', async ({request}) => {
    const responseForUserCreation = await userApiClient.createUser(userDto);
    createdUser = await responseForUserCreation.json();
    createdUserId = createdUser.id;
   
    const response = await userApiClient.getUser(createdUserId);
    let user: UserDtoResponse = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(user.gender).toBe(createdUser.gender);
    expect(user.name).toBe(createdUser.name);
    expect(user.yearOfBirth).toBe(createdUser.yearOfBirth);
    expect(user.created).toBe(createdUser.created);

    await userApiClient.deleteUser(createdUserId);
});

test('Check API PUT user by id', async ({request}) => {
    const responseForUserCreation = await userApiClient.createUser(userDto);
    createdUser = await responseForUserCreation.json();
    createdUserId = createdUser.id;

    const response = await userApiClient.updateUser(createdUserId, userDtoForUpdate);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    let user: UserDtoResponse = await response.json();
    expect(user.gender).toBe(userDtoForUpdate.gender);
    expect(user.name).toBe(userDtoForUpdate.name);
    expect(user.yearOfBirth.toString()).toBe(userDtoForUpdate.yearOfBirth);
    expect(user.created).not.toBe(createdUser.created);

    
    await userApiClient.deleteUser(createdUserId);
});

test('Check API Delete user by id', async ({request}) => {
    const responseForUserCreation = await userApiClient.createUser(userDto);
    createdUser = await responseForUserCreation.json();
    createdUserId = createdUser.id;

    const response = await userApiClient.deleteUser(createdUserId);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});