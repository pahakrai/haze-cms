import React from "react";
import { NextPage } from "next";
import { Container, Button, makeStyles, Typography } from "@material-ui/core";
import { useIntl } from "react-intl";
import Link from "next/link";

import { compose } from "recompose";

import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import clsx from "clsx";

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
export interface PasswordCompletedProps {}

const PasswordCompleted: NextPage<PasswordCompletedProps> = () => {
  const classes = useClasses();
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_password_completed" });
  const detail = intl.formatMessage({
    id: "display_password_completed_description"
  });
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

export default compose(withSSRScaffold([SSRWorkspaceHandler]))(
  PasswordCompleted
);
