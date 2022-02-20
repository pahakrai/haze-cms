import React from "react";
import { compose } from "recompose";
import { Container } from "@material-ui/core";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import StoreDetail from "~/src/Modules/Store/StoreDetail/StoreDetail";

interface StorePageProps {
  pageParam: IPageParam;
}
const StorePage: NextPage<StorePageProps> = ({}) => {
  const intl = useIntl();
  const router = useRouter();
  const _id = router.query._id as string;
  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_product_detail" })} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/stores",
              title: intl.formatMessage({ id: "display_stores" })
            },
            {
              href: `/stores/${_id}`,
              title: intl.formatMessage({ id: "display_stores_detail" }),
              active: true
            }
          ]}
        />
        <StoreDetail />
      </Container>
    </Layout>
  );
};
export default compose(withSSRScaffold([]))(StorePage);
