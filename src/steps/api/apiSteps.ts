import { APIResponse, expect } from "@playwright/test";
import { UserDtoResponse } from "../../dto/UserDtoResponse";
import { UserDto } from "../../dto/UserDto";

export class ApiSteps {
  public async verifySuccessResponse(response: APIResponse): Promise<void> {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  }

  public async verifyReceivedUser(
    createdUser: UserDtoResponse,
    userDto: UserDto,
  ): Promise<void> {
    expect(createdUser.gender).toBe(userDto.gender);
    expect(createdUser.name).toBe(userDto.name);
    expect(userDto.yearOfBirth).toContain(createdUser.yearOfBirth.toString());
  }
}
