import React from "react";
import { useIntl } from "react-intl";
import { NextPage } from "next";
import { compose } from "recompose";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";
import clsx from "clsx";

import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { ResendConfirmSteps } from "~/src/Modules/Auth/Components/ResendConfirmSteps";

const useClasses = makeStyles((theme) => ({
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
  text_center: {
    textAlign: "center"
  },
  steps: {
    maxWidth: 360,
    minWidth: 240
  },
  mb_2: {
    marginBottom: theme.spacing(2)
  }
}));

export interface SignupResultPageProps {
  pageParam: IPageParam;
}

const SignupResultPage: NextPage<SignupResultPageProps> = ({ pageParam }) => {
  const classes = useClasses();
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "display_resend_confirm_email_title"
  });
  const detail = intl.formatMessage({
    id: "display_resend_confirm_email_description"
  });
  return (
    <Layout
      classes={{
        main: clsx(
          classes.d_flex,
          classes.flex_column,
          classes.justify_content_center,
          classes.align_items_center
        )
      }}
    >
      <PageHead title={intl.formatMessage({ id: "display_verify_email" })} />
      <Container maxWidth="lg">
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Typography
              variant="h4"
              className={clsx(classes.text_center, classes.mb_2)}
            >
              {intl.formatMessage({
                id: "display_verify_email"
              })}
            </Typography>
            <div
              className={clsx(
                classes.d_flex,
                classes.align_items_center,
                classes.justify_content_center,
                classes.mb_2
              )}
            >
              <ResendConfirmSteps active={2} className={classes.steps} />
            </div>
            <Typography
              gutterBottom
              className={clsx(classes.mb_2, classes.text_center)}
            >
              {detail}
            </Typography>
            <Typography
              variant="h5"
              className={clsx(classes.mb_2, classes.text_center)}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default compose(
  withAuthRedirect({ route: "/", redirectIfAuthed: true }),
  withSSRScaffold([SSRWorkspaceHandler])
)(SignupResultPage);
