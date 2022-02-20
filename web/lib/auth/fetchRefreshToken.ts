import getConfig from "next/config";
import { TOKEN_FIELDS } from "~/src/Modules/Auth/Apollo/gqls";
import { getSecurityParams } from "../apollo/links/security";

const { publicRuntimeConfig } = getConfig();

export const fetchAccessToken = async (access?: string, refresh?: string) => {
  const data = {
    query: `mutation REFRESH_TOKEN {refreshToken(refreshToken: "${refresh}") {${TOKEN_FIELDS}}}`
  };
  return fetch(publicRuntimeConfig.API_URL, {
    method: "post",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
      ...getSecurityParams()
    },
    body: JSON.stringify(data)
  });
};
