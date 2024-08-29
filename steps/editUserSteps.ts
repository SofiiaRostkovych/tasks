import { Locator, Page } from "@playwright/test";
import { PageFactory } from "../pageFactory/pageFactory";
import { BaseSteps } from "./baseSteps";
import { AddUserPage } from "../pages/addUserPage";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { GenderOptions } from "../enums/GenderOptions";
import { EditUserPage } from "../pages/editUserPage";

export class EditUserSteps extends BaseSteps {
  private editUserPage: EditUserPage;

  constructor(page: Page) {
    super(page);
    this.editUserPage = this.pageFactory.getEditUserPage();
  }

  async selectGenderOption(option: string): Promise<void> {
    await this.editUserPage.genderField.selectOption(option);
  }
}
