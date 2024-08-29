import { Page } from "@playwright/test";
import { AddUserPage } from "../pages/addUserPage";
import { EditUserPage } from "../pages/editUserPage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { HomePage } from "../pages/homePage";

export class PageFactory {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getAddUserPage(): AddUserPage {
    return new AddUserPage(this.page);
  }

  getEditUserPage(): EditUserPage {
    return new EditUserPage(this.page);
  }

  getDeleteUserPage(): DeleteUserPage {
    return new DeleteUserPage(this.page);
  }

  getHomePage(): HomePage {
    return new HomePage(this.page);
  }
}
