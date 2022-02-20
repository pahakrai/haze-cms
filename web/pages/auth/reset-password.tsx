import React from "react";
import { NextPage } from "next";
import { Grid, Container, makeStyles, Typography } from "@material-ui/core";
import { useIntl } from "react-intl";
import { compose } from "recompose";
import clsx from "clsx";

import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { withTokenForSetPassword } from "~/src/Modules/Auth/withTokenForSetPassword";
import { ResetPasswordForm } from "~/src/Modules/Auth/Components/ResetPasswordForm";

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
  mb_2: {
    marginBottom: theme.spacing(2)
  }
}));
interface ResetPasswordPageProps {
  passcodeToken?: string;
}

export const ResetPasswordPage: NextPage<ResetPasswordPageProps> = ({
  passcodeToken
}) => {
  const classes = useClasses();
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_set_new_password" });
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
      <PageHead title={title} />
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item xs={12} md={5}>
            <Typography
              variant="h4"
              className={clsx(classes.mb_2, classes.text_center)}
            >
              {title}
            </Typography>
            {!!passcodeToken && (
              <ResetPasswordForm passcodeToken={passcodeToken} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default compose(
  withSSRScaffold([SSRWorkspaceHandler]),
  withTokenForSetPassword
)(ResetPasswordPage);
