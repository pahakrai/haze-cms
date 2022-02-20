import { useQuery } from "@apollo/client";
import isUndefined from "lodash/isUndefined";

import { QUERY_PARAM } from "../Apollo/gqls";

interface useParamArgs {
  type?: string;
  onCompleted?: (param?: object) => void;
  onError?: () => void;
}
export const useParam = (
  args?: useParamArgs
): { param: any; loading: boolean } => {
  const { data, loading } = useQuery<{
    param: object;
  }>(QUERY_PARAM(), {
    skip: isUndefined(args?.type),
    variables: { type: args?.type },
    onCompleted: (data) => {
      args?.onCompleted?.(data?.param);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  return { param: data?.param, loading };
};
