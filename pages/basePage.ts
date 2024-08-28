import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly maxUserNameLength = 14;
  readonly minUserNameLength = 3;

  constructor(page: Page) {
    this.page = page;
  }
  
  async goToPage(source: string) {
    await this.page.goto(source);
  }
}
