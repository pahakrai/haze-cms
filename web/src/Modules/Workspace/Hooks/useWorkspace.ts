import { useQuery } from "@apollo/client";
import getConfig from "next/config";
import { QUERY_WORKSPACE, WORKSPACE_FIELDS } from "../Apollo/gqls";
const { publicRuntimeConfig: Config } = getConfig();
interface useWorkspaceArgs {
  onCompleted?: (workspace?: IWorkspace) => void;
  onError?: () => void;
}
interface useWorkspacerHook {
  workspace?: IWorkspace;
  loading?: boolean;
}
export const useWorkspace = (args?: useWorkspaceArgs): useWorkspacerHook => {
  const { data, loading } = useQuery<{ workspace: IWorkspace }>(
    QUERY_WORKSPACE(WORKSPACE_FIELDS),
    {
      onCompleted: (data) => {
        const workspace = data?.workspace;
        if (workspace) {
          args?.onCompleted?.(workspace);
        } else {
          args?.onError?.();
        }
      },
      onError: () => {
        args?.onError?.();
      },
      skip: !Config.WORKSPACE,
      variables: {
        id: Config.WORKSPACE
      }
    }
  );
  return { workspace: data?.workspace, loading };
};
