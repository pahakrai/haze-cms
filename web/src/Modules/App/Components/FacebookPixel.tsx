import React from "react";
import ReactPixel from "react-facebook-pixel";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";

interface FacebookPixelProps {}
export const FacebookPixel = ({}: FacebookPixelProps) => {
  const { workspace } = useWorkspace();
  React.useEffect(() => {
    //   Occured when view mount and workspace changed
    if (workspace?.marketing?.facebookPixel) {
      // init pixel
      ReactPixel.init(workspace.marketing.facebookPixel);
      // then track view
      ReactPixel.pageView();
    }
  }, [workspace]);
  return null;
};

export default FacebookPixel;
