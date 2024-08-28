import { Locator, Page } from "@playwright/test";
import { URLS } from "../config/urlProvider";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly addUserLink: Locator;
  readonly usersTable: Locator;
  public createdUser: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addUserLink = this.page.locator(`xpath=//a[@href="${URLS.ADDUSER}"]`);
    this.usersTable = this.page.getByTestId("table-Users");
  }

  async getUserByUserName(userNameValue: string) {
    const users = await this.page.getByTestId("td-UserName").all();
    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        this.createdUser = user.locator("xpath=//parent::tr");
      }
    }
    return this.createdUser;
  }

  async getYearOfBirthOfUser() {
    return await this.createdUser.getByTestId("td-YearOfBirth").innerText();
  }

  async getSelectedGenderOfUser() {
    return await this.createdUser.getByTestId("td-Gender").innerText();
  }

  async clickDeleteUserBtn() {
    await this.createdUser.getByTestId("button-Delete").click();
  }
}
