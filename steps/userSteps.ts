import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";

export class UserSteps {
  static isUserInList(
    obj: UserDtoResponse | UserDto,
    list: UserDtoResponse[],
  ): boolean {
    for (let i: number = 0; i < list.length; i++) {
      if (
        list[i].name === obj.name &&
        list[i].yearOfBirth.toString() === obj.yearOfBirth &&
        list[i].gender === obj.gender
      ) {
        return true;
      }
    }

    return false;
  }
}
