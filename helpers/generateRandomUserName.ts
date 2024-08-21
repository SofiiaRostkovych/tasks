export const generateRandomUserName = (n: number = 15): string => {
  let result = "";

  for (let i = 0; i < n; i++) {
    const randomNumber =
      Math.random() > 0.5
        ? Math.floor(65 + Math.random() * 25)
        : Math.floor(97 + Math.random() * 25);

    const randomChar = String.fromCharCode(randomNumber);

    result += randomChar;
  }

  return result;
};
