import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToPage(source: string): Promise<void> {
    await this.page.goto(source);
  }
}
