export class UserNameHelper {
  static generateRandomUserName = (n: number = 5): string => {
    let result: string = "";

    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-,. ";
    const charactersLength: number = characters.length;
    let counter: number = 0;
    while (counter < n) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  };
}
