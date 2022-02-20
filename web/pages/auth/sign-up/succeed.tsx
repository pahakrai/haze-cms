import React from "react";
import { Container, Button, makeStyles, Typography } from "@material-ui/core";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "~/src/Modules/App/Components/Layout";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import clsx from "clsx";

const useClasses = makeStyles(() => ({
  d_flex: { display: "flex" },
  flex_direction_column: {
    flexDirection: "column"
  },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  }
}));
const SignupSucceed = () => {
  const classes = useClasses();
  const intl = useIntl();
  const router = useRouter();
  const title = intl.formatMessage({ id: "signup_complete" });
  const detail = router.query.type
    ? intl.formatMessage({
        id: `msg_signup_${router.query.type}_complete`
      })
    : "";
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
      <Container
        maxWidth="lg"
        className={clsx(
          classes.d_flex,
          classes.align_items_center,
          classes.justify_content_center,
          classes.flex_direction_column
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
export default withAuthRedirect({ route: "/", redirectIfAuthed: true })(
  SignupSucceed
);
