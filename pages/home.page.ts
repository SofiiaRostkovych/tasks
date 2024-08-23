import { Page } from "@playwright/test";

export class HomePage {

  constructor(private page: Page) {

  }
  
  public user;
  public yearOfBirthOfUser;

  public addUserLink = this.page.locator(
    "xpath=/html/body/header/nav/div/div/ul/li[2]/a",
  );
  public usersTable = this.page.locator("xpath=/html/body/div/main/table[1]");
 
  async navigateToHomePage() {
    await this.page.goto("https://traineeautomation.azurewebsites.net/");
  }

  async goToAddUserPage() {
    await this.addUserLink.click();
  }
  
  async getYearOfBirthOfUser(username:string){    
    this.yearOfBirthOfUser = await this.page.locator('tr:has-text("' + username + '")').getByTestId("td-YearOfBirth") ;
  }

  async getDeleteUserUrl(username:string){
    let userDeletionUrl = await this.page.locator('tr:has-text("' + username + '")')
        .getByTestId("button-Delete")
        .getAttribute("href");
    return userDeletionUrl;
  }
  async clickDeleteUserBtn(username:string){
     await this.page.locator('tr:has-text("' + username + '")')
        .getByTestId("button-Delete").click();
    ;
  }

}
