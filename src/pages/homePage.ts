import { Locator } from "@playwright/test";
import { URLS } from "../providers/urlProvider";
import { BasePage } from "./base/basePage";

export class HomePage extends BasePage {
  readonly usersTable: Locator = this.page.getByTestId("table-Users");
  readonly addUserLink: Locator = this.page.locator(
    `xpath=//a[@href="${URLS.ADD_USER}"]`,
  );
}
