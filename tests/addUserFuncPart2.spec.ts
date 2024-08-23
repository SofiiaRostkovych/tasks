import { test, expect } from "@playwright/test";
import { generateRandomUserName } from "../helpers/generateRandomUserName";

const invalidYearOfBirth = [
  "1899",
  "1898",
  (new Date().getFullYear() - 17).toString(),
  (new Date().getFullYear() - 16).toString(),
];

test.beforeEach(async ({ page }) => {
  await page.goto("/Forms/AddUser");
});

test(`Check creation of user with empty fields`, async ({ page }) => {
  const createBtn = page.locator("xpath=//div[4]/button");
  await createBtn.click();

  const nameIsRequiredErr = page.locator(
    'xpath=//*[@id="inputUserName-error"]',
  );
  await expect(nameIsRequiredErr).toHaveText("Name is requried");

  const yearOfBirthIsRequiredErr = page.locator(
    'xpath=//span[last()][@data-valmsg-for="User.YearOfBirth"]',
  );
  await expect(yearOfBirthIsRequiredErr).toBeVisible;
  await expect(yearOfBirthIsRequiredErr).toHaveText(
    "Year of Birth is requried",
  );
});

test(`Check creation of user with invalid 'User Name' input`, async ({
  page,
}) => {
  const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
  const yearOfBirthField = page.locator("xpath=//div[3]/input");
  const testStr = generateRandomUserName(2);

  await userNameField.fill(testStr);

  yearOfBirthField.fill("1900");
  await yearOfBirthField.press("Enter");
  const nameIsTooShortErr = page.locator(
    'xpath=//*[@id="inputUserName-error"]',
  );
  await expect(nameIsTooShortErr).toHaveText("Name is too short");
  await expect(page).toHaveURL("/Forms/AddUser");
});

invalidYearOfBirth.forEach((yearOfBirthValue) => {
  test(`Check creation of user with invalid 'Year of Birth' ${yearOfBirthValue}`, async ({
    page,
  }) => {
    const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
    const yearOfBirthField = page.locator("xpath=//div[3]/input");

    const testStr = generateRandomUserName(3);
    await userNameField.fill(testStr);
    yearOfBirthField.fill(yearOfBirthValue);

    await yearOfBirthField.press("Enter");
    const yearOfBirthIsInvalidErr = page.locator(
      'xpath=//*[@id="inputYearOfBirth-error"]',
    );
    await expect(yearOfBirthIsInvalidErr).toHaveText(
      "Not valid Year of Birth is set",
    );
    await expect(page).toHaveURL("/Forms/AddUser");
  });
});

test("Verify 'User Name' maximum symbols limit on the 'Add User' page", async ({
  page,
}) => {
  const userNameField = page.locator('xpath=//*[@id="inputUserName"]');

  // checking maximum symbols limit - 14 characters for User Name input
  const testStr = generateRandomUserName(20);
  await userNameField.fill(testStr);
  await expect(userNameField).toHaveValue(testStr.substring(0, 14));
});
