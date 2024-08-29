import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { AddUserPage } from "../pages/addUserPage";
import { HomePage } from "../pages/homePage";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { URLS } from "../config/urlProvider";
import { AddUserSteps } from "../steps/addUserSteps";
import { HomeSteps } from "../steps/homeSteps";
import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";


  let userDto = new UserDto("nб3-w", "1900", GenderOptions.Undefined);

let deleteUserPage: DeleteUserPage;
let homeSteps: HomeSteps;
let userDtoResponse: UserDtoResponse;
  
test.beforeEach(async ({ page, request }) => {
  const response = await request.post('/api/User', {data: userDto});
console.log(await response.json());
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);
userDtoResponse = await response.json()
  
  const pageFactory: PageFactory = new PageFactory(page);

  deleteUserPage = pageFactory.getDeleteUserPage();
  homeSteps = new HomeSteps(page);

  homeSteps.goToPage("");
});

  test(`Check successful deletion of a user "${userDto.name}"`, async ({request}) => {

    await homeSteps.clickDeleteUserBtn(userDto.name);
    await deleteUserPage.yesBtn.click();
    let users = (await request.get('/api/User')).json();
    let userDtoResponse: any;
    for (const user of await users) {
      userDtoResponse = user;
    }
    
    expect(containsObject(userDtoResponse, await users)).toBe(false);
});
