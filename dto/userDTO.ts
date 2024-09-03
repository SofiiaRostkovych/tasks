import { GenderOptions } from "../enums/GenderOptions";

export class UserDto {
  public name: string;
  public yearOfBirth: string;
  public gender: number = GenderOptions.Male;

  constructor(
    name: string,
    yearOfBirth: string,
    gender: number = GenderOptions.Male,
  ) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.gender = gender;
  }
}
