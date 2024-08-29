import { Locator, Page } from "@playwright/test";
import { BaseSteps } from "./baseSteps";
import { HomePage } from "../pages/homePage";

export class HomeSteps extends BaseSteps {
  private homePage: HomePage;

  constructor(page: Page) {
    super(page);
    this.homePage = new HomePage(page);
  }
  
  async getUserByUserName(userNameValue: string): Promise<Locator> {
    const users: Locator[] = await this.page.getByTestId("td-UserName").all();

    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        return user.locator("xpath=//parent::tr");
      }
    }

    throw new Error(`User with "${userNameValue}" name is not found`);
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
