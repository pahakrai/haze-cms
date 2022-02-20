import React from "react";
import * as Common from "@golpasal/common";
import { storeCurrentLanguage } from "./persist";
import { languageFilter } from "./checkLanguage";
const { getLocale } = Common.helpers;
let _language: string = "en-US"; // global instance for every client|request
type LanguageListener = (language: string) => void;
let languageListener: LanguageListener[] = [];
export const setGlobalLanguage = (language?: string) => {
  _language = languageFilter(language);
};
interface useLocalData {
  current: string;
  locale: string;
  changeLanguage: (current: string) => void;
}
export const subscribeLanguageChange = (cb: LanguageListener) => {
  const exist = languageListener.find((item) => item === cb);
  if (exist) {
    return;
  } else {
    languageListener.push(cb);
  }
};
export const unsubscribeLanguageChange = (cb: LanguageListener) => {
  languageListener = languageListener.filter((item) => item !== cb);
};
export const changeLanguage = (current: string) => {
  const newLanguage = languageFilter(current);
  // change language
  _language = newLanguage; // change global language
  if (typeof window === "undefined") {
  } else {
    // persist to cookie if client side
    storeCurrentLanguage(newLanguage);
  }
  languageListener.map((item) => {
    // map listener
    item(newLanguage);
  });
};
export const useLocale = (language?: string): useLocalData => {
  const [locale, setLocale] = React.useState(
    _language || languageFilter(language)
  );
  const callback: LanguageListener = (current: string) => {
    // occured when language changed
    setLocale(current);
  };
  React.useEffect(() => {
    subscribeLanguageChange(callback);
    return () => unsubscribeLanguageChange(callback);
  });
  return { current: locale, locale: getLocale(locale), changeLanguage };
};
