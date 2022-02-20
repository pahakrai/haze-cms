import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_RESET_PASSWORD } from "../Apollo/gqls";

interface useResetPasswordArgs {
  onCompleted?: (sendEmailStatus: boolean) => void;
  onError?: (error: any) => void;
}
export const useResetPassword = (args?: useResetPasswordArgs) => {
  const [resetPassword, { loading, error }] = useMutation<{
    resetPassword: boolean;
  }>(MUTATION_RESET_PASSWORD(), {
    onCompleted: (data) => {
      args?.onCompleted?.(data?.resetPassword);
    },
    onError: args?.onError
  });
  const _resetPassword = useCallback(
    (passcodeToken: string, password: string) => {
      resetPassword({
        variables: {
          passcodeToken,
          password
        }
      });
    },
    []
  );
  return {
    resetPassword: _resetPassword,
    resetPasswordLoading: loading,
    resetPasswordError: error
  };
};
