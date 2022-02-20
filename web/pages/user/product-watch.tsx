import React from "react";
import { compose } from "recompose";
import { Container } from "@material-ui/core";
import { useIntl } from "react-intl";

import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { ProfileLayout } from "~/src/Modules/User/Components/ProfileLayout";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import ProductWatchList from "~/src/Modules/ProductWatch/Components/ProductWatchList";

export const WatchPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/user/product-watch",
              title: intl.formatMessage({ id: "display_watch_list" }),
              active: true
            }
          ]}
        />
        <ProfileLayout>
          <ProductWatchList />
        </ProfileLayout>
      </Container>
    </Layout>
  );
};

export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler])
)(WatchPage);
