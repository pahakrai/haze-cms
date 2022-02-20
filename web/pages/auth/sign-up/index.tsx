import React from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  makeStyles,
  Link as MLink,
  Divider
} from "@material-ui/core";
import { useIntl } from "react-intl";
import clsx from "clsx";
import getConfig from "next/config";
import Link from "next/link";

import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import SignupForm from "~/src/Modules/Auth/Components/SignupForm";

import GoogleLogin from "~/src/Modules/Auth/Components/GoogleLoginButton";
import FacebookLogin from "~/src/Modules/Auth/Components/FacebookLoginButton";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

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
  flex_direction_column: {
    flexDirection: "column"
  },
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
const { publicRuntimeConfig: Config } = getConfig();

const Signup = () => {
  const intl = useIntl();
  const classes = useClases();
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
      <PageHead title={intl.formatMessage({ id: "display_signup" })} />
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={6}>
            <Card className={classes.card}>
              <Typography
                variant="h5"
                className={clsx(classes.title, classes.mb_2)}
              >
                {intl.formatMessage(
                  { id: "display_welcome_to" },
                  { name: workspace?.name || "" }
                )}
              </Typography>
              <SignupForm type="member" className={classes.mb_2} />
              {workspace?.serviceApps && (
                <Divider className={clsx(classes.mb_2)} />
              )}
              {workspace?.serviceApps?.facebook?.appId && (
                <div className={classes.mb_2}>
                  <FacebookLogin />
                </div>
              )}
              {workspace?.serviceApps?.google?.web?.appId && (
                <div>
                  <GoogleLogin />
                </div>
              )}
              <Grid container justify="center" className={classes.mt_3}>
                <Typography variant="body2" color="textSecondary">
                  {intl.formatMessage({ id: "display_login_content_1" })}{" "}
                  <Link href="/auth/login" passHref>
                    <MLink>
                      {intl.formatMessage({ id: "display_login_content_2" })}
                    </MLink>
                  </Link>{" "}
                  {intl.formatMessage({ id: "display_login" })}
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Signup;
