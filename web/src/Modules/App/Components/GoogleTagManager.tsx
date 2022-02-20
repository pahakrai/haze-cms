import React from "react";
import TagManager from "react-gtm-module";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";
export interface GoogleTagManagerProps {
  dataLayerName?: string;
}
export const GoogleTagManager = ({
  dataLayerName = "dataLayer"
}: GoogleTagManagerProps) => {
  const { workspace } = useWorkspace();
  React.useEffect(() => {
    //   Occured when view mount and workspace changed
    if (workspace?.marketing?.googleTagManager) {
      TagManager.initialize({
        gtmId: workspace.marketing.googleTagManager,
        dataLayerName
      });
    }
  }, [workspace]);
  return null;
};
