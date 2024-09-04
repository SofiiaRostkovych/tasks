import { GenderOptions } from "../enums/GenderOptions";

export class UserDto {
  public name: string;
  public yearOfBirth: string;
  public gender: number = GenderOptions.Male;
}
