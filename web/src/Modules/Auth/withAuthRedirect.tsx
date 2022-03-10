import React from "react";
import Router from "next/router";
import { NextComponentType, NextPageContext } from "next";
import { format, UrlObject } from "url";
import { QUERY_CURRENT_USER } from "./Apollo/gqls";
import { initializeApollo } from "~/lib/apollo/client";
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq
} from "~/lib/apollo/utils";
import { isServer } from "~/lib/utils";
import { getAccessToken, getRefreshToken } from "~/lib/auth";
const redirectUrl = (ctx: NextPageContext) => {
  // create and format redirect url
  const url: UrlObject = {
    pathname: ctx.pathname,
    query: {
      ...ctx.query
    }
  };
  const formatedUrl = format(url);
  return formatedUrl;
};

const ssoServerJWTURL = "";

const ssoRedirect = () => {
  return async function (req, res, next) {
    // check if the req has the queryParameter as ssoToken
    // and who is the referer.
    const { ssoToken } = req.query;
    if (ssoToken != null) {
      // to remove the ssoToken in query parameter redirect.
      const redirectURL = url.parse(req.url).pathname;
      try {
        const response = await axios.get(
          `${ssoServerJWTURL}?ssoToken=${ssoToken}`,
          {
            headers: {
              Authorization: "Bearer l1Q7zkOL59cRqWBkQ12ZiGVW2DBL"
            }
          }
        );
        const { token } = response.data;
        const decoded = await verifyJwtToken(token);
        // now that we have the decoded jwt, use the,
        // global-session-id as the session id so that
        // the logout can be implemented with the global session.
        req.session.user = decoded;
      } catch (err) {
        return next(err);
      }

      return res.redirect(`${redirectURL}`);
    }

    return next();
  };
};

const redirectBaseOnLogin = async (
  ctx: NextPageContext,
  route?: string,
  redirectIfAuthed?: boolean
): Promise<boolean> => {
  const _route = route ? route : `/auth/login?redirect=${redirectUrl(ctx)}`;
  // get token from req
  let access_token = undefined;
  let refresh_token = undefined;
  const isServerSide = isServer();
  if (isServerSide) {
    access_token = getAccessTokenFromReq(ctx.req);
    refresh_token = getRefreshTokenFromReq(ctx.req);
  } else {
    access_token = getAccessToken();
    refresh_token = getRefreshToken();
  }
  let isLoggedIn = false; // default false
  const apolloClient = initializeApollo(null, {
    getToken: () => ({
      access_token,
      refresh_token
    })
  });
  if (access_token && refresh_token) {
    // skip when access_token | refresh_token undefined
    isLoggedIn = await apolloClient
      .query({
        query: QUERY_CURRENT_USER()
      })
      .then(({ data }) => {
        if (!data || !data.currentUser) {
          return false;
        }
        return Boolean(data.currentUser);
      })
      .catch(() => {
        return false;
      });
  }
  const shouldRedirect = redirectIfAuthed ? isLoggedIn : !isLoggedIn;
  const data = apolloClient.cache.extract();
  ssoRedirect()("wat", "wat", "");
  if (shouldRedirect) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: _route
      });
      ctx.res.end();
    } else {
      Router.push(_route);
    }
    return Promise.resolve(undefined);
  }
  return Promise.resolve(data);
};
export interface WithAuthRedirectOptions {
  route?: string;
  redirectIfAuthed?: boolean;
}
export const withAuthRedirect =
  (options?: WithAuthRedirectOptions) =>
  <P,>(Page: NextComponentType<any, {}, P>) => {
    return class extends React.Component<P> {
      static async getInitialProps(ctx: NextPageContext) {
        let sequential = await redirectBaseOnLogin(
          ctx,
          options?.route,
          options?.redirectIfAuthed
        );
        let pageProps = {};
        if (!sequential) {
          return pageProps;
        }
        if (Page.getInitialProps) {
          pageProps = await Page.getInitialProps({
            ...ctx,
            initialApolloState: sequential
          });
        }
        // TIPS: avoid development mode throw getInitialProps return empty object warning add authed:true
        return { ...pageProps };
      }
      render() {
        return <Page {...this.props} />;
      }
    };
  };
