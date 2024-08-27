import { Locator, Page } from "@playwright/test";
import { URLS } from "../config/urlProvider";

export class EditUserPage {
  readonly updateBtn: Locator;
  readonly cancelBtn: Locator;
  readonly userNameField: Locator;
  readonly yearOfBirthField: Locator;
  readonly genderField: Locator;

  constructor(private page: Page) {
    this.updateBtn = this.page.locator(
      'xpath=//button[@data-testid="button-Update"]',
    );
    this.cancelBtn = this.page.locator(
      'xpath=//a[@data-testid="button-Cancel"]',
    );
    this.userNameField = this.page.locator('xpath=//*[@id="inputUserName"]');
    this.yearOfBirthField = this.page.locator(
      'xpath=//*[@id="inputYearOfBirth"]',
    );
    this.genderField = this.page.locator('xpath=//*[@id="selectGender"]');
  }

  async navigateToEditUserPage(userEditUrl: string) {
    await this.page.goto(URLS.EDITUSER + userEditUrl);
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }

  async clickUpdate() {
    await this.updateBtn.click();
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
