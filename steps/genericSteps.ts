import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { PageFactory } from "../pageFactory/pageFactory";

export class GenericSteps extends BasePage {
  async goToPage(source: string): Promise<void> {
    await this.page.goto(source);
  }

  async fillField(field: Locator, text: string): Promise<void> {
    await field.fill(text);
  }
}
