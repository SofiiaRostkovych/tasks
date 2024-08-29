import { Locator } from "@playwright/test";
import { URLS } from "../config/urlProvider";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly addUserLink: Locator = this.page.locator(
    `xpath=//a[@href="${URLS.ADD_USER}"]`,
  );

  readonly usersTable: Locator = this.page.getByTestId("table-Users");

  async getUserByUserName(userNameValue: string): Promise<Locator> {
    let createdUser: Locator = this.page.getByTestId("td-UserName")[1];

    const users: Locator[] = await this.page
    .getByTestId("td-UserName")
      .all();

    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        createdUser = user.locator("xpath=//parent::tr");
      }
    }

    return createdUser;
  }

  async getYearOfBirthOfUser(userNameValue: string): Promise<string> {
    return await (await this.getUserByUserName(userNameValue))
    .getByTestId("td-YearOfBirth")
      .innerText();
  }

  async getSelectedGenderOfUser(userNameValue: string): Promise<string> {
    return await (await this.getUserByUserName(userNameValue))
    .getByTestId("td-Gender")
      .innerText();
  }

  async clickDeleteUserBtn(userNameValue: string): Promise<void> {
    await (await this.getUserByUserName(userNameValue))
      .getByTestId("button-Delete")
      .click();
  }
}
