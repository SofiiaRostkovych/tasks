import { Locator, Page } from "@playwright/test";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { BasePage } from "./basePage";

export class AddUserPage extends BasePage {
  readonly createBtn = this.page.locator(
    'xpath=//button[@data-testid="button-Create"]',
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
  public yearOfBirthFieldError: Locator;
  public userNameFieldError: Locator;
  readonly maxUserNameLength = 14;
  readonly minUserNameLength = 3;

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
    let userNameFieldError: string = await this.page
      .getByTestId("inputError-UserName")
      .innerText();
    return userNameFieldError;
  }

  async getYearOfBirthFieldError(): Promise<string> {
    let yearOfBirthFieldError: string = await this.page
      .getByTestId("inputError-YearOfBirth")
      .innerText();
    return yearOfBirthFieldError;
  }
}
