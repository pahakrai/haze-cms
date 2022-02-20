export const upperFirstLetter = (string: string) => {
  return String(string)
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
};
