import { test, expect, APIResponse } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
import { URLS } from "../config/urlProvider";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { AddUserSteps } from "../steps/addUserSteps";
import { UserDto } from "../dto/userDto";
import { UserApiClient } from "../api/userApiClient";
import { UserDtoResponse } from "../dto/userDtoResponse ";
import { containsUser } from "../helpers/containsUser";

const usersWithInvalidYearOfBirth: UserDto[] = [
  new UserDto(generateRandomUserName(4), "1899"),
  new UserDto(generateRandomUserName(3), "1898"),
  new UserDto(
    generateRandomUserName(14),
    (new Date().getFullYear() - 17).toString(),
  ),
  new UserDto(
    generateRandomUserName(13),
    (new Date().getFullYear() - 16).toString(),
  ),
];

let addUserPage: AddUserPage;
let addUserSteps: AddUserSteps;
let userApiClient: UserApiClient;

test.beforeEach(async ({ page, request }) => {
  const pageFactory: PageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();

  addUserSteps = new AddUserSteps(page);
  addUserSteps.goToPage(URLS.ADD_USER);

  userApiClient = new UserApiClient(request);
});

test(`Check creation of user with empty fields`, async () => {
  await addUserPage.createBtn.click();

  await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
  expect(await addUserSteps.getUserNameFieldError()).toBe("Name is requried");
  expect(await addUserSteps.getYearOfBirthFieldError()).toBe(
    "Year of Birth is requried",
  );

  let responseForListAllUsers: APIResponse = await userApiClient.listUsers();
    let users: UserDtoResponse[] = await responseForListAllUsers.json();
  
    expect(containsUser(new UserDto("",""), users)).toBe(false);
});

test(`Check creation of user with invalid 'User Name' input`, async () => {
  let testUser: UserDto = new UserDto(generateRandomUserName(
    addUserPage.minUserNameLength - 1,
  ), "1900")
  await addUserSteps.fillField(addUserPage.userNameField, testUser.name);
  await addUserSteps.fillField(addUserPage.yearOfBirthField, testUser.yearOfBirth);

  await addUserPage.createBtn.click();

  expect(await addUserSteps.getUserNameFieldError()).toBe("Name is too short");
  await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
 
  let responseForListAllUsers: APIResponse = await userApiClient.listUsers();
  let users: UserDtoResponse[] = await responseForListAllUsers.json();

  expect(containsUser(testUser, users)).toBe(false);
});

usersWithInvalidYearOfBirth.forEach((userDTO) => {
  test(`Check creation of user with invalid 'Year of Birth' ${userDTO.yearOfBirth}`, async () => {
    await addUserSteps.fillField(addUserPage.userNameField, userDTO.name);
    await addUserSteps.fillField(
      addUserPage.yearOfBirthField,
      userDTO.yearOfBirth,
    );

    await addUserPage.createBtn.click();

    expect(await addUserSteps.getYearOfBirthFieldError()).toBe(
      "Not valid Year of Birth is set",
    );
    await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);

    let responseForListAllUsers: APIResponse = await userApiClient.listUsers();
    let users: UserDtoResponse[] = await responseForListAllUsers.json();
  
    expect(containsUser(userDTO, users)).toBe(false);
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async () => {
  // checking maximum symbols limit - 14 characters for User Name input
  const testStr: string = generateRandomUserName(
    addUserPage.maxUserNameLength + 5,
  );
  await addUserSteps.fillField(addUserPage.userNameField, testStr);
  await expect(addUserPage.userNameField).toHaveValue(
    testStr.substring(0, addUserPage.maxUserNameLength),
  );
});
