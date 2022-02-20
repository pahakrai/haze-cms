import React from "react";
import { compose } from "recompose";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { Container } from "@material-ui/core";

import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import { PageSection } from "~/src/Modules/Page/Components";
import { usePagesSectionResult } from "~/src/Modules/Page/hooks";
import PageHead from "~/src/Modules/App/Components/PageHead";
interface FAQProps {
  pageParam: IPageParam;
}
const FAQ: NextPage<FAQProps> = ({}) => {
  const intl = useIntl();
  const pagesResult = usePagesSectionResult({
    prefix: "faq",
    sections: ["banner", "questions-list"]
  });
  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_faq" })} />
      <PageSection
        prefix="faq"
        section="banner"
        pagesResult={pagesResult}
      ></PageSection>
      <Container maxWidth="lg">
        <PageSection
          prefix="faq"
          section="questions-list"
          pagesResult={pagesResult}
        ></PageSection>
      </Container>
    </Layout>
  );
};

export default compose(
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(FAQ);
