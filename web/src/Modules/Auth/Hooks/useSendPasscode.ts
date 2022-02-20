import { useCallback } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { MUTATION_SEND_PASSCODE } from "../Apollo/gqls";

// resend conform
interface useSendPasscodeArgs {
  onCompleted?: (sendPasscode: boolean) => void;
  onError?: (error: any) => void;
}
interface useSendPasscodeHook {
  sendPasscode?: (email: string) => void;
  loading?: boolean;
  error?: ApolloError;
}
export const useSendPasscode = (
  args?: useSendPasscodeArgs
): useSendPasscodeHook => {
  const [forgotPassword, { loading, error }] = useMutation<{
    sendPasscode: boolean;
  }>(MUTATION_SEND_PASSCODE(), {
    onCompleted: (data) => {
      args?.onCompleted?.(data?.sendPasscode);
    },
    onError: args?.onError
  });
  const _forgotPassword = useCallback((email: string) => {
    forgotPassword({
      variables: {
        input: email,
        options: {
          interactType: "link",
          transportType: "email",
          contactMethod: "signUp"
        }
      }
    });
  }, []);
  return {
    sendPasscode: _forgotPassword,
    loading,
    error
  };
};
