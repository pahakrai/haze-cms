import { IncomingMessage } from "http";
import cookie from "cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../auth";
export function getAccessTokenFromReq(
  req?: IncomingMessage
): string | undefined {
  if (isBrowser() || !req) return undefined;
  const httpCookie = cookie.parse(req.headers.cookie || "");
  let access_token = "";
  if (httpCookie) {
    access_token = httpCookie[ACCESS_TOKEN];
  }
  return access_token;
}
export function getRefreshTokenFromReq(
  req?: IncomingMessage
): string | undefined {
  if (isBrowser() || !req) return undefined;
  const httpCookie = cookie.parse(req.headers.cookie || "");
  let refresh_token = "";
  if (httpCookie) {
    refresh_token = httpCookie[REFRESH_TOKEN];
  }
  return refresh_token;
}
export const isBrowser = () => {
  return typeof window !== "undefined";
};
