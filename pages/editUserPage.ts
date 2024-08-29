import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class EditUserPage extends BasePage {
  readonly updateBtn: Locator = this.page.getByTestId("button-Update");
  readonly cancelBtn: Locator = this.page.getByTestId("button-Cancel");
  readonly userNameField: Locator = this.page.getByTestId("input-UserName");
  readonly yearOfBirthField: Locator = this.page.getByTestId("input-YearOfBirth");
  readonly genderField: Locator = this.page.getByTestId("select-Gender");

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
