import { Page } from "@playwright/test";

export class EditUserPage {
  constructor(private page: Page) {}

  public updateBtn = this.page.locator('xpath=//*[@id="editUserForm"]/div[6]/button');
  public cancelBtn = this.page.locator('xpath=//*[@id="editUserForm"]/div[6]/a');
  public userNameField = this.page.locator('xpath=//*[@id="inputUserName"]');
  public yearOfBirthField = this.page.locator('xpath=//*[@id="inputYearOfBirth"]');
  public genderField = this.page.locator('xpath=//*[@id="selectGender"]');

  async navigateToEditUserPage(userEditUrl: string) {
    await this.page.goto(
      'https://traineeautomation.azurewebsites.net/Forms/EditUser/'+userEditUrl,
    );
  }

  async cancelEditUserOperation() {
    await this.cancelBtn.click();
  }

  async clickUpdate() {
    await this.updateBtn.click();
  }

  async fillUserNameField(text: string) {
    await this.userNameField.fill(text);
  }

  async fillYearOfBirthField(text: string) {
    await this.yearOfBirthField.fill(text);
  }

  async selectGenderOption(option: string) {
    await this.genderField.selectOption(option);
  }
}
