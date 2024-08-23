import { Page } from "@playwright/test";

export class DeleteUserPage {
  constructor(private page: Page) {}

  public yesBtn = this.page.locator('xpath=//div[2]/form/button');
  public cancelBtn = this.page.locator('xpath=//div[2]/form/a');

  async navigateToDeleteUserPage(userDeletionUrl: string) {
    await this.page.goto(
      'https://traineeautomation.azurewebsites.net/Forms/EditUser/'+userDeletionUrl,
    );
  }

  async cancelDeleteUserOperation() {
    await this.cancelBtn.click();
  }

  async confirmUserDeletion() {
    await this.page.locator('xpath=//div[2]/form/button').click();
  }

}
