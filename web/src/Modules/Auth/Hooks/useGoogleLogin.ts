import { useCallback } from "react";
import { ApolloError, useMutation } from "@apollo/client";

import { MUTATION_LOGIN_GOOGLE } from "../Apollo/gqls";

interface useLoginArgs {
  onCompleted?: (userToken: IToken) => void;
  onError?: () => void;
  needSetToken?: boolean;
}
interface useLoginHook {
  login: (token: string, newUser: any) => void;
  loading?: boolean;
  error?: ApolloError;
}
export const useGoogleLogin = (args?: useLoginArgs): useLoginHook => {
  const [loginGoogle, { loading, error }] = useMutation<{
    userToken: IToken;
  }>(MUTATION_LOGIN_GOOGLE(), {
    onCompleted: ({ loginGoogle: { userToken } }: any) => {
      args?.onCompleted?.(userToken);
    },
    onError: () => args?.onError?.()
  });
  const _loginGoogle = useCallback((token: string, newUser: any) => {
    loginGoogle({
      variables: {
        token,
        newUser
      }
    });
  }, []);
  return {
    login: _loginGoogle,
    loading,
    error
  };
};
