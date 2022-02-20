import React from "react";
import { useIntl } from "react-intl";
import { NextPage } from "next";
import Container from "@material-ui/core/Container";
import { compose } from "recompose";

import {
  ProfileLayout,
  HeaderTitle
} from "~/src/Modules/User/Components/ProfileLayout";
import { OrderList } from "~/src/Modules/Order/Containers";
import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";

interface OrdersPageProps {}
const OrdersPage: NextPage<OrdersPageProps> = ({}) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_my_orders" });

  return (
    <Layout>
      <PageHead title={title} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/orders",
              title: intl.formatMessage({ id: "display_my_orders" }),
              active: true
            }
          ]}
        />
        <ProfileLayout>
          <HeaderTitle title={title} />
          <OrderList />
        </ProfileLayout>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler])
)(OrdersPage);
