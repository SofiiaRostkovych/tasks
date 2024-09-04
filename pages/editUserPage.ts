import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import Button from "../identifiers/Button";
import InputField from "../identifiers/InputField";
import SelectField from "../identifiers/SelectField";

export class EditUserPage extends BasePage {
  readonly updateBtn: Locator = this.page.getByTestId(Button.Update);
  readonly cancelBtn: Locator = this.page.getByTestId(Button.Cancel);
  readonly userNameField: Locator = this.page.getByTestId(InputField.UserName);
  readonly genderField: Locator = this.page.getByTestId(SelectField.Gender);
  readonly yearOfBirthField: Locator = this.page.getByTestId(
    InputField.YearOfBirth,
  );
}
