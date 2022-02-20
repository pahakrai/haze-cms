import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { compose } from "recompose";
import { Container } from "@material-ui/core";
import { useIntl } from "react-intl";
import qs from "qs";

import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import { withTokenForSetPassword } from "~/src/Modules/Auth/withTokenForSetPassword";
import { withVerifyUser } from "~/src/Modules/Auth/withVerifyUser";

export interface VerifyUserPageProps {
  validateUser?: boolean;
}

const VerifyUserPage: NextPage<VerifyUserPageProps> = ({ validateUser }) => {
  const router = useRouter();
  const intl = useIntl();
  const title = intl.formatMessage({ id: "display_verify_user" });
  useEffect(() => {
    if (!validateUser) {
      router.replace("/connect-expired");
    } else {
      const { p, ...resQ } = router.query;
      router.replace(
        `${p || "/auth/verify-user-completed"}?${qs.stringify(resQ)}`
      );
    }
  }, [validateUser]);
  return (
    <Layout>
      <PageHead title={title} />
      <Container
        maxWidth="lg"
        style={{ paddingTop: 50, paddingBottom: 50, textAlign: "center" }}
      >
        loading...
      </Container>
    </Layout>
  );
};

export default compose(
  withTokenForSetPassword,
  withVerifyUser,
  withSSRScaffold([SSRWorkspaceHandler])
)(VerifyUserPage);
