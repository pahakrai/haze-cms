import React from "react";
import { NextPage } from "next";
import { Container, Button, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useIntl } from "react-intl";
import Link from "next/link";
import { compose } from "recompose";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";

import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";

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
export interface SignupResultPageProps {
  pageParam: IPageParam;
}

const SignupResultPage: NextPage<SignupResultPageProps> = () => {
  const classes = useClasses();
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_connect_expired" });
  const detail = intl.formatMessage({ id: "msg_connect_expired" });
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

export default compose(withSSRScaffold([SSRWorkspaceHandler]))(
  SignupResultPage
);
