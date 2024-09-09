import { Page } from "@playwright/test";
import { BaseSteps } from "../base/baseSteps";
import { EditUserPage } from "../../pages/user/editUserPage";

export class EditUserSteps extends BaseSteps {
  private editUserPage: EditUserPage;

  constructor(page: Page) {
    super(page);
    this.editUserPage = this.pageFactory.getPage(EditUserPage);
  }
}
