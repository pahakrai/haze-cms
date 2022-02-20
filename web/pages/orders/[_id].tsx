import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import Container from "@material-ui/core/Container";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import {
  ORDER_DETAIL_FIELD,
  QUERY_MY_ORDER
} from "~/src/Modules/Order/Apollo/gqls";
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq
} from "~/lib/apollo/utils";
import { getLanguageFromReq } from "~/lib/intl/getLanguageFromReq";
import { HeaderTitle } from "~/src/Modules/User/Components/ProfileLayout";
import { initializeApollo } from "~/lib/apollo/client";
import { OrderDetail } from "~/src/Modules/Order/Containers";
import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { useMyOrder } from "~/src/Modules/Order/Hooks/useMyOrder";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
interface OrderPageProps {
  pageParam: IPageParam;
  order: IOrder;
}
const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  const intl = useIntl();
  const router = useRouter();
  const _id = router.query._id as string;
  const [data, setData] = useState(order);
  const { refetch } = useMyOrder({ _id });
  const title = intl.formatMessage({ id: "display_order_detail" });

  useEffect(() => {
    (async () => {
      const {
        data: { myOrder }
      } = await refetch();
      setData(myOrder);
    })();
  }, [intl.locale]);

  return (
    <Layout>
      <PageHead title={title} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/orders",
              title: intl.formatMessage({ id: "display_my_orders" })
            },
            {
              href: `/orders/${_id}`,
              title: intl.formatMessage({ id: "display_order_detail" }),
              active: true
            }
          ]}
        />
        <HeaderTitle title={title} />
        <OrderDetail order={data} />
      </Container>
    </Layout>
  );
};

OrderPage.getInitialProps = async (ctx: any): Promise<any> => {
  const {
    query: { _id }
  } = ctx;
  let order;
  try {
    const access_token = getAccessTokenFromReq(ctx.req);
    const refresh_token = getRefreshTokenFromReq(ctx.req);
    // init apollo
    const apolloClient = initializeApollo(ctx?.initialApolloState, {
      getToken: () => ({
        access_token,
        refresh_token
      }),
      getLanguage: () => getLanguageFromReq(ctx.req)
    });
    const { data } = await apolloClient.query({
      query: QUERY_MY_ORDER(ORDER_DETAIL_FIELD),
      variables: {
        orderId: _id
      }
    });
    order = data?.myOrder;
  } catch (e) {}
  // order no found or error
  if (!order) {
    ctx.res.writeHead(302, {
      Location: "/404"
    });
    ctx.res.end();
  }
  return { order };
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler])
)(OrderPage);
