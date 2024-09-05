import { Locator, Page } from "@playwright/test";
import { BaseSteps } from "./baseSteps";
import { EditUserPage } from "../pages/editUserPage";

export class EditUserSteps extends BaseSteps {
  private editUserPage: EditUserPage;

  constructor(page: Page) {
    super(page);
    this.editUserPage = this.pageFactory.getPage(EditUserPage, page);
  }

  async selectGenderOption(option: string): Promise<void> {
    await this.editUserPage.genderField.selectOption(option);
  }
}
