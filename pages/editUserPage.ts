import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import {
  CANCEL_BTN_TEST_ID,
  UPDATE_BTN_TEST_ID,
} from "../indentifiers/Buttons";
import {
  NAME_INPUT_TEST_ID,
  YEAR_INPUT_TEST_ID,
} from "../indentifiers/InputFields";
import { GENDER_SELECT_TEST_ID } from "../indentifiers/SelectFields";

export class EditUserPage extends BasePage {
  readonly updateBtn: Locator = this.page.getByTestId(UPDATE_BTN_TEST_ID);
  readonly cancelBtn: Locator = this.page.getByTestId(CANCEL_BTN_TEST_ID);
  readonly userNameField: Locator = this.page.getByTestId(NAME_INPUT_TEST_ID);
  readonly yearOfBirthField: Locator =
    this.page.getByTestId(YEAR_INPUT_TEST_ID);
  readonly genderField: Locator = this.page.getByTestId(GENDER_SELECT_TEST_ID);
}
