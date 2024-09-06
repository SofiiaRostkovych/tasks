import { Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class PageFactory {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getPage<T extends BasePage>(pageClass: new (page: Page) => T): T {
    return new pageClass(this.page);
  }
}
