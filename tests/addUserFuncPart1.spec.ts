import { test, expect, Locator } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { URLS } from "../config/urlProvider";

const validUserData = [
  {
    userNameValue: "nб3-w",
    yearOfBirthValue: "1900",
    genderValue: GenderOptions.Undefined,
  },
  {
    userNameValue: "йцу",
    yearOfBirthValue: "2005",
    genderValue: GenderOptions.Male,
  },
  {
    userNameValue: "new user",
    yearOfBirthValue: "2004",
    genderValue: GenderOptions.Female,
  },
  // TODO: uncomment after bugfix:
  // 'The User with Year of Birth 2006 is considered underage'
  // Bug report - https://requirements-trainee.atlassian.net/browse/KAN-1
  /* 
  {
    userNameValue: "adult test",
    yearOfBirthValue: (new Date().getFullYear()-18).toString(),
    genderValue: GenderOptions[0],
  },
  */
];

let createdUser: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.ADDUSER);
});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test(`Check successful creation of new user "${userNameValue}"`, async ({
    page,
  }) => {
    const genderField = page.locator('xpath=//select[@id="selectGender"]');
    const userNameField = page.locator('xpath=//input[@id="inputUserName"]');
    const yearOfBirthField = page.locator(
      'xpath=//input[@id="inputYearOfBirth"]',
    );
    const createBtn = page.locator(
      'xpath=//button[@data-testid="button-Create"]',
    );

    await genderField.selectOption(genderValue.toString());
    await userNameField.fill(userNameValue);
    await yearOfBirthField.fill(yearOfBirthValue);
    await createBtn.click();

    const users = await page
      .locator(`xpath=//td[@data-testid="td-UserName"]`)
      .all();
    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        createdUser = user.locator("xpath=//parent::tr");
      }
    }

    await expect(createdUser.getByTestId("td-YearOfBirth")).toHaveText(
      yearOfBirthValue,
    );

    await expect(createdUser.getByTestId("td-UserName")).toHaveText(
      userNameValue,
    );

    await expect(createdUser.getByTestId("td-Gender")).toHaveText(
      GenderOptions[genderValue],
    );
  });
});

test.afterEach(async ({ page }) => {
  if (createdUser) {
    await createdUser.getByTestId("button-Delete").click();

    await page.locator('xpath=//button[@data-testid="button-Yes"]').click();
  }
});
