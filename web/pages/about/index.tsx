import React from "react";
import { useIntl } from "react-intl";
import { compose } from "recompose";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

import { PageSection } from "~/src/Modules/Page/Components";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { usePagesSectionResult } from "~/src/Modules/Page/hooks";

const useClasses = makeStyles((theme) => ({
  justify_content_center: {
    justifyContent: "center"
  },
  mb_3: {
    marginBottom: theme.spacing(3)
  }
}));
const About = () => {
  const classes = useClasses();
  const intl = useIntl();
  const pagesResult = usePagesSectionResult({
    prefix: "about",
    sections: ["banner"]
  });

  return (
    <Layout
      classes={{
        main: clsx(classes.justify_content_center)
      }}
    >
      <PageHead title={intl.formatMessage({ id: "display_about" })} />
      <div className={classes.mb_3}>
        <PageSection
          prefix="about"
          section="banner"
          pagesResult={pagesResult}
        />
      </div>
    </Layout>
  );
};
export default compose(withSSRScaffold([SSRWorkspaceHandler]))(About);
