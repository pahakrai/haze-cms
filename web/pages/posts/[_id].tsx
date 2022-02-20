import React from "react";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";

import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import PostDetail from "~/src/Modules/Post/Components/PostDetail/PostDetail";

interface PosPageProps {
  pageParam: IPageParam;
}
const PostPage: NextPage<PosPageProps> = ({}) => {
  const intl = useIntl();
  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_post_detail" })} />
      <PostDetail />
    </Layout>
  );
};
export default compose(withSSRScaffold([SSRWorkspaceHandler]))(PostPage);
