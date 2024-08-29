import { Locator } from "@playwright/test";
import { URLS } from "../config/urlProvider";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly addUserLink: Locator = this.page.locator(
    `xpath=//a[@href="${URLS.ADD_USER}"]`,
  );

  readonly usersTable: Locator = this.page.getByTestId("table-Users");
}
