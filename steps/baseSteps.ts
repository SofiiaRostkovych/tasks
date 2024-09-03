import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { PageFactory } from "../pageFactory/pageFactory";

export class BaseSteps extends BasePage {
  static fillField(userNameField: Locator, arg1: string) {
    throw new Error("Method not implemented.");
  }
  protected pageFactory: PageFactory;

  constructor(page: Page) {
    super(page);
    this.pageFactory = new PageFactory(page);
  }

  async goToPage(source: string): Promise<void> {
    await this.page.goto(source);
  }

  async fillField(field: Locator, text: string): Promise<void> {
    await field.fill(text);
  }
}
