import React from "react";
import isUndefined from "lodash/isUndefined";
import { ThemeOptions } from "@material-ui/core/styles";
import { defaultTheme } from "~/src/Theme/theme";
type ThemeListener = (theme: string, dark?: boolean) => void;
let themeListener: ThemeListener[] = [];
interface useThemeSwitcherData {
  current: string;
  themes: SwitchTheme[];
  dark?: boolean;
  changeTheme: (current: string, dark?: boolean) => void;
}
interface SwitchTheme {
  name: string;
  theme: ThemeOptions;
}
let globalThemes = [
  {
    name: "theme",
    theme: defaultTheme
  },
  {
    name: "theme-2",
    theme: {
      palette: {
        primary: {
          main: "#7b1fa2"
        },
        secondary: {
          main: "#fbc02d"
        }
      }
    }
  }
];
let globalDarkMode = false;
export const subscribeThemeChange = (cb: ThemeListener) => {
  const exist = themeListener.find((item) => item === cb);
  if (exist) {
    return;
  } else {
    themeListener.push(cb);
  }
};
export const unsubscribeThemeChange = (cb: ThemeListener) => {
  themeListener = themeListener.filter((item) => item !== cb);
};
export const changeTheme = (current: string, dark?: boolean) => {
  // first change theme dark mode if dark not undefined
  if (!isUndefined(dark)) {
    globalDarkMode = dark;
  }
  themeListener.map((item) => {
    // map listener
    item(current, dark);
  });
};
export const useThemeSwitcher = (): useThemeSwitcherData => {
  const [themes] = React.useState<SwitchTheme[]>(globalThemes);
  const [theme, setTheme] = React.useState<string>("theme");
  const [dark, setDark] = React.useState<boolean>(globalDarkMode);
  const callback: ThemeListener = (current: string, dark?: boolean) => {
    setTheme(current);
    setDark(dark);
  };
  React.useEffect(() => {
    subscribeThemeChange(callback);
    return () => unsubscribeThemeChange(callback);
  });
  return { current: theme, dark, themes, changeTheme };
};
