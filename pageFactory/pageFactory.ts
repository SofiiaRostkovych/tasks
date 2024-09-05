import { Page } from "@playwright/test";
import { AddUserPage } from "../pages/addUserPage";
import { EditUserPage } from "../pages/editUserPage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/basePage";

export class PageFactory{
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getPage<T extends BasePage>(pageClass: new (page: Page) => T): T {
    return new pageClass(this.page);
  }
}
