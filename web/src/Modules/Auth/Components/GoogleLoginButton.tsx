import React from "react";
import { useIntl } from "react-intl";
import { Button } from "@material-ui/core";
import getConfig from "next/config";
import { useRouter } from "next/router";
import GoogleLogin from "react-google-login";
import common from "@golpasal/common";
import clsx from "clsx";

import { setToken } from "~/lib/auth";

import { useGoogleLogin } from "../Hooks/useGoogleLogin";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";

const { publicRuntimeConfig: Config } = getConfig();

const { UserType } = common.type;

export interface GoogleLoginButtonProps {
  userTypes?: string[];
}
export default ({ userTypes }: GoogleLoginButtonProps) => {
  const intl = useIntl();
  const router = useRouter();
  const { workspace } = useWorkspace();
  const _redirect = (router.query.redirect as string) || "/";
  const { login, error, loading } = useGoogleLogin({
    onCompleted: (token) => {
      // persist token
      setToken(token);
      router.replace(_redirect);
    },
    onError: () => {}
  });

  const onAuthSuccess = (response: any) => {
    // get google token here and useGoogleLogin
    if (response?.accessToken) {
      const newUser = {
        userTypes: userTypes || [UserType.MEMBER]
      };
      login(response?.accessToken, newUser);
    }
  };

  const onAuthFail = (response: any) => {
    console.log("Error", response);
  };

  return (
    <GoogleLogin
      clientId={workspace?.serviceApps?.google?.web?.appId}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={false}
          fullWidth
          style={{
            backgroundColor: "#F2F2F2",
            color: "#666666",
            height: 45,
            border: "none",
            outline: "none",
            position: "relative",
            alignItems: "center",
            textTransform: "none"
          }}
        >
          <i
            className="fab fa-google fa-lg"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 16,
              marginTop: 2,
              height: 24,
              width: 24
            }}
          />
          {intl.formatMessage({
            id: "display_signin_google"
          })}
          <i
            className={clsx({ ["fas fa-spinner fa-spin"]: loading })}
            style={{ marginLeft: 8 }}
          ></i>
        </Button>
      )}
      autoLoad={false}
      onSuccess={onAuthSuccess}
      onFailure={onAuthFail}
      cookiePolicy={"single_host_origin"}
      uxMode={"redirect"}
      // NOTE: default is current uri without the queries and params
      // redirectUri={"http://localhost:3601/"}
      isSignedIn={true}
    />
  );
};
