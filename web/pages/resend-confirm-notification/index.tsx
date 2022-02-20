import React from "react";
import { makeStyles, Typography, Grid, Container } from "@material-ui/core";
import { useIntl } from "react-intl";
import { compose } from "recompose";
import clsx from "clsx";

import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";

import { ResendConfirmForm } from "~/src/Modules/Auth/Components/ResendConfirmForm";
import { ResendConfirmSteps } from "~/src/Modules/Auth/Components/ResendConfirmSteps";
const useClasses = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  text_center: {
    textAlign: "center"
  },
  d_flex: { display: "flex" },
  flex_column: {
    flexDirection: "column"
  },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  },
  steps: {
    maxWidth: 360,
    minWidth: 240
  }
}));

interface ResendConfirmNotificationProps {}

export const ResendConfirmNotification = ({}: ResendConfirmNotificationProps) => {
  const classes = useClasses();
  const intl = useIntl();
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
      <PageHead title={intl.formatMessage({ id: "display_verify_email" })} />
      <Container maxWidth="lg">
        <Grid container alignContent="center" justify="center">
          <Grid item xs={12} md={8} lg={6}>
            <Typography
              variant="h4"
              className={clsx(classes.mb_2, classes.text_center)}
            >
              {intl.formatMessage({ id: "display_verify_email" })}
            </Typography>
            <div
              className={clsx(
                classes.d_flex,
                classes.align_items_center,
                classes.justify_content_center
              )}
            >
              <ResendConfirmSteps
                active={1}
                className={clsx(classes.steps, classes.mb_2)}
              />
            </div>
            <ResendConfirmForm />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default compose(
  withAuthRedirect({ route: "/", redirectIfAuthed: true }),
  withSSRScaffold([SSRWorkspaceHandler])
)(ResendConfirmNotification);
