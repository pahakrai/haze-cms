import React from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_UPDATE_PASSWORD } from "../Apollo/gqls";
interface useUpdatePasswordArgs {
  onCompleted?: () => void;
  onError?: (...res: any) => void;
}
export const useUpdatePassword = (args?: useUpdatePasswordArgs) => {
  const [updatePassword, { loading, error }] = useMutation<{
    updatePassword: boolean;
  }>(MUTATION_UPDATE_PASSWORD(), {
    onCompleted: () => {
      args?.onCompleted?.();
    },
    onError: (...res) => args?.onError?.(...res)
  });
  const _updatePassword = React.useCallback(
    (newPassword: string, oldPassword: string) => {
      updatePassword({
        variables: {
          newPassword,
          oldPassword
        }
      });
    },
    []
  );
  return {
    updatePassword: _updatePassword,
    updatePasswordLoading: loading,
    updatePasswordError: error
  };
};
