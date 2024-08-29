import { Locator, Page } from "@playwright/test";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { BasePage } from "./basePage";
import {
  CANCEL_BTN_TEST_ID,
  CREATE_BTN_TEST_ID,
} from "../indentifiers/Buttons";
import {
  NAME_INPUT_TEST_ID,
  YEAR_INPUT_TEST_ID,
} from "../indentifiers/InputFields";
import { GENDER_SELECT_TEST_ID } from "../indentifiers/SelectFields";

export class AddUserPage extends BasePage {
  readonly createBtn: Locator = this.page.getByTestId(CREATE_BTN_TEST_ID);
  readonly cancelBtn: Locator = this.page.getByTestId(CANCEL_BTN_TEST_ID);
  readonly userNameField: Locator = this.page.getByTestId(NAME_INPUT_TEST_ID);
  readonly genderField: Locator = this.page.getByTestId(GENDER_SELECT_TEST_ID);
  readonly yearOfBirthField: Locator =
    this.page.getByTestId(YEAR_INPUT_TEST_ID);
  readonly maxUserNameLength: number = 14;
  readonly minUserNameLength: number = 3;

  readonly userNameFieldError: Locator = this.page.getByTestId(
    "inputError-UserName",
  );

  readonly yearOfBirthFieldError: Locator = this.page.getByTestId(
    "inputError-YearOfBirth",
  );
}
