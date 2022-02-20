import React from "react";
import { ThemeContext } from "./ThemeContext";

export type ThemeValue = string | number | undefined;
export type SubThemeType = { [key: string]: ThemeValue };
export type ThemeType = { [key: string]: SubThemeType };
export const useTheme = (): ThemeType => {
  return React.useContext(ThemeContext);
};
export class ThemeService {
  static create = (theme: SubThemeType): SubThemeType => {
    return Object.keys(theme).reduce(
      (acc: SubThemeType, key: string): SubThemeType => {
        return { ...acc, [key]: ThemeService.getValue(key, theme, key) };
      },
      {}
    );
  };
  static getValue = (
    name: string,
    theme: SubThemeType,
    fallback?: ThemeValue
  ): ThemeValue | undefined => {
    if (ThemeService.isReference(name)) {
      const themeKey: string = ThemeService.createKeyFromReference(name);
      return ThemeService.findValue(themeKey, theme) || fallback;
    }

    return ThemeService.findValue(name, theme) || fallback;
  };
  private static findValue = (
    name: string,
    theme: SubThemeType
  ): ThemeValue | undefined => {
    const value: ThemeValue = theme[name];

    if (ThemeService.isReference(value)) {
      const themeKey: string = ThemeService.createKeyFromReference(value);
      return ThemeService.findValue(themeKey, theme);
    }

    return value;
  };

  private static isReference = (value: ThemeValue): boolean => {
    return `${value}`.startsWith("$");
  };

  private static createKeyFromReference = (value: ThemeValue): string => {
    return `${value}`.substring(1);
  };
}
