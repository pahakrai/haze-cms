import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Button } from "@material-ui/core";
import getConfig from "next/config";
import { useRouter } from "next/router";
import common, { helpers } from "@golpasal/common";
import clsx from "clsx";

import { setToken } from "~/lib/auth";

import { useFacebookLogin } from "../Hooks/useFacebookLogin";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";

const { publicRuntimeConfig: Config } = getConfig();

const { UserType } = common.type;

export interface FacebookLoginButtonProps {
  token?: string;
  userTypes?: string[];
}

export default ({ token, userTypes }: FacebookLoginButtonProps) => {
  const intl = useIntl();
  const router = useRouter();
  const { workspace } = useWorkspace();
  const _redirect = (router.query.redirect as string) || "/";
  // NOTE: GET THE TOKEN FROM REDIRECT URI FROM FACEBOOK
  const path = router?.asPath?.split?.("#")?.[1] || "";
  const params = new URLSearchParams(path);
  const prepToken = token || params.get("access_token");

  const { login, error, loading } = useFacebookLogin({
    onCompleted: (token) => {
      // persist token
      setToken(token);
      router.replace(_redirect);
    },
    onError: () => {}
  });

  useEffect(() => {
    if (prepToken) {
      const newUser = {
        userTypes: userTypes || [UserType.MEMBER]
      };
      login(token, newUser);
    }
  }, [prepToken]);

  const facebookDialogLink = `${Config.FACEBOOK_AUTH_LINK}?client_id=${
    workspace?.serviceApps?.facebook?.appId
  }&redirect_uri=${Config.WEB_URL}${
    Config.AUTH_REDIRECT_PATH
  }&response_type=code%20token&state=${helpers.generateNonce()}`;

  return (
    <Button
      type="button"
      fullWidth
      onClick={() => {
        location.href = facebookDialogLink;
      }}
      style={{
        backgroundColor: "#5890FF",
        borderWidth: 0,
        height: 45,
        border: "none",
        outline: "none",
        position: "relative",
        alignItems: "center",
        textTransform: "none",
        color: "#FFF"
      }}
    >
      <i
        className="fab fa-facebook fa-lg"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 16,
          marginTop: 2,
          height: 24,
          width: 24
        }}
      ></i>
      {intl.formatMessage({
        id: "display_signin_facebook"
      })}
      <i
        className={clsx({ ["fas fa-spinner fa-spin"]: loading })}
        style={{ marginLeft: 8 }}
      ></i>
    </Button>
  );
};
