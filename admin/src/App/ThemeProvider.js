import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useCurrentWorkspace } from '../Containers/Workspace/hooks';
import ThemeService from '../Services/APIServices/ThemeService';
import defaultTheme from '../Themes';

export default ({ children }) => {
  // for clone deep
  const [theme, setTheme] = useState(() => cloneDeep(defaultTheme));
  const currentWorkspace = useCurrentWorkspace();
  useEffect(() => {
    (async () => {
      let workspaceTheme = null;
      let preferenceTheme = null;
      // get workspace theme
      if (
        currentWorkspace &&
        currentWorkspace.setting &&
        currentWorkspace.setting.theme
      ) {
        // get theme by themeId
        const workspaceThemeResponse = await ThemeService.getThemeById(
          typeof currentWorkspace.setting.theme === 'string'
            ? currentWorkspace.setting.theme
            : currentWorkspace.setting.theme._id
        );
        if (!!workspaceThemeResponse.ok) {
          // set
          workspaceTheme = workspaceThemeResponse.data;
        }
      }
      // get preference theme
      const currentToken = ThemeService.self.getTokenManager().getToken();
      if (!!currentToken) {
        // get theme by themeId
        const preferenceThemeResponse = await ThemeService.getMyTheme();
        if (!!preferenceThemeResponse.ok) {
          // themes
          const preThemes = Array.isArray(preferenceThemeResponse.data)
            ? preferenceThemeResponse.data
            : [];
          if (preThemes.length > 0) {
            // set
            preferenceTheme = merge({}, ...preThemes);
          }
        }
      }

      // set theme
      if (workspaceTheme || preferenceTheme) {
        setTheme(
          merge(cloneDeep(defaultTheme), workspaceTheme, preferenceTheme)
        );
      } else {
        setTheme(cloneDeep(defaultTheme));
      }
    })();
  }, [currentWorkspace]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
