import { useMutation } from "@apollo/client";
import { MUTATION_CURRENT_USER } from "../Apollo/gqls";

export const useLazyCurrentUser = () => {
  const [getCurrentUser, { loading, error }] = useMutation<{
    currentUser: IUser;
  }>(MUTATION_CURRENT_USER());
  return {
    getCurrentUser,
    loading,
    error
  };
};
