import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DeleteUserPage extends BasePage {
  readonly yesBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.yesBtn = this.page.locator(
      'xpath=//button[@data-testid="button-Yes"]',
    );
    this.cancelBtn = this.page.locator(
      'xpath=//a[@data-testid="button-Cancel"]',
    );
  }

  async cancelDeleteUserOperation() {
    await this.cancelBtn.click();
  }

  async confirmUserDeletion() {
    await this.yesBtn.click();
  }
}
