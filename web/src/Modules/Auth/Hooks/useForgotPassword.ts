import React from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_FORGOT_PASSWORD } from "../Apollo/gqls";

interface useForgotPasswordArgs {
  onCompleted?: (sendEmailStatus: boolean) => void;
  onError?: (error: any) => void;
}
export const useForgotPassword = (args?: useForgotPasswordArgs) => {
  const [forgotPassword, { loading, error }] = useMutation<{
    forgotPassword: boolean;
  }>(MUTATION_FORGOT_PASSWORD(), {
    onCompleted: (data) => {
      args?.onCompleted?.(data?.forgotPassword);
    },
    onError: args?.onError
  });
  const _forgotPassword = React.useCallback((email: string) => {
    forgotPassword({
      variables: {
        input: email
      }
    });
  }, []);
  return {
    forgotPassword: _forgotPassword,
    forgotPasswordLoading: loading,
    forgotPasswordError: error
  };
};
