import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class EditUserPage extends BasePage {
  readonly updateBtn = this.page.locator(
    'xpath=//button[@data-testid="button-Update"]',
  );

  readonly cancelBtn = this.page.locator(
    'xpath=//a[@data-testid="button-Cancel"]',
  );

  readonly userNameField = this.page.locator(
    'xpath=//input[@id="inputUserName"]',
  );

  readonly yearOfBirthField = this.page.locator(
    'xpath=//input[@id="inputYearOfBirth"]',
  );

  readonly genderField = this.page.locator(
    'xpath=//select[@id="selectGender"]',
  );

  async fillUserNameField(text: string): Promise<void> {
    await this.userNameField.fill(text);
  }

  async fillYearOfBirthField(text: string): Promise<void> {
    await this.yearOfBirthField.fill(text);
  }

  async selectGenderOption(option: string): Promise<void> {
    await this.genderField.selectOption(option);
  }
}
