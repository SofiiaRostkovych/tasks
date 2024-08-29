import { GenderOptions } from "../enums/GenderOptions";

export class UserDtoResponse {
  constructor(
    public id: string,
    public name: string,
    public yearOfBirth: number,
    public gender: number,
    public created: string
  ) {
  }
}
