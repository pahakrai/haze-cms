import React from "react";
import { compose } from "recompose";
import { Container } from "@material-ui/core";
import { useGoogleLogout } from "react-google-login";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import getConfig from "next/config";

import { clearToken } from "~/lib/auth";
import { PageBreadcrumb } from "~/src/Modules/App/Components/PageBreadcrumb";
import { ProfileLayout } from "~/src/Modules/User/Components/ProfileLayout";
import { SSRShoppingCartHandler } from "~/src/Modules/ShoppingCart/SSRShoppingCartHandler";
import { SSRWorkspaceHandler } from "~/src/Modules/App/SSRWorkspaceHandler";
import { useCurrentUser } from "~/src/Modules/Auth/Hooks/useCurrentUser";
import { withAuthRedirect } from "~/src/Modules/Auth/withAuthRedirect";
import { withSSRScaffold } from "~/src/Modules/App/withSSRScaffold";
import Layout from "~/src/Modules/App/Components/Layout";
import PageHead from "~/src/Modules/App/Components/PageHead";
import UserProfileForm from "~/src/Modules/User/Containers/UserProfileForm";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

const { publicRuntimeConfig: Config } = getConfig();
const Profile = () => {
  const intl = useIntl();
  const router = useRouter();
  const { workspace } = useWorkspace();
  const { currentUser } = useCurrentUser();
  const { signOut } = useGoogleLogout({
    clientId: workspace?.serviceApps?.google?.web?.appId
  });

  const handleLogout = () => {
    // just clear token and reload
    clearToken();
    router.reload();
    // clears third party tokens if present
    // facebook or google
    signOut();
  };

  return (
    <Layout>
      <PageHead title={intl.formatMessage({ id: "display_my_profile" })} />
      <Container maxWidth="lg">
        <PageBreadcrumb
          links={[
            { href: "/", title: intl.formatMessage({ id: "display_home" }) },
            {
              href: "/user/user-profile",
              title: intl.formatMessage({ id: "display_my_profile" }),
              active: true
            }
          ]}
        />
        <ProfileLayout>
          {currentUser && <UserProfileForm currentUser={currentUser} />}
        </ProfileLayout>
      </Container>
    </Layout>
  );
};
export default compose(
  withAuthRedirect(),
  withSSRScaffold([SSRWorkspaceHandler, SSRShoppingCartHandler])
)(Profile);
