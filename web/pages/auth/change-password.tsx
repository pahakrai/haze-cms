import React from "react";
import { useIntl } from "react-intl";
import { Container, Typography } from "@material-ui/core";
import { compose } from "recompose";

import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import UpdatePasswordForm from "~/src/Modules/Auth/Components/UpdatePasswordForm";
import { ProfileLayout } from "~/src/Modules/User/Components/ProfileLayout";
import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";

const ChangePassword = () => {
  const intl = useIntl();
  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_change_password" })} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/auth/change-password",
              title: intl.formatMessage({ id: "display_change_password" }),
              active: true
            }
          ]}
        />
        <ProfileLayout>
          <Typography gutterBottom variant="h5">
            {intl.formatMessage({ id: "display_change_password" })}
          </Typography>
          <UpdatePasswordForm />
        </ProfileLayout>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler])
)(ChangePassword);
