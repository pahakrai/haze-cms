import React from "react";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import {
  ProfileLayout,
  HeaderTitle
} from "~/src/Modules/User/Components/ProfileLayout";
import { AddressList } from "~/src/Modules/Address/Containers/AddressList";
import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";

interface OrderPageProps {
  pageParam: IPageParam;
}
const OrderPage: NextPage<OrderPageProps> = ({}) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_my_addresses" });

  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_my_addresses" })} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/user/address",
              title: intl.formatMessage({ id: "display_my_addresses" }),
              active: true
            }
          ]}
        />
        <ProfileLayout>
          <HeaderTitle title={title}></HeaderTitle>
          <AddressList
            itemCol={(props: any) => <Grid item {...props} xs={12} sm={6} />}
          />
        </ProfileLayout>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler])
)(OrderPage);
