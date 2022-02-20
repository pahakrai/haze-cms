import { DetailedHTMLProps, HTMLAttributes } from "react";
import Head from "next/head";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";
export interface FaviconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
export const Favicon = ({ className, ...rest }: FaviconProps) => {
  const { workspace } = useWorkspace();
  if (!workspace) return null;
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        href={workspace?.setting?.favicon?.thumbnailUri}
      />
    </Head>
  );
};
export default Favicon;
