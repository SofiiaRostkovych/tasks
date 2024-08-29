import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DeleteUserPage extends BasePage {
  readonly yesBtn: Locator = this.page.locator(
    'xpath=//button[@data-testid="button-Yes"]',
  );
  readonly cancelBtn: Locator = this.page.locator(
    'xpath=//a[@data-testid="button-Cancel"]',
  );
}
