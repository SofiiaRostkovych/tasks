import { UserDto } from "../dto/userDto";
import { UserDtoResponse } from "../dto/userDtoResponse ";

export function containsUser(
  obj: UserDto | UserDtoResponse,
  list: UserDtoResponse[] | UserDto[],
): boolean {
  let i: number;
  for (i = 0; i < list.length; i++) {
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
