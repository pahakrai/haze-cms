import React from "react";
import { compose } from "recompose";
import { Container } from "@material-ui/core";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { PRODUCT_DETAIL_PAGE_FIELDS } from "~/src/Modules/Product/Apollo/ProductDetailPageQueryFields";
import { SSRCategoriesHandler } from "~/src/Modules/Category/SSRCategoriesHandler";
import { SSRProductHandler } from "~/src/Modules/Product/SSRProductHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import ProductDetail from "~/src/Modules/Product/Components/ProductDetail/ProductDetail";

interface ProductPageProps {
  pageParam: IPageParam;
}
const ProductPage: NextPage<ProductPageProps> = ({}) => {
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
              href: "/products",
              title: intl.formatMessage({ id: "display_all_products" })
            },
            {
              href: `/products/${_id}`,
              title: intl.formatMessage({ id: "display_product_detail" }),
              active: true
            }
          ]}
        />
        <ProductDetail />
      </Container>
    </Layout>
  );
};
export default compose(
  withSSRScaffold([
    SSRWorkspaceHandler,
    SSRCategoriesHandler,
    SSRProductHandler(PRODUCT_DETAIL_PAGE_FIELDS)
  ])
)(ProductPage);
