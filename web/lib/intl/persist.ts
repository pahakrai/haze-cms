import Cookies from "js-cookie";
export const storeCurrentLanguage = (language: string) => {
  Cookies.set("language", language);
};
export const getCurrentLanguage = (): string | undefined => {
  return Cookies.get("language");
};