import React from "react";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { Container, makeStyles } from "@material-ui/core";

import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { CheckoutForm } from "~/src/Modules/Checkout/Components/CheckoutForm";

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
  const classes = useClasses();
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <Layout loading={loading} classes={{ main: classes.page_main }}>
      <PageHead title={intl.formatMessage({ id: "display_checkout" })} />
      <Container maxWidth="lg">
        <CheckoutForm setLoading={(loading) => setLoading(loading)} />
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(CheckoutPage);
