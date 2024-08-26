import { Locator, Page } from "@playwright/test";
import { URLS } from "../src/config/urlProvider";

export class HomePage {
  readonly addUserLink: Locator;
  public createdUser: Locator;
  readonly usersTable: Locator;
  
  constructor(private page: Page) {
    this.page = page;
     this.addUserLink = this.page.locator(
      `xpath=//a[@href="${URLS.ADDUSER}"]`,
    );
    this.usersTable = this.page.locator('xpath=//table[@data-testid="table-Users"]');
 
  
  }
  async navigateToHomePage() {
    await this.page.goto("");
  }

  async clickAddUserLink() {
    await this.addUserLink.click();
  }

  async getUserByUserName(userNameValue:string){
    const users = await this.page
      .locator(`xpath=//td[@data-testid="td-UserName"]`)
      .all();
    for (const user of users) {
      if ((await user.innerText()) === userNameValue) {
        this.createdUser = user.locator("xpath=//parent::tr");
      }
    }
    return this.createdUser;
  }
  
  async getYearOfBirthOfUser(){    
    return await this.createdUser.locator('xpath=/td[@data-testid="td-YearOfBirth"]').innerText() ;
  }

  async getSelectedGenderOfUser(){    
    return await this.createdUser.locator('xpath=/td[@data-testid="td-Gender"]').innerText() ;
  }

  async clickDeleteUserBtn(){
     await this.createdUser.getByTestId("button-Delete").click();
    ;
  }

}
