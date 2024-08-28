import { Locator, Page } from "@playwright/test";
import { URLS } from "../config/urlProvider";

export class DeleteUserPage {
  readonly yesBtn: Locator;
  readonly cancelBtn: Locator;
  constructor(private page: Page) {
    this.yesBtn = this.page.locator(
      'xpath=//button[@data-testid="button-Yes"]',
    );
    this.cancelBtn = this.page.locator(
      'xpath=//a[@data-testid="button-Cancel"]',
    );
  }

  async navigateToDeleteUserPage(userDeletionUrl: string) {
    await this.page.goto(URLS.DELETEUSER + userDeletionUrl);
  }

  async cancelDeleteUserOperation() {
    await this.cancelBtn.click();
  }

  async confirmUserDeletion() {
    await this.yesBtn.click();
  }
}
