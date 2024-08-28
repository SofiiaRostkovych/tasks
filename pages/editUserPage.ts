import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class EditUserPage extends BasePage {
  readonly updateBtn: Locator;
  readonly cancelBtn: Locator;
  readonly userNameField: Locator;
  readonly yearOfBirthField: Locator;
  readonly genderField: Locator;

  constructor(page: Page) {
    super(page);
    this.updateBtn = this.page.locator(
      'xpath=//button[@data-testid="button-Update"]',
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

  async fillYearOfBirthField(text: string) {
    await this.yearOfBirthField.fill(text);
  }

  async selectGenderOption(option: string) {
    await this.genderField.selectOption(option);
  }
}
