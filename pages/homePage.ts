import { Locator } from "@playwright/test";
import { URLS } from "../config/urlProvider";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly addUserLink: Locator = this.page.locator(
    `xpath=//a[@href="${URLS.ADD_USER}"]`,
  );

  readonly usersTable: Locator = this.page.locator(
    'xpath=//table[@data-testid="table-Users"]',
  );

  async getUserByUserName(userNameValue: string): Promise<Locator> {
    let createdUser: Locator = this.page
    .locator(`xpath=//td[@data-testid="td-UserName"]`)[1];
    
    const users: Locator[] = await this.page
      .locator(`xpath=//td[@data-testid="td-UserName"]`)
      .all();

    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        createdUser = user.locator("xpath=//parent::tr");
      }
    }

    return createdUser;
  }

  async getYearOfBirthOfUser(userNameValue:string): Promise<string> {
    return await (await this.getUserByUserName(userNameValue))
      .locator('xpath=/td[@data-testid="td-YearOfBirth"]')
      .innerText();
  }

  async getSelectedGenderOfUser(userNameValue:string): Promise<string> {
    return await (await this.getUserByUserName(userNameValue))
      .locator('xpath=/td[@data-testid="td-Gender"]')
      .innerText();
  }

  async clickDeleteUserBtn(userNameValue:string): Promise<void> {
    await (await this.getUserByUserName(userNameValue)).getByTestId("button-Delete").click();
  }
}
