import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";
const validUserData = [
  {
    userNameValue: "nб3-w",
    yearOfBirthValue: "1900",
    genderValue: "Undefined",
  },
  {
    userNameValue: "йцу",
    yearOfBirthValue: "2005",
    genderValue: "Male",
  },
  {
    userNameValue: "new user",
    yearOfBirthValue: "2004",
    genderValue: "Female",
  },
];

let userDeletionUrl;

test.beforeEach(async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test.describe(`Verify user "${userNameValue}" creation with valid data`, () => {
    test(`Check successful creation of new user`, async ({ page }) => {
      const genderField = page.locator('xpath=//*[@id="selectGender"]');
      const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
      const yearOfBirthField = page.locator(
        'xpath=//*[@id="inputYearOfBirth"]',
      );
      const createBtn = page.locator("xpath=//div[4]/button");

      // TODO: update locators which use Label
      await genderField.selectOption({ label: "Male" });
      await userNameField.fill(userNameValue);
      await yearOfBirthField.fill(yearOfBirthValue);
      createBtn.click();

      const user = await page.locator('tr:has-text("' + userNameValue + '")');
      userDeletionUrl = await user.getByTestId("button-Delete").getAttribute("href");
      await expect(user.getByTestId("td-YearOfBirth")).toHaveText(
        yearOfBirthValue,
      );
      await expect(user.getByTestId("td-UserName")).toHaveText(userNameValue);
    });

    test.afterEach(async ({ page }) => {
      await page.goto("https://traineeautomation.azurewebsites.net" + userDeletionUrl);

      // TODO: update locators which use Name
      await page.getByRole("button", { name: "Yes" }).click();
    });
  });
});

test.describe(`Check unsuccessful user creation`, () => {
  test(`Check creation of user with empty fields`, async ({ page }) => {
    const createBtn = page.locator("xpath=//div[4]/button");
    await createBtn.click();

    const nameIsRequiredErr = page.locator(
      'xpath=//*[@id="inputUserName-error"]',
    );
    await expect(nameIsRequiredErr).toContainText("Name is requried");

    const yearOfBirthIsRequiredErr = page.locator(
      'xpath=//span[last()][@data-valmsg-for="User.YearOfBirth"]',
    );
    await expect(yearOfBirthIsRequiredErr).toBeVisible;
    await expect(yearOfBirthIsRequiredErr).toContainText(
      "Year of Birth is requried",
    );
  });

  test(`Check creation of user with invalid username`, async ({ page }) => {
    const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
    const yearOfBirthField = page.locator("xpath=//div[3]/input");
    const testStr = generateRandomUserName(2);

    await userNameField.fill(testStr);

    yearOfBirthField.fill("1900");
    await yearOfBirthField.press("Enter");
    const nameIsTooShortErr = page.locator(
      'xpath=//*[@id="inputUserName-error"]',
    );
    await expect(nameIsTooShortErr).toContainText("Name is too short");
    await expect(page).toHaveURL(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser",
    );
  });

  test(`Check creation of user with invalid year of birth`, async ({
    page,
  }) => {
    const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
    const yearOfBirthField = page.locator("xpath=//div[3]/input");

    const testStr = generateRandomUserName(3);
    await userNameField.fill(testStr);
    yearOfBirthField.fill("1899");

    await yearOfBirthField.press("Enter");
    const yearOfBirthIsInvalidErr = page.locator(
      'xpath=//*[@id="inputYearOfBirth-error"]',
    );
    await expect(yearOfBirthIsInvalidErr).toContainText(
      "Not valid Year of Birth is set",
    );
    await expect(page).toHaveURL(
      "https://traineeautomation.azurewebsites.net/Forms/AddUser",
    );
  });
});
