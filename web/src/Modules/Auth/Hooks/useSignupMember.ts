import { useMutation } from "@apollo/client";
import {  SIGN_UP_MEMBER } from "../Apollo/gqls";

interface useSignupMemberArgs {
  onCompleted?: () => void;
  onError?:()=>void;
}

export const useSignupMember = (args?: useSignupMemberArgs) => {
  const [signupMember, { loading, error }] = useMutation(SIGN_UP_MEMBER(), {
    onCompleted: () => {
      args?.onCompleted?.();
    }
  });
  return {
    signupMemberError: error,
    signupMemberLoading: loading,
    signupMember
  };
};