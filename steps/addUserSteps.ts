import { Locator, Page } from "@playwright/test";
import { BaseSteps } from "./baseSteps";
import { AddUserPage } from "../pages/addUserPage";
import { SelectedValueHelper } from "../helpers/selectHelper";

export class AddUserSteps extends BaseSteps {
  private addUserPage: AddUserPage;

  constructor(page: Page) {
    super(page);
    this.addUserPage = this.pageFactory.getAddUserPage();
  }

  async selectGenderOption(option: number): Promise<void> {
    await this.addUserPage.genderField.selectOption(option.toString());
  }

  async getGenderSelectedOption(): Promise<string> {
    return await SelectedValueHelper.extractSelectedDisplayedValue(
      this.addUserPage.genderField,
    );
  }

  async getUserNameFieldError(): Promise<string> {
    return await this.addUserPage.userNameFieldError.innerText();
  }

  async getYearOfBirthFieldError(): Promise<string> {
    return await this.addUserPage.yearOfBirthFieldError.innerText();
  }
}
