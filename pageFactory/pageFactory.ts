import { Page } from "@playwright/test";
import { AddUserPage } from "../pages/addUserPage";
import { EditUserPage } from "../pages/editUserPage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { HomePage } from "../pages/homePage";
import { BasePage } from "../pages/basePage";

export class PageFactory {
  public getPage<T extends BasePage>(pageClass: new (page: Page) => T, page: Page): T {
    return new pageClass(page);
  }

}
