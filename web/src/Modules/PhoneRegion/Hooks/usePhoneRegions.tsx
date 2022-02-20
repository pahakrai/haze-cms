import { useQuery } from "@apollo/client";
import getConfig from "next/config";
import { QUERY_PHONE_REGIONS } from "../Apollo/gqls";
const { publicRuntimeConfig: Config } = getConfig();

interface usePhoneRegionsArgs {
  fields?: string;
  onCompleted?: (workspacePhoneRegions?: IPhoneRegion[]) => void;
  onError?: () => void;
}
interface usePhoneRegionsHook {
  workspacePhoneRegions?: IPhoneRegion[];
  loading?: boolean;
}
export const usePhoneRegions = (
  args?: usePhoneRegionsArgs
): usePhoneRegionsHook => {
  const { data, loading } = useQuery<{
    workspacePhoneRegions: PaginationResult<IPhoneRegion>;
  }>(QUERY_PHONE_REGIONS(args?.fields ? args.fields : ``), {
    variables: {
      query: {
        workspace: Config.WORKSPACE
      },
      options: {
        sort: "idx"
      }
    },
    onCompleted: (data) => {
      const workspacePhoneRegions = data?.workspacePhoneRegions?.nodes || [];
      args?.onCompleted?.(workspacePhoneRegions);
    },
    onError: () => {
      args?.onError?.();
    }
  });
  return { workspacePhoneRegions: data?.workspacePhoneRegions?.nodes, loading };
};
