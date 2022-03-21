import React from "react";
import App, { AppContext } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { NextPageContext } from "next";
import { QueryClientProvider, Hydrate } from "react-query";
// TAG: INJECT MATERIAL UI START
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// TAG: INJECT MATERIAL UI END

import "~/public/styles/index.scss";
import { queryClient } from "~/utils/react-query-client";

// import { getAccessToken, getRefreshToken } from "~/lib/auth";
import { initializeApollo, useApollo } from "~/lib/apollo/client";
import Favicon from "~/src/Modules/App/Components/Favicon";
import PageMeta from "~/src/Modules/Page/Components/PageMeta";
import { getLanguageFromReq } from "~/lib/intl/getLanguageFromReq";
import { IntlProvider } from "~/lib/intl/provider";
import { FilterProvider } from "~/lib/filter/provider";
import { setGlobalLanguage } from "~/lib/intl";
import { languageFilter } from "~/lib/intl/checkLanguage";
import { ToastProvider } from "~/lib/toast";
import { getAccessTokenFromReq } from "~/lib/apollo/utils";
import { useThemeSwitcher } from "~/src/Modules/App/Hooks/useThemeSwitcher";
// import FacebookPixel from "~/src/Modules/App/Components/FacebookPixel";
// import { GoogleTagManager } from "~/src/Modules/App/Components/GoogleTagManager";

export interface PageContext extends NextPageContext {}

function CustomApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  setGlobalLanguage(pageProps.language); // set global language when client side
  // TAG: INJECT MATERIAL UI START
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const { current, dark, themes } = useThemeSwitcher();
  let themeObj = themes.find((theme) => theme.name === current);
  const theme = createMuiTheme({
    ...themeObj.theme,
    palette: {
      ...themeObj.theme.palette,
      type: dark ? "dark" : "light"
    }
  });
  // TAG: INJECT MATERIAL UI END
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ApolloProvider client={apolloClient}>
          <Favicon />
          <PageMeta pageParam={pageProps?.pageParam} />
          <IntlProvider locale={pageProps.language}>
            <ToastProvider>
              <ThemeProvider theme={theme}>
                <FilterProvider>
                  <CssBaseline />
                  <Component {...pageProps} />
                </FilterProvider>
              </ThemeProvider>
            </ToastProvider>
          </IntlProvider>
        </ApolloProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
CustomApp.getInitialProps = async (acx: AppContext) => {
  const appProps = await App.getInitialProps(acx);
  const language = languageFilter(getLanguageFromReq(acx.ctx.req)); // get language from server side cookies
  const token = getAccessTokenFromReq(acx.ctx.req);
  setGlobalLanguage(language); // set global language

  let pageProps = {};
  // // NOTE: OVERRIDE THE CHILD PAGE PROPS
  // if (acx.Component.getInitialProps) {
  //   pageProps = await acx.Component.getInitialProps(
  //     acx.ctx
  //     // NOTE: CHECK WHY CURRENT USER DATA IS DELAYED TO CHILD PAGES
  //     // currentUserData // current user pass to other pages
  //   )
  // }

  // for all page with pageParam
  return {
    ...appProps,
    pageProps: {
      language,
      token,
      ...{ ...appProps?.pageProps, ...pageProps },
      pageParam: (
        acx.ctx?.req ||
        // when isServer = false, get pageProps
        (typeof window !== "undefined" &&
          (window as any)?.__NEXT_DATA__?.props?.initialProps?.pageProps)
      )?.pageParam
    }
  };
};

export default CustomApp;
