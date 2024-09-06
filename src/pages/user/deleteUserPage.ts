import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/basePage";
import Button from "../../identifiers/Button";

export class DeleteUserPage extends BasePage {
  readonly yesBtn: Locator = this.page.getByTestId("button-Yes");
  readonly cancelBtn: Locator = this.page.getByTestId(Button.Cancel);
}
