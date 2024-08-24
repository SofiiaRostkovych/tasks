import { Page } from "@playwright/test";

export class HomePage {

  constructor(private page: Page) {

  }
  
  public createdUser;
  public yearOfBirthOfUser;

  public addUserLink = this.page.locator(
    "xpath=/html/body/header/nav/div/div/ul/li[2]/a",
  );
  public usersTable = this.page.locator("xpath=//table[1]");
 
  async navigateToHomePage() {
    await this.page.goto("");
  }

  async goToAddUserPage() {
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
    let user = this.createdUser;
    return this.createdUser;
  }
  
  async getYearOfBirthOfUser(){    
    return await this.createdUser.locator('xpath=/td[@data-testid="td-YearOfBirth"]').innerText() ;
  }

  async getSelectedGenderOfUser(){    

    return await this.createdUser.locator('xpath=/td[@data-testid="td-Gender"]').innerText() ;
  }


  async clickDeleteUserBtn(){
     await this.createdUser
        .getByTestId("button-Delete").click();
    ;
  }

}
