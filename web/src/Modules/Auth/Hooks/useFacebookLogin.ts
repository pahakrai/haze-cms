import { useCallback } from "react";
import { ApolloError, useMutation } from "@apollo/client";

import { MUTATION_LOGIN_FACEBOOK } from "../Apollo/gqls";

interface useLoginArgs {
  onCompleted?: (userToken: IToken) => void;
  onError?: () => void;
}
interface useLoginHook {
  login: (token: string, newUser: any) => void;
  loading?: boolean;
  error?: ApolloError;
}
export const useFacebookLogin = (args?: useLoginArgs): useLoginHook => {
  const [loginFacebook, { loading, error }] = useMutation<{
    userToken: IToken;
  }>(MUTATION_LOGIN_FACEBOOK(), {
    onCompleted: ({ loginFacebook: { userToken } }: any) => {
      args?.onCompleted?.(userToken);
    },
    onError: () => args?.onError?.()
  });
  const _loginFacebook = useCallback((token: string, newUser: any) => {
    loginFacebook({
      variables: {
        token,
        newUser
      }
    });
  }, []);
  return {
    login: _loginFacebook,
    loading,
    error
  };
};
