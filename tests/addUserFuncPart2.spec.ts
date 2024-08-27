import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
import { URLS } from "../src/config/urlProvider";
import { PageFactory } from "../page-factory/page-factory";

const invalidYearOfBirth = [
  "1899",
  "1898",
  (new Date().getFullYear() - 17).toString(),
  (new Date().getFullYear() - 16).toString(),
];

let addUserPage;

test.beforeEach(async ({ page }) => {
  const pageFactory = new PageFactory(page);

  addUserPage = pageFactory.getAddUserPage();

  await addUserPage.navigateToAddUserPage();
});

test(`Check creation of user with empty fields`, async () => {
  await test.step('Click "Create" button without filling out the fields', async()=>{
    await addUserPage.clickCreate();
  });

  await test.step('Check the result of trying to create user with empty fields', async()=>{
    await expect(await addUserPage.page).toHaveURL(URLS.ADDUSER);
    await expect(await addUserPage.getUserNameFieldError()).toBe(
      "Name is requried",
    );
    await expect(await addUserPage.getYearOfBirthFieldError()).toBe(
      "Year of Birth is requried",
    );
  });
});

test(`Check creation of user with invalid 'User Name' input`, async () => {
  await test.step('Fill "User Name" field with invalid input', async()=>{
    const testStr = generateRandomUserName(addUserPage.minUserNameLength - 1);
    await addUserPage.fillUserNameField(testStr);
  });

  await test.step('Fill "Year Of Birth" field with valid input and press "Enter"', async()=>{
    await addUserPage.fillYearOfBirthField("1900");
    await addUserPage.pressEnterUserNameField();
  });

  await test.step('Check the result of trying to create user with invalid User Name', async()=>{
    await expect(await addUserPage.getUserNameFieldError()).toBe(
      "Name is too short",
    );
    await expect(await addUserPage.page).toHaveURL(URLS.ADDUSER);
  });
});

invalidYearOfBirth.forEach((yearOfBirthValue) => {
  test(`Check creation of user with invalid 'Year of Birth' ${yearOfBirthValue}`, async () => {
    await test.step('Fill "User Name" field with valid input', async()=>{
      const testStr = generateRandomUserName(addUserPage.minUserNameLength);
      await addUserPage.fillUserNameField(testStr);
    });
  
    await test.step('Fill "Year Of Birth" field with invalid input and press "Enter"', async()=>{
      await addUserPage.fillYearOfBirthField(yearOfBirthValue);
      await addUserPage.pressEnterYearOfBirthField();
    });

    await test.step('Check the result of trying to create user with invalid Year Of Birth', async()=>{
      await expect(await addUserPage.getYearOfBirthFieldError()).toBe(
        "Not valid Year of Birth is set",
      );
      await expect(await addUserPage.page).toHaveURL(URLS.ADDUSER);
    });
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async () => {
  let testStr;
  await test.step('Try to fill "User Name" field with value that is too long', async()=>{
    testStr = generateRandomUserName(addUserPage.maxUserNameLength + 5);
    await addUserPage.fillUserNameField(testStr);
  });

  await test.step('Check the value of the "User Name" field', async()=>{
    await expect(await addUserPage.userNameField).toHaveValue(
      testStr.substring(0, addUserPage.maxUserNameLength),
    );
  });
});
