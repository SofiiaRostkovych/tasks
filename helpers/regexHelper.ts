export class RegexHelper {
  static getIdFromUrl(url: string): string {
    let id: string = "";
    const regex: RegExp = new RegExp("[^/]+$");
    const endOfUrl: RegExpExecArray | null = regex.exec(url);
    if (endOfUrl != null) {
      id = endOfUrl[0];
    }

    return id;
  }
}
