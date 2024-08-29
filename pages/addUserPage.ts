import { Locator, Page } from "@playwright/test";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { BasePage } from "./basePage";

export class AddUserPage extends BasePage {
  readonly page: Page;
  readonly createBtn: Locator;
  readonly cancelBtn: Locator;
  readonly userNameField: Locator;
  readonly yearOfBirthField: Locator;
  readonly genderField: Locator;
  readonly headerListitem: Locator;
  public yearOfBirthFieldError: Locator;
  public userNameFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.createBtn = this.page.locator(
      'xpath=//button[@data-testid="button-Create"]',
    );
    this.cancelBtn = this.page.locator(
      'xpath=//a[@data-testid="button-Cancel"]',
    );
    this.userNameField = this.page.locator(
      'xpath=//input[@id="inputUserName"]',
    );
    this.yearOfBirthField = this.page.locator(
      'xpath=//input[@id="inputYearOfBirth"]',
    );
    this.genderField = this.page.locator('xpath=//select[@id="selectGender"]');
  }

  async fillUserNameField(text: string) {
    await this.userNameField.fill(text);
  }

  async pressEnterUserNameField() {
    await this.userNameField.press("Enter");
  }

  async fillYearOfBirthField(text: string) {
    await this.yearOfBirthField.fill(text);
  }

  async pressEnterYearOfBirthField() {
    await this.yearOfBirthField.press("Enter");
  }

  async selectGenderOption(option: number) {
    await this.genderField.selectOption(option.toString());
  }

  async getGenderSelectedOption() {
    return await extractSelectedDisplayedValue(this.genderField);
  }

  async getUserNameFieldError() {
    let userNameFieldError = await this.page
      .getByTestId("inputError-UserName")
      .innerText();
    return userNameFieldError;
  }

  async getYearOfBirthFieldError() {
    let yearOfBirthFieldError = await this.page
      .getByTestId("inputError-YearOfBirth")
      .innerText();
    return yearOfBirthFieldError;
  }
}
