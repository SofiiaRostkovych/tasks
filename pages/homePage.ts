import { Locator } from "@playwright/test";
import { URLS } from "../config/urlProvider";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly addUserLink = this.page.locator(
    `xpath=//a[@href="${URLS.ADD_USER}"]`,
  );

  readonly usersTable = this.page.getByTestId("table-Users");

  public createdUser: Locator;

  async getUserByUserName(userNameValue: string): Promise<Locator> {
    const users: Locator[] = await this.page
      .locator(`xpath=//td[@data-testid="td-UserName"]`)
      .all();

    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        this.createdUser = user.locator("xpath=//parent::tr");
      }
    }

    return this.createdUser;
  }

  async getYearOfBirthOfUser(): Promise<string> {
    return await this.createdUser.getByTestId("td-YearOfBirth").innerText();
  }

  async getSelectedGenderOfUser(): Promise<string> {
    return await this.createdUser.getByTestId("td-Gender").innerText();
  }

  async clickDeleteUserBtn(): Promise<void> {
    await this.createdUser.getByTestId("button-Delete").click();
  }
}
