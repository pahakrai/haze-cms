import React from "react";
import { ThemeType } from "./ThemeService";
const defaultTheme: ThemeType = {
  colors: {},
  dimensions: {},
};

export const ThemeContext: React.Context<ThemeType> = React.createContext(
  defaultTheme
);
