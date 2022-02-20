import { IncomingMessage } from "http";
import cookie from "cookie";
export function getLanguageFromReq(req?: IncomingMessage): string | undefined {
  const httpCookie = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  let language: string | undefined; // default en-US
  if (httpCookie) {
    language = httpCookie.language;
  }
  return language;
}
