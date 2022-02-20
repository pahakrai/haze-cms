import React from "react";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { Container, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";

import { Map } from "~/src/Modules/Map/Components/Map";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

const useClasses = makeStyles((theme) => ({
  root: {},
  map: {
    height: 400
  },
  mb_5: {
    marginBottom: theme.spacing(5)
  },
  title: {
    fontSize: 25
  },
  phone: {
    fontSize: 18
  },
  email: {
    fontSize: 18
  }
}));
interface ContactProps {
  pageParam: IPageParam;
}
const Contact: NextPage<ContactProps> = ({}) => {
  const intl = useIntl();
  const classes = useClasses();
  const { workspace } = useWorkspace();
  const location = workspace?.contacts?.[0]?.coordinates;

  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_contact_us" })} />
      <Container>
        {location && (
          <Map
            className={clsx(classes.map, classes.mb_5)}
            defaultCenter={{ lat: location[1], lng: location[0] }}
          />
        )}
        <div className={classes.mb_5}>
          <Typography variant="body2" color="inherit" className={classes.title}>
            {intl.formatMessage({ id: "label_address" })}:
            {workspace?.contacts?.[0].address}
          </Typography>
        </div>
        <div className={classes.mb_5}>
          <Typography variant="body2" color="inherit" className={classes.phone}>
            {intl.formatMessage({ id: "label_phone" })}:
            {workspace?.contacts?.[0].phoneNo}
          </Typography>
        </div>
        <div className={classes.mb_5}>
          <Typography variant="body2" color="inherit" className={classes.email}>
            {intl.formatMessage({ id: "label_email" })}:
            {workspace?.contacts?.[0].email}
          </Typography>
        </div>
      </Container>
    </Layout>
  );
};

export default compose(
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(Contact);
