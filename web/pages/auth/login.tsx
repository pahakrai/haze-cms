import React from "react";
import { compose } from "recompose";
import { useIntl } from "react-intl";
import getConfig from "next/config";
import Link from "next/link";
import {
  Container,
  Grid,
  Typography,
  Card,
  makeStyles,
  Divider,
  Link as MLink
} from "@material-ui/core";
import clsx from "clsx";

import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import LoginForm from "~/src/Modules/Auth/Components/LoginForm";
import GoogleLogin from "~/src/Modules/Auth/Components/GoogleLoginButton";
import FacebookLogin from "~/src/Modules/Auth/Components/FacebookLoginButton";

const { publicRuntimeConfig: Config } = getConfig();
const useClases = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2)
  },
  title: {
    textAlign: "center"
  },
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  mt_3: {
    marginTop: theme.spacing(3)
  },
  d_flex: { display: "flex" },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  },
  [theme.breakpoints.up("md")]: {
    card: {
      padding: theme.spacing(4)
    }
  }
}));
const Login = () => {
  const classes = useClases();
  const intl = useIntl();
  const { workspace } = useWorkspace();
  return (
    <Layout
      classes={{
        main: clsx(
          classes.d_flex,
          classes.align_items_center,
          classes.justify_content_center
        )
      }}
    >
      <PageHead title={intl.formatMessage({ id: "display_login" })} />
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item sm={12} md={8} lg={6}>
            <Card className={classes.card}>
              <Typography
                variant="h5"
                className={clsx(classes.title, classes.mb_2)}
              >
                {intl.formatMessage(
                  { id: "display_welcome_to_login" },
                  { name: workspace?.name || "" }
                )}
              </Typography>
              <LoginForm className={clsx(classes.mb_2)} />
              {workspace?.serviceApps && (
                <Divider className={clsx(classes.mb_2)} />
              )}
              {workspace?.serviceApps?.google?.web?.appId && (
                <div className={clsx(classes.mb_2)}>
                  <GoogleLogin />
                </div>
              )}
              {workspace?.serviceApps?.facebook?.appId && (
                <div>
                  <FacebookLogin />
                </div>
              )}
              <Grid container justify="center" className={clsx(classes.mt_3)}>
                <Typography variant="body2" color="textSecondary">
                  {intl.formatMessage({ id: "display_signup_content_1" })}{" "}
                  <Link href="/auth/sign-up" passHref>
                    <MLink>
                      {intl.formatMessage({ id: "display_signup_content_2" })}
                    </MLink>
                  </Link>{" "}
                  {intl.formatMessage({ id: "display_signup" })}
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect({ route: "/", redirectIfAuthed: true }),
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(Login);
