import { useMutation } from "@apollo/client";
import { SIGN_UP_MERCHANT } from "../Apollo/gqls";
interface useSignupMemberArgs {
  onCompleted?: () => void;
  onError?:()=>void
}

export const useSignupMerchant = (args?: useSignupMemberArgs) => {
  const [signupMerchant, { loading, error }] = useMutation(SIGN_UP_MERCHANT(), {
    onCompleted: () => {
      args?.onCompleted?.();
    }
  });
  return {
    signupMerchantError: error,
    signupMerchantLoading: loading,
    signupMerchant
  };
};
