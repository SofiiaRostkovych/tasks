import { Locator } from "@playwright/test";
import { BaseSteps } from "./baseSteps";

export class GenericSteps extends BaseSteps {
  async goToPage(source: string): Promise<void> {
    await this.page.goto(source);
  }

  async fillField(field: Locator, text: string): Promise<void> {
    await field.fill(text);
  }
}
