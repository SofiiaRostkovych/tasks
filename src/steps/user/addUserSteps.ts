import { Page } from "@playwright/test";
import { BaseSteps } from "../base/baseSteps";
import { AddUserPage } from "../../pages/user/addUserPage";
import { SelectedValueHelper } from "../../helpers/selectHelper";

export class AddUserSteps extends BaseSteps {
  private addUserPage: AddUserPage;

  constructor(page: Page) {
    super(page);
    this.addUserPage = this.pageFactory.getPage(AddUserPage);
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
