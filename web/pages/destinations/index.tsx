import React from "react";
import { compose } from "recompose";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import Link from "next/link";

import { PageSection } from "~/src/Modules/Page/Components";
import { DestinationCard } from "~/src/Modules/Destination/Components/Destination";
import { useRegions } from "~/src/Modules/Destination/Hooks/useRegions";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { usePagesSectionResult } from "~/src/Modules/Page/hooks";

const useClasses = makeStyles((theme) => ({
  py_3: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  mb_5: {
    marginBottom: theme.spacing(5)
  },
  text_decoration_none: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

interface DestinationsProps {}
const Destinations: NextPage<DestinationsProps> = ({}) => {
  const classes = useClasses();
  const intl = useIntl();
  const { regions } = useRegions({
    variables: {
      query: {
        parent: null,
        isActive: true,
        isAddress: false
      }
    }
  });
  const pagesResult = usePagesSectionResult({
    prefix: "destination",
    sections: ["banner"]
  });
  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_destination" })} />
      <PageSection
        prefix="destination"
        section="banner"
        pagesResult={pagesResult}
      />
      <Container maxWidth="lg">
        <div className={classes.py_3}>
          <Item destinations={regions} />
        </div>
      </Container>
    </Layout>
  );
};
export default Destinations;

// popular destinations
interface ItemProps {
  destinations?: IDestinations[];
}
const Item = ({ destinations, ...rest }: ItemProps) => {
  const classes = useClasses();
  return (
    <div className={classes.mb_5} {...rest}>
      <Grid container spacing={3}>
        {destinations.map((destination: IDestinations, idx) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
              <Link
                href={`/products?placeOfOrigin=${destination.code}`}
                key={idx}
                passHref
              >
                <a className={classes.text_decoration_none}>
                  <DestinationCard regions={destination} thumbnail={false} />
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
