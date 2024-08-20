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
  const createBtn = page.getByRole("button", { name: "Create" });
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
  const userNameField = page.getByLabel("User Name"); //need to change to XPath
  const placeholder = await userNameField.getAttribute("placeholder");

  await expect(userNameField).toBeVisible;
  await expect(placeholder).toEqual("User Name");
  await expect(userNameField).toHaveValue("");

  //checking error msg for too short value
  let testStr = generateRandomString(2);
  await userNameField.fill(testStr);
  await expect(userNameField).toHaveValue(testStr);
  const err = page.getByText("Name is too short"); //need to change to XPath
  await expect(err).toBeVisible;

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
});

test("Check Gender field design and content on the Add User page", async ({
  page,
}) => {
  //XPAth would be better than label
  const genderField = page.getByLabel("Gender");
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