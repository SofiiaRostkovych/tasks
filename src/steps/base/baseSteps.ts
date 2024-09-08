import { Page } from "@playwright/test";
import { BasePage } from "../../pages/base/basePage";
import { PageFactory } from "../../pageFactory/pageFactory";

export class BaseSteps extends BasePage {
  protected pageFactory: PageFactory;

  constructor(page: Page) {
    super(page);
    this.pageFactory = new PageFactory(page);
  }
}
