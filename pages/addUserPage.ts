import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import Button from "../identifiers/Button";
import InputField from "../identifiers/InputField";
import SelectField from "../identifiers/SelectField";

export class AddUserPage extends BasePage {
  readonly createBtn: Locator = this.page.getByTestId(Button.Create);
  readonly cancelBtn: Locator = this.page.getByTestId(Button.Cancel);
  readonly userNameField: Locator = this.page.getByTestId(InputField.UserName);
  readonly genderField: Locator = this.page.getByTestId(SelectField.Gender);
  readonly yearOfBirthField: Locator = this.page.getByTestId(
    InputField.YearOfBirth,
  );
  readonly maxUserNameLength: number = 14;
  readonly minUserNameLength: number = 3;

  readonly userNameFieldError: Locator = this.page.getByTestId(
    "inputError-UserName",
  );

  readonly yearOfBirthFieldError: Locator = this.page.getByTestId(
    "inputError-YearOfBirth",
  );
}
