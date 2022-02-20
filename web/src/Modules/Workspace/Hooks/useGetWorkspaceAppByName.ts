import { gql, useQuery } from "@apollo/client";
export const WORKSPACE_APP_FIELDS = `
  productionIOS {
    appId
    touchIcon
  }
  productionAndroid {
    appId
    touchIcon
  }
`;

export const QUERY_GET_WORKSPACE_APP_BY_NAME = (fields = ``) => gql`
  query GetWorkspaceAppByName($name:String!){
    getWorkspaceAppByName(name:$name){
      _id
      ${fields}
    }
  }
`;
interface useGetWorkspaceAppByNameArgs {
  variables?: { name: string };
  onCompleted?: (workspaceApp?: IWorkspaceApp) => void;
  onError?: () => void;
}
interface useGetWorkspaceAppByNameHook {
  workspaceApp?: IWorkspaceApp;
  loading?: boolean;
}
export const useGetWorkspaceAppByName = (
  args?: useGetWorkspaceAppByNameArgs
): useGetWorkspaceAppByNameHook => {
  const { data, loading } = useQuery<{ getWorkspaceAppByName: IWorkspaceApp }>(
    QUERY_GET_WORKSPACE_APP_BY_NAME(WORKSPACE_APP_FIELDS),
    {
      onCompleted: (data) => {
        const workspaceApp = data?.getWorkspaceAppByName;
        if (workspaceApp) {
          args?.onCompleted?.(workspaceApp);
        } else {
          args?.onError?.();
        }
      },
      onError: () => {
        args?.onError?.();
      },
      skip: !args?.variables?.name,
      variables: {
        name: args?.variables?.name
      }
    }
  );
  return { workspaceApp: data?.getWorkspaceAppByName, loading };
};
