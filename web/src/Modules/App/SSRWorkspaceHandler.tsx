import getConfig from "next/config";

import { QUERY_WORKSPACE, WORKSPACE_FIELDS } from "../Workspace/Apollo/gqls";
import { ScaffoldHandler } from "./withSSRScaffold";

const { publicRuntimeConfig } = getConfig();

export const SSRWorkspaceHandler: ScaffoldHandler = async (ctx, apollo) => {
  await apollo.query({
    query: QUERY_WORKSPACE(WORKSPACE_FIELDS),
    variables: {
      id: publicRuntimeConfig.WORKSPACE
    }
  });
};
