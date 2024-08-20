import { test, expect } from "@playwright/test";

enum Colors {
  lightBlue = "rgb(13, 110, 253)",
  darkBlue = "rgb(11, 94, 215)",
  lightGrey = "rgb(108, 117, 125)",
  darkGrey = "rgb(92, 99, 106)",
}

const generateRandomString = (n: number = 15): string => {
  let result = "";

  for (let i = 0; i < n; i++) {
    const randomNumber =
      Math.random() > 0.5
        ? Math.floor(65 + Math.random() * 25)
        : Math.floor(97 + Math.random() * 25);

    const randomChar = String.fromCharCode(randomNumber);

    result += randomChar;
  }
  return result;
};
test.beforeEach(async ({ page }) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");
});
test("Check that page Add User has title", async ({ page }) => {
  await expect(page).toHaveTitle("TS Trainee course");
});

test("Verify Create button design on the Add User page", async ({ page }) => {
  const createBtn = page.locator("xpath=//div[4]/button");
  await expect(createBtn).toBeVisible;
  await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);
  await createBtn.hover();
  await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
});

test("Verify Cancel button design on the Add User page", async ({ page }) => {
  const cancelBtn = page.getByRole("link", { name: "Cancel" });

  await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);
  await cancelBtn.hover();
  await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
});

test("Verify User Name field design and error messages on the Add User page", async ({
  page,
}) => {
  const userNameField = page.locator('xpath=//*[@id="inputUserName"]');
  const placeholder = await userNameField.getAttribute("placeholder");

  await expect(userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(userNameField).toHaveValue("");

  //checking error msg for too short value
  let testStr = generateRandomString(2);
  await userNameField.fill(testStr);
  await expect(userNameField).toHaveValue(testStr);
  const errorMsg = page.locator('xpath=//*[@id="inputUserName-error"]');
  await expect(errorMsg).toBeVisible;

  //checking maximum symbols limit - 14 characters
  testStr = generateRandomString(20);
  await userNameField.fill(testStr);
  await expect(userNameField).toHaveValue(testStr.substring(0, 14));
});

test("Verify Year of Birth field design and error messages on the Add User page", async ({
  page,
}) => {
  const yearOfBirthField = page.getByPlaceholder("Year of Birth");
  await expect(yearOfBirthField).toBeVisible;
  await expect(yearOfBirthField).toHaveValue("");

  //checking the error msg after entering empty field
  await yearOfBirthField.press("Enter");
  let errorMsg = page.locator(
    'xpath=//span[last()][@data-valmsg-for="User.YearOfBirth"]',
  );
  await expect(errorMsg).toBeVisible;
  await expect(errorMsg).toContainText("Year of Birth is requried");

  //checking the error msg after entering invalid Year of Birth(<1900)
  await yearOfBirthField.fill("1899");
  await expect(yearOfBirthField).toHaveValue("1899");
  await yearOfBirthField.press("Enter");
  errorMsg = page.locator('xpath=//*[@id="inputYearOfBirth-error"]');
  await expect(errorMsg).toBeVisible;
  await expect(errorMsg).toContainText("Not valid Year of Birth is set");
});

test("Check Gender field design and content on the Add User page", async ({
  page,
}) => {
  const genderField = page.locator('xpath=//*[@id="selectGender"]');
  await expect(genderField).toBeVisible;

  //checking option 1 - Male
  await genderField.selectOption({ label: "Male" });
  await expect(genderField).toHaveValue("1");

  //checking option 2 - Female
  await genderField.selectOption({ label: "Female" });
  await expect(genderField).toHaveValue("2");

  //checking option 0 - Undefined
  await genderField.selectOption({ label: "Undefined" });
  await expect(genderField).toHaveValue("0");
});

test("Verify Header design and content on the Add User page", async ({
  page,
}) => {
  await page.goto("https://traineeautomation.azurewebsites.net/Forms/AddUser");

  //getting first listitem
  let el = page.locator("xpath=//ul/li[position()<2]");
  await expect(el).toBeVisible;
  await expect(el).toHaveRole("listitem");
  //checking the child of first listitem, which is a link
  let child = el.locator("xpath=child::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Home");
  await expect(child).toHaveAttribute("href", "/");

  //getting the next listitem
  el = el.locator("xpath=following-sibling::li[1]");
  await expect(el).toBeVisible();
  await expect(el).toHaveRole("listitem");
  //checking the child of second listitem, which is a link
  child = el.locator("xpath=descendant::*");
  await expect(child).toHaveRole("link");
  await expect(child).toContainText("Add User");
  await expect(child).toHaveAttribute("href", "/Forms/AddUser");

  //checking the last listitem
  el = el
    .locator("xpath=ancestor::ul") //getting the parent of el - the list element
    .locator('xpath=descendant::a[contains(text(),"Add Address")]'); //getting last link by text it contains
  await expect(el).toHaveRole("link");
  await expect(el).toContainText("Add Address");
  await expect(el).toHaveAttribute("href", "/Forms/AddAddress");
});
