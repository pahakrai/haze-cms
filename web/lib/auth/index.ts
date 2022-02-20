import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import remove from "lodash/remove";
const pjson = require("~/package.json");
const COOKIE_PREFIX = pjson.name;
export const ACCESS_TOKEN = `${COOKIE_PREFIX}_access_token`;
export const REFRESH_TOKEN = `${COOKIE_PREFIX}_refresh_token`;
export const setToken = (token: IToken) => {
  const access_token = token.access_token;
  const refresh_token = token.refresh_token;
  setAccessToken(access_token);
  setRefreshToken(refresh_token);
};
export const setAccessToken = (accessToken: string) => {
  onAuthChanged(true); // broadcast auth changed
  Cookies.set(ACCESS_TOKEN, accessToken, {
    expires: 365, // should be lager than refresh
    sameSite: "Lax"
  });
};
export const setRefreshToken = (refreshToken: string) => {
  const decodedAccessToken = jwtDecode<{ [key: string]: any }>(refreshToken);
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    expires: new Date(decodedAccessToken.exp * 1000), // should be date or day number
    sameSite: "Lax"
  });
};
export const clearToken = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};
export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN);
};
export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN);
};
export const isTokenValid = (): boolean => {
  const _accessToken = getAccessToken();
  const decodedAccessToken =
    _accessToken && jwtDecode<{ [key: string]: any }>(_accessToken);
  let valid = false;
  if (decodedAccessToken && decodedAccessToken.exp >= Date.now() / 1000) {
    valid = true;
  }
  return valid;
};

// regist auth changed
const queue: AuthListenerHandler[] = [];
export type AuthListenerHandler = (authed: boolean) => void;
export type RemoveListenerHandler = () => void;
export const registAuthListener = (
  callback: AuthListenerHandler
): RemoveListenerHandler => {
  const exist = queue.find((item) => item === callback);
  if (!exist) {
    queue.push(callback);
    // then fist call
    callback(Boolean(getAccessToken()));
  }
  return () => {
    remove(queue, (item) => item === callback);
  };
};

const onAuthChanged = (authed: boolean) => {
  queue.map((item) => {
    item(authed);
  });
};
