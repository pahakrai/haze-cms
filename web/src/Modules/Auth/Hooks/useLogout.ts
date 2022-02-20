import { useCallback } from "react";
import { useGoogleLogout } from "react-google-login";
import { clearToken } from "~/lib/auth";
import { apolloClient } from "~/lib/apollo/client";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";
interface useLogoutArgs {
  onCompleted?: (user?: IToken) => void;
  onError?: () => void;
}
interface useLogoutHook {
  logout: () => void;
  loading?: boolean;
}
export const useLogout = (args?: useLogoutArgs): useLogoutHook => {
  const { workspace } = useWorkspace();
  const { signOut: googleLogout } = useGoogleLogout({
    clientId: workspace?.serviceApps?.google?.web?.appId
  });
  const _logout = useCallback(() => {
    logout();
    googleLogout();
    args?.onCompleted?.();
  }, []);
  return {
    logout: _logout
  };
};

export const logout = () => {
  // clear token
  clearToken();
  // clear store
  apolloClient?.clearStore?.();
};
