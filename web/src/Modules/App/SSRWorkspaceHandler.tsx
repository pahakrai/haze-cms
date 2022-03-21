import getConfig from "next/config";
import { fetchWorkspace } from "../Workspace/Api";

import { QUERY_WORKSPACE, WORKSPACE_FIELDS } from "../Workspace/Apollo/gqls";
import { ScaffoldHandler, RQScaffoldHandler } from "./withSSRScaffold";

const { publicRuntimeConfig } = getConfig();

export const SSRWorkspaceHandler: ScaffoldHandler = async (ctx, apollo) => {
  await apollo.query({
    query: QUERY_WORKSPACE(WORKSPACE_FIELDS),
    variables: {
      id: publicRuntimeConfig.WORKSPACE
    }
  });
};

export const SSRWorkspaceRQHandler: RQScaffoldHandler = async (
  ctx,
  rqClient
) => {
  await rqClient.prefetchQuery([], () => fetchWorkspace({}));
};
