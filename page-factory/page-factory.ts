import { Page } from "@playwright/test";
import { AddUserPage } from "../pages/add-user.page";
import { EditUserPage } from "../pages/edit-user.page";
import { DeleteUserPage } from "../pages/delete-user.page";
import { HomePage } from "../pages/home.page";

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
