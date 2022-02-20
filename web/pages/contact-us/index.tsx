import React from "react";
import { useIntl } from "react-intl";
import { compose } from "recompose";
import clsx from "clsx";
import { Grid, makeStyles, Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { cloneDeep } from "lodash";
import keys from "lodash/keys";

import { PageSection } from "~/src/Modules/Page/Components";
import { ContactUsForm } from "~/src/Modules/ContactUs/Components/ContactUsForm";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { usePagesSectionResult } from "~/src/Modules/Page/hooks";
import { Map } from "~/src/Modules/Map/Components/Map";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";
import {
  AddressBlackIcon,
  EmailIcon,
  PhoneIcon
} from "~/src/Components/SvgIcon";

const useClasses = makeStyles((theme) => ({
  my_3: { marginTop: theme.spacing(2), marginBottom: theme.spacing(3) },
  padding_top: {
    paddingTop: theme.spacing(3)
  },
  map_container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  map: {
    height: 400
  },
  d_flex: { display: "flex" },
  align_items_center: {
    alignItems: "center"
  },
  justify_content_center: {
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: 600,
    textAlign: "center"
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#333",
    "& > img": {
      padding: 10,
      cursor: "pointer"
    }
  },
  address: {
    fontSize: 18,
    color: "#000",
    fontWeight: 600,
    textAlign: "left",
    display: "flex",
    alignItems: "center"
  },
  mt_5: { marginTop: theme.spacing(5) }
}));
const ContactUs = () => {
  const classes = useClasses();
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_contact_us_title" });
  const { workspace } = useWorkspace();
  const location = workspace?.contacts?.[0]?.coordinates;
  const router = useRouter();
  const pagesResult = usePagesSectionResult({
    prefix: "contact-us",
    sections: ["banner"]
  });

  const socials = keys(cloneDeep(workspace?.setting?.theme?.icons))
    .map((key) => {
      const imageHref = workspace.setting.theme.icons[key];
      return {
        image: imageHref,
        url: workspace?.socialLinks[key]?.url
      };
    })
    .filter((item) => item.image && item.url);
  return (
    <Layout
      classes={{
        main: clsx(classes.justify_content_center)
      }}
    >
      <PageHead title={intl.formatMessage({ id: "display_contact_us" })} />
      <PageSection
        prefix="contact-us"
        section="banner"
        pagesResult={pagesResult}
      />
      <Container className={classes.map_container}>
        {location && (
          <Map
            className={clsx(classes.map)}
            defaultCenter={{ lat: location[1], lng: location[0] }}
          />
        )}
        <Typography
          variant="body2"
          color="inherit"
          className={clsx(classes.address, classes.mt_5)}
        >
          <AddressBlackIcon size={20} />:{workspace?.contacts?.[0].address}
        </Typography>
        <Typography variant="body2" color="inherit" className={classes.address}>
          <PhoneIcon size={20} />:{workspace?.contacts?.[0].phoneNo}
        </Typography>
        <Typography variant="body2" color="inherit" className={classes.address}>
          <EmailIcon size={20} />:{workspace?.contacts?.[0].email}
        </Typography>
      </Container>
      <Container
        maxWidth="lg"
        className={clsx(
          classes.d_flex,
          classes.align_items_center,
          classes.justify_content_center,
          classes.padding_top
        )}
      >
        <div>
          <Grid container spacing={2} justify="center">
            <Grid></Grid>
            <Grid item xs={12} md={8} style={{ padding: 0 }}>
              <div className={classes.title}>{title}</div>
            </Grid>
            <Grid item xs={12} md={5}>
              <div className={clsx(classes.icon, classes.my_3)}>
                {socials.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.image}
                    onClick={() => router.push(item.url)}
                  />
                ))}

                {/* {icon.map((v) => {
                  return workspace?.socialLinks[v.alt]?.url ? (
                    
                  ) : (
                    ""
                  );
                })} */}
              </div>
              <ContactUsForm />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};
export default compose(withSSRScaffold([SSRWorkspaceHandler]))(ContactUs);
