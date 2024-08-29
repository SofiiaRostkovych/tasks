import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
import { URLS } from "../config/urlProvider";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { AddUserSteps } from "../steps/addUserSteps";
import { UserDTO } from "../dto/userDTO";

const usersWithInvalidYearOfBirth: UserDTO[] = [
  new UserDTO(generateRandomUserName(4), "1899"),
  new UserDTO(generateRandomUserName(3), "1898"),
  new UserDTO(
    generateRandomUserName(14),
    (new Date().getFullYear() - 17).toString(),
  ),
  new UserDTO(
    generateRandomUserName(13),
    (new Date().getFullYear() - 16).toString(),
  ),
];

let addUserPage: AddUserPage;
let addUserSteps: AddUserSteps;

test.beforeEach(async ({ page }) => {
  const pageFactory: PageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();

  addUserSteps = new AddUserSteps(page);
  addUserSteps.goToPage(URLS.ADD_USER);
});

test(`Check creation of user with empty fields`, async () => {
  await addUserPage.createBtn.click();

  await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
  expect(await addUserSteps.getUserNameFieldError()).toBe("Name is requried");
  expect(await addUserSteps.getYearOfBirthFieldError()).toBe(
    "Year of Birth is requried",
  );
});

test(`Check creation of user with invalid 'User Name' input`, async () => {
  const testStr: string = generateRandomUserName(
    addUserPage.minUserNameLength - 1,
  );

  await addUserSteps.fillField(testStr, addUserPage.userNameField);
  await addUserSteps.fillField("1900", addUserPage.yearOfBirthField);

  await addUserPage.createBtn.click();

  expect(await addUserSteps.getUserNameFieldError()).toBe("Name is too short");
  await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
});

usersWithInvalidYearOfBirth.forEach((userDTO) => {
  test(`Check creation of user with invalid 'Year of Birth' ${userDTO.yearOfBirthValue}`, async () => {
    await addUserSteps.fillField(
      userDTO.userNameValue,
      addUserPage.userNameField,
    );
    await addUserSteps.fillField(
      userDTO.yearOfBirthValue,
      addUserPage.yearOfBirthField,
    );

    await addUserPage.createBtn.click();

    expect(await addUserSteps.getYearOfBirthFieldError()).toBe(
      "Not valid Year of Birth is set",
    );
    await expect(addUserPage.page).toHaveURL(URLS.ADD_USER);
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async () => {
  // checking maximum symbols limit - 14 characters for User Name input
  const testStr: string = generateRandomUserName(
    addUserPage.maxUserNameLength + 5,
  );
  await addUserSteps.fillField(testStr, addUserPage.userNameField);
  await expect(addUserPage.userNameField).toHaveValue(
    testStr.substring(0, addUserPage.maxUserNameLength),
  );
});
