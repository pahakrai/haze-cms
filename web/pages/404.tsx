import React from "react";
import { Button, makeStyles, Container, Typography } from "@material-ui/core";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";

import Layout from "~/src/Modules/App/Components/Layout";
import clsx from "clsx";
const useClasses = makeStyles((theme) => ({
  img: {
    display: "block",
    width: 210
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
  mb_2: {
    marginBottom: theme.spacing(2)
  },
  [theme.breakpoints.down("sm")]: {
    img: {
      width: 120
    }
  }
}));
interface NotFoundPageProps {
  pageParam: IPageParam;
}
const NotFoundPage: NextPage<NotFoundPageProps> = ({}) => {
  const classes = useClasses();
  const intl = useIntl();
  return (
    <Layout
      classes={{
        main: clsx(
          classes.d_flex,
          classes.flex_direction_column,
          classes.align_items_center,
          classes.justify_content_center
        )
      }}
    >
      <Container
        maxWidth="lg"
        className={clsx(
          classes.d_flex,
          classes.flex_direction_column,
          classes.align_items_center,
          classes.justify_content_center
        )}
      >
        <img
          className={clsx(classes.img, classes.mb_2)}
          src="/images/404/img-404.png"
        ></img>
        <Typography variant="h6" className={clsx(classes.mb_2)}>
          {intl.formatMessage({ id: "msg_page_not_found" })}
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained" color="primary" disableElevation>
            {intl.formatMessage({ id: "display_back_home" })}
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};
export default NotFoundPage;
