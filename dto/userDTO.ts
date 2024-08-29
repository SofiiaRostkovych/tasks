import { GenderOptions } from "../enums/GenderOptions";

export class UserDto {
  constructor(
    public name: string,
    public yearOfBirth: string,
    public gender: number = GenderOptions.Male,
  ) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.gender = gender;
  }
}
