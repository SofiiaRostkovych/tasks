import { Locator, Page } from "@playwright/test";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { BasePage } from "./basePage";

export class AddUserPage extends BasePage {
  readonly createBtn: Locator = this.page.getByTestId("button-Create");

  readonly cancelBtn: Locator = this.page.getByTestId("button-Cancel");

  readonly userNameField: Locator = this.page.getByTestId("input-UserName");

  readonly yearOfBirthField: Locator =
    this.page.getByTestId("input-YearOfBirth");

  readonly genderField: Locator = this.page.getByTestId("select-Gender");

  readonly userNameFieldError: Locator = this.page.getByTestId(
    "inputError-UserName",
  );

  readonly yearOfBirthFieldError: Locator = this.page.getByTestId(
    "inputError-YearOfBirth",
  );

  readonly maxUserNameLength: number = 14;

  readonly minUserNameLength: number = 3;

  async fillUserNameField(text: string): Promise<void> {
    await this.userNameField.fill(text);
  }

  async pressEnterUserNameField(): Promise<void> {
    await this.userNameField.press("Enter");
  }

  async fillYearOfBirthField(text: string): Promise<void> {
    await this.yearOfBirthField.fill(text);
  }

  async pressEnterYearOfBirthField(): Promise<void> {
    await this.yearOfBirthField.press("Enter");
  }

  async selectGenderOption(option: number): Promise<void> {
    await this.genderField.selectOption(option.toString());
  }

  async getGenderSelectedOption(): Promise<string> {
    return await extractSelectedDisplayedValue(this.genderField);
  }

  async getUserNameFieldError(): Promise<string> {
    return await this.userNameFieldError.innerText();
  }

  async getYearOfBirthFieldError(): Promise<string> {
    return await this.yearOfBirthFieldError.innerText();
  }
}
