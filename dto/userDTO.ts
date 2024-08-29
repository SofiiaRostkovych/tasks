import { GenderOptions } from "../enums/GenderOptions";

export class UserDTO {
  constructor(
    public userNameValue: string,
    public yearOfBirthValue: string,
    public genderValue: number = GenderOptions.Male,
  ) {}
}
