import { test, expect } from "@playwright/test";
import { GenderOptions } from "../enums/GenderOptions";
import { PageFactory } from "../pageFactory/pageFactory";
import { DeleteUserPage } from "../pages/deleteUserPage";
import { HomeSteps } from "../steps/homeSteps";
import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";
import { containsObject } from "../helpers/containsObject"

let userDto = new UserDto("nб3-w", "1900", GenderOptions.Undefined);
let createdUser: UserDtoResponse;
let deleteUserPage: DeleteUserPage;
let homeSteps: HomeSteps;

test.beforeEach(async ({ page, request }) => {
  const response = await request.post('/api/User', {data: userDto});
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);
createdUser = await response.json()
  
  const pageFactory: PageFactory = new PageFactory(page);

  deleteUserPage = pageFactory.getDeleteUserPage();
  homeSteps = new HomeSteps(page);

  await homeSteps.goToPage("");

});

  test(`Check successful deletion of a user "${userDto.name}"`, async ({request}) => {

    await homeSteps.clickDeleteUserBtn(userDto.name);
    await deleteUserPage.yesBtn.click();

    let users = (await request.get('/api/User')).json();
    let usersDtoResponse: UserDtoResponse[] = [];
    for (const user of await users) {
      usersDtoResponse.push(user);
    }
    
    expect(containsObject(createdUser, usersDtoResponse)).toBe(false);
});
