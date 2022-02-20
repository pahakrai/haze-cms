import { useQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import {
  QUERY_USER_PROFILE,
  MUTATION_UPDATE_USER_PROFILE
} from "../Apollo/gqls";

interface useUserProfileArgs {
  onCompleted?: (userProfile?: IUserProfile) => void;
  onError?: () => void;
  fields?: string;
}

export const useUserProfile = (args?: useUserProfileArgs) => {
  const { data, loading } = useQuery<{ myUserProfile: IUserProfile }>(
    QUERY_USER_PROFILE(args?.fields),
    {
      onCompleted: (data) => {
        const myUserProfile = data?.myUserProfile;
        if (myUserProfile) {
          args?.onCompleted?.(myUserProfile);
        } else {
          args?.onError?.();
        }
      },
      onError: () => {
        args?.onError?.();
      }
    }
  );
  return { userProfile: data?.myUserProfile, loading };
};

interface useUpdateUserProfileArgs {
  onCompleted?: (data: { updateUserProfile }) => void;
  onError?: () => void;
}
export const useUpdateUser = (args?: useUpdateUserProfileArgs) => {
  const [updateUserProfile, { loading, error }] = useMutation(
    MUTATION_UPDATE_USER_PROFILE(),
    args
  );

  const _updateUserProfile = useCallback((form: IUserProfileUpdateModel) => {
    return updateUserProfile({
      variables: {
        userProfileUpdateModel: form
      }
    });
  }, []);
  return {
    updateUserProfile: _updateUserProfile,
    loading,
    error
  };
};
