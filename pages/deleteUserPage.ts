import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DeleteUserPage extends BasePage {
  readonly yesBtn = this.page.locator(
    'xpath=//button[@data-testid="button-Yes"]',
  );
  readonly cancelBtn = this.page.locator(
    'xpath=//a[@data-testid="button-Cancel"]',
  );
}
