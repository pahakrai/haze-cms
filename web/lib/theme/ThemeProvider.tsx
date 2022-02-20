import React from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeService, ThemeType, SubThemeType } from "./ThemeService";

export interface ThemeProviderProps {
  theme: ThemeType;
  children?: React.ReactNode;
}

export class ThemeProvider extends React.PureComponent<ThemeProviderProps> {
  public render(): React.ReactNode {
    const { theme, children } = this.props;

    return (
      <ThemeContext.Provider
        value={Object.keys(theme).reduce((acc, key): ThemeType => {
          return { ...acc, [key]: ThemeService.create(theme[key]) };
        }, {})}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}
