import { GenderOptions } from "../enums/GenderOptions";
import { RandomGeneratorHelper } from "../helpers/randomGeneratorHelper";

export class UserDto {
  public name: string = RandomGeneratorHelper.generateRandomUserName(3);
  public yearOfBirth: string;
  public gender: number = GenderOptions.Male;
}
