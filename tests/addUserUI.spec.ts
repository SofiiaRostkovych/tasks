import { test, expect, Locator } from "@playwright/test";
import { Colors } from "../enums/Colors";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { URLS } from "../config/urlProvider";

let addUserPage: AddUserPage;

test.beforeEach(async ({ page }) => {
  await test.step("Intitialize the Page Object using Page Factory", async () => {
    const pageFactory: PageFactory = new PageFactory(page);

    addUserPage = pageFactory.getAddUserPage();
  });

  await test.step("Navigate to the 'Add User' page", async () => {
    await addUserPage.goToPage(URLS.ADD_USER);
  });
});

test("Verify 'Create' button design on the 'Add User' page", async () => {
  let createBtn: Locator;
  await test.step("Check the 'Create' button background color in neutural state", async () => {
    createBtn = addUserPage.createBtn;

    await expect(createBtn).toHaveCSS("background-color", Colors.lightBlue);
  });

  await test.step("Check the 'Create' button background color after hovering", async () => {
    await createBtn.hover();

    await expect(createBtn).toHaveCSS("background-color", Colors.darkBlue);
  });
});

test("Verify 'Cancel' button design on the 'Add User' page", async () => {
  let cancelBtn: Locator;
  await test.step("Check the 'Cancel' button background color in neutural state", async () => {
    cancelBtn = addUserPage.cancelBtn;

    await expect(cancelBtn).toHaveCSS("background-color", Colors.lightGrey);
  });

  await test.step("Check the 'Cancel' button background color after hovering", async () => {
    await cancelBtn.hover();
    await expect(cancelBtn).toHaveCSS("background-color", Colors.darkGrey);
  });
});

test("Verify 'User Name' field placeholder on the 'Add User' page", async () => {
  await test.step("Check the placeholder for the 'User Name' field", async () => {
    const placeholder: string | null =
      await addUserPage.userNameField.getAttribute("placeholder");
    expect(placeholder).toEqual("User Name");
  });

  await test.step("Verify the 'User Name' field default value", async () => {
    await expect(addUserPage.userNameField).toHaveValue("");
  });
});

test("Verify 'Year of Birth' field placeholder and only number input on the 'Add User' page", async () => {
  await test.step("Check the 'Year of Birth' field default value", async () => {
    await expect(addUserPage.yearOfBirthField).toHaveValue("");
  });

  await test.step("Check the placeholder for the 'Year of Birth' field", async () => {
    const placeholder: string | null =
      await addUserPage.yearOfBirthField.getAttribute("placeholder");
    expect(placeholder).toEqual("Year of Birth");
  });

  await test.step("Verify that non-number input is ignored by the 'Year of Birth' field", async () => {
    await addUserPage.yearOfBirthField.click();
    await addUserPage.page.keyboard.insertText("!a@");
    await expect(addUserPage.yearOfBirthField).toHaveValue("");
  });
});

test("Check 'Gender' field content on the 'Add User' page", async () => {
  await test.step("Check the 'Male' option for the 'Gender' select", async () => {
    await addUserPage.selectGenderOption(GenderOptions.Male);
    expect(await addUserPage.getGenderSelectedOption()).toBe(
      GenderOptions[GenderOptions.Male],
    );
  });

  await test.step("Check the 'Female' option for the 'Gender' select", async () => {
    await addUserPage.selectGenderOption(GenderOptions.Female);
    expect(await addUserPage.getGenderSelectedOption()).toBe(
      GenderOptions[GenderOptions.Female],
    );
  });

  await test.step("Check the 'Undefined' option for the 'Gender' select", async () => {
    await addUserPage.selectGenderOption(GenderOptions.Undefined);
    expect(await addUserPage.getGenderSelectedOption()).toBe(
      GenderOptions[GenderOptions.Undefined],
    );
  });
});

// this test was used to practice writing tests with XPath functions and axis
/*test("Verify Header content on the 'Add User' page", async ({ page }) => {
  // checking the content of the first listitem of the header
  let listitem = page.locator("xpath=//ul/li[position()<2]/child::a");
  await expect(listitem).toHaveText("Home");
  await expect(listitem).toHaveAttribute("href", "/");

  // checking the content of the second listitem of the header
  listitem = listitem.locator(
    "xpath=/parent::li/following-sibling::li[1]/descendant::a",
  );
  await expect(listitem).toHaveText("Add User");
  await expect(listitem).toHaveAttribute("href", URLS.ADDUSER);

  // checking the content of last listitem of the header
  listitem = listitem.locator(
    'xpath=ancestor::ul/descendant::a[contains(text(),"Add Address")]',
  );
  await expect(listitem).toHaveText("Add Address");
  await expect(listitem).toHaveAttribute("href", URLS.ADDADDRESS);
});*/
