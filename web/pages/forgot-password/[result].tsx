import React from "react";
import { Container, Button, makeStyles, Typography } from "@material-ui/core";
import { compose } from "recompose";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

import Layout from "~/src/Modules/App/Components/Layout";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import PageHead from "~/src/Modules/App/Components/PageHead";

const useClasses = makeStyles(() => ({
  d_flex: { display: "flex" },
  flex_column: {
    flexDirection: "column"
  },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  }
}));
const ForgotPasswordResult = () => {
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  const title = intl.formatMessage({ id: "msg_forgot_password_complete" });
  const detail = router.query.result
    ? intl.formatMessage({
        id: `msg_forgot_password_${router.query.result}`
      })
    : "";
  return (
    <Layout
      classes={{
        main: clsx(
          classes.d_flex,
          classes.flex_column,
          classes.align_items_center,
          classes.justify_content_center
        )
      }}
    >
      <PageHead title={title} />
      <Container
        maxWidth="lg"
        className={clsx(
          classes.d_flex,
          classes.flex_column,
          classes.align_items_center,
          classes.justify_content_center
        )}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography gutterBottom>{detail}</Typography>
        <Link href="/">
          <Button variant="contained" color="primary" disableElevation>
            {intl.formatMessage({ id: "display_back_home" })}
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect({ route: "/", redirectIfAuthed: true }),
  withSSRScaffold([SSRWorkspaceHandler])
)(ForgotPasswordResult);
