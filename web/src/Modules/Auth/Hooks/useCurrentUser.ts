import { useQuery } from "@apollo/client";
import { CURRENT_USER_FIELDS, QUERY_CURRENT_USER } from "../Apollo/gqls";
import React from "react";
import { registAuthListener } from "~/lib/auth";
interface useCurrentUserArgs {
  field?: string;
  onCompleted?: (user?: IUser) => void;
  onError?: () => void;
}
interface useCurrentUserHook {
  currentUser?: IUser;
  loading?: boolean;
}
export const useCurrentUser = (
  args?: useCurrentUserArgs
): useCurrentUserHook => {
  const [authed, setAuthed] = React.useState(false);
  const { data, loading } = useQuery<{ currentUser: IUser }>(
    QUERY_CURRENT_USER(args?.field || CURRENT_USER_FIELDS),
    {
      skip: !authed,
      onCompleted: (data) => {
        const currentUser = data?.currentUser;
        if (currentUser) {
          args?.onCompleted?.(currentUser);
        } else {
          args?.onError?.();
        }
      },
      onError: () => {
        args?.onError?.();
      }
    }
  );
  React.useEffect(() => {
    const handler = registAuthListener((authed: boolean) => {
      setAuthed(authed);
    });
    return () => {
      handler();
    };
  }, []);
  return { currentUser: data?.currentUser, loading };
};
