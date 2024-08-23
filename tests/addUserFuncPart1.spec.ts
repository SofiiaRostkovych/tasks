import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { URLS } from "../src/config/urlProvider";

const validUserData = [
  {
    userNameValue: "nб3-w",
    yearOfBirthValue: "1900",
    genderValue: 0,
  },
  {
    userNameValue: "йцу",
    yearOfBirthValue: "2005",
    genderValue: 1,
  },
  {
    userNameValue: "new user",
    yearOfBirthValue: "2004",
    genderValue: 2,
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

let createdUser;

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.ADDUSER);
});

validUserData.forEach(({ userNameValue, yearOfBirthValue, genderValue }) => {
  test(`Check successful creation of new user "${userNameValue}"`, async ({
    page,
  }) => {
    const genderField = page.locator('xpath=//*[@id="selectGender"]');
    const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
    const yearOfBirthField = page.locator('xpath=//*[@id="inputYearOfBirth"]');
    const createBtn = page.locator("xpath=//div[4]/button");

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

    await page.locator("xpath=//div[2]/form/button").click();
  }
});
