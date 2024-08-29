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
    this.updateBtn = this.page.getByTestId("button-Update");
    this.cancelBtn = this.page.getByTestId("button-Cancel");
    this.userNameField = this.page.getByTestId("input-UserName");
    this.yearOfBirthField = this.page.getByTestId("input-YearOfBirth");
    this.genderField = this.page.getByTestId("select-Gender");
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
