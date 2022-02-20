import { ApolloError, useMutation } from "@apollo/client";
import { useCallback } from "react";
import getConfig from "next/config";
import Common from "@golpasal/common";
import { MUTATION_USER_TOKEN, TOKEN_FIELDS } from "../Apollo/gqls";
const { publicRuntimeConfig: Config } = getConfig();
const UserType = Common.type.UserType;

interface useLoginArgs {
  onCompleted?: (userToken: IToken) => void;
  onError?: () => void;
  needSetToken?: boolean;
}
interface useLoginHook {
  login: (email: string, password: string) => void;
  loading?: boolean;
  error?: ApolloError;
}
export const useLogin = (args?: useLoginArgs): useLoginHook => {
  const [login, { loading, error }] = useMutation<{ userToken: IToken }>(
    MUTATION_USER_TOKEN(TOKEN_FIELDS),
    {
      onCompleted: ({ userToken }) => {
        args?.onCompleted?.(userToken);
      },
      onError: () => args?.onError?.()
    }
  );
  const _login = useCallback((email: string, password: string) => {
    login({
      variables: {
        workspace: Config.WORKSPACE,
        input: email,
        password,
        userTypes: [UserType.MEMBER, UserType.USER]
      }
    });
  }, []);
  return {
    login: _login,
    loading,
    error
  };
};
