import React from "react";
import { useIntl } from "react-intl";
import { compose } from "recompose";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import { ForgotPasswordForm } from "~/src/Modules/Auth/Components/ForgotPasswordForm";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import clsx from "clsx";

const useClasses = makeStyles((theme) => ({
  my_3: { marginTop: theme.spacing(3), marginBottom: theme.spacing(3) },
  d_flex: { display: "flex" },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  }
}));
const ForgotPassword = () => {
  const classes = useClasses();
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_forgot_password" });
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
      <PageHead title={title} />
      <Container maxWidth="lg">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={5} className={classes.my_3}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <ForgotPasswordForm />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect({ route: "/", redirectIfAuthed: true }),
  withSSRScaffold([SSRWorkspaceHandler])
)(ForgotPassword);
