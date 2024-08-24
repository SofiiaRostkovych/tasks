import { Locator, Page } from "@playwright/test";
import { extractSelectedDisplayedValue } from "../helpers/extractSelectedDisplayedValue";
import { URLS } from "../src/config/urlProvider";

export class AddUserPage {

  readonly page: Page;
  readonly createBtn: Locator;
  readonly cancelBtn: Locator;
  readonly userNameField: Locator;
  readonly yearOfBirthField: Locator;
  readonly genderField: Locator;
  readonly headerListitem: Locator;
  public yearOfBirthFieldError: Locator;
  public userNameFieldError: Locator;

  constructor(page: Page) {
    this.page = page;
  this.createBtn = this.page.locator("xpath=//div[4]/button");
  this.cancelBtn = this.page.locator("xpath=//div[4]/a");
  this.userNameField = this.page.locator('xpath=//*[@id="inputUserName"]');
  this.yearOfBirthField = this. page.locator('xpath=//*[@id="inputYearOfBirth"]');
  this.genderField = this.page.locator('xpath=//*[@id="selectGender"]');
  this.headerListitem = this.page.locator("xpath=//ul/li[position()<2]");
  this.userNameFieldError = this.page.getByTestId('inputError-UserName');
  this.yearOfBirthFieldError = this.page.getByTestId('inputError-YearOfBirth');
  }

  async navigateToAddUserPage() {
    await this.page.goto(
      URLS.ADDUSER
    );
  }

  async cancelAddUserOperation() {
    await this.cancelBtn.click();
  }

  async clickCreate() {
    await this.createBtn.click();
  }

  async fillUserNameField(text: string) {
    await this.userNameField.fill(text);
  }

  async pressEnterUserNameField() {
    await this.userNameField.press("Enter");
  }

  async fillYearOfBirthField(text: string) {
    await this.yearOfBirthField.fill(text);
  }

  async pressEnterYearOfBirthField() {
    await this.yearOfBirthField.press("Enter");
  }


  async selectGenderOption(option: string) {
    await this.genderField.selectOption(option);
  }

  async getGenderSelectedOption() {
    return await extractSelectedDisplayedValue(this.genderField);
  }

  async getUserNameFieldError(){
    let userNameFieldError = await this.page.getByTestId('inputError-UserName').innerText();
    return  userNameFieldError;
  }

  async getYearOfBirthFieldError(){
    let yearOfBirthFieldError =  await this.page.getByTestId('inputError-YearOfBirth').innerText();
    return yearOfBirthFieldError;
  }
}
