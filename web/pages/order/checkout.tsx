import React from "react";
import { compose } from "recompose";
import { Container, makeStyles } from "@material-ui/core";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { ReCheckoutForm } from "~/src/Modules/Checkout/Components/ReCheckoutForm";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { useQueryCheckout } from "~/src/Modules/Checkout/Hooks/useQueryCheckout";

const useClasses = makeStyles((theme) => ({
  page_main: {
    padding: `${theme.spacing(4)}px 0`
  }
}));
interface CheckoutPageProps {
  pageParam: IPageParam;
}
const CheckoutPage: NextPage<CheckoutPageProps> = ({}) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useClasses();
  const [loading, setLoading] = React.useState<boolean>(false);
  const checkoutId = router.query.id as string | undefined;
  const {
    checkout: checkoutOrder,
    loading: checkoutLoading
  } = useQueryCheckout({ _id: checkoutId });
  React.useEffect(() => {
    setLoading(checkoutLoading);
  }, [checkoutLoading]);
  return (
    <Layout loading={loading} classes={{ main: classes.page_main }}>
      <PageHead title={intl.formatMessage({ id: "display_checkout" })} />
      <Container maxWidth="lg">
        {!loading && (
          <ReCheckoutForm
            order={checkoutOrder?.order}
            setLoading={(loading) => setLoading(loading)}
          />
        )}
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(CheckoutPage);
