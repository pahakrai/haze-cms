import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { useWorkspace } from "../../Workspace/Hooks/useWorkspace";
import { useGetWorkspaceAppByName } from "../../Workspace/Hooks/useGetWorkspaceAppByName";

const { publicRuntimeConfig } = getConfig();

interface DocumentTitleProps {
  title?: string;
  pageParam?: IPageParam;
}
export const DocumentTitle = ({
  title = "",
  pageParam
}: DocumentTitleProps) => {
  const { workspace } = useWorkspace();
  const prefix = pageParam?.workspace?.name || workspace?.name;
  const _title = `${prefix || ""} - ${title}`;
  const { workspaceApp } = useGetWorkspaceAppByName({
    variables: {
      name: prefix
    }
  });
  const metas: { key: string; name: string; content: string }[] = [];
  const links: { rel: string; href: string }[] = [];
  if (workspaceApp?.productionIOS) {
    const iosValues = workspaceApp.productionIOS;
    iosValues.appId &&
      metas.push({
        key: "app-store",
        name: "apple-itunes-app",
        content: iosValues.appId
      });
    iosValues.touchIcon &&
      links.push({
        rel: "apple-touch-icon",
        href: iosValues.touchIcon
      });
  }
  if (workspaceApp?.productionAndroid) {
    const androidValues = workspaceApp.productionAndroid;
    androidValues.appId &&
      metas.push({
        key: "google-play",
        name: "google-play-app",
        content: androidValues.appId
      });
    androidValues.touchIcon &&
      links.push({
        rel: "android-touch-icon",
        href: androidValues.touchIcon
      });
  }
  return (
    <Head>
      <title>{_title}</title>
      {publicRuntimeConfig.APP_ID && (
        <>
          <meta
            key="app-store"
            name="apple-itunes-app"
            content={`app-id=${publicRuntimeConfig.APP_ID}`}
          />
          <link rel="apple-touch-icon" href={publicRuntimeConfig.APP_LOGO} />
        </>
      )}
      {publicRuntimeConfig.APP_PACKAGE_NAME && (
        <>
          <meta
            key="google-play"
            name="google-play-app"
            content={`app-id=${publicRuntimeConfig.APP_PACKAGE_NAME}`}
          />
          <link rel="android-touch-icon" href={publicRuntimeConfig.APP_LOGO} />
        </>
      )}
      <meta key="title" name="title" content={_title} />
      <meta key="og:title" property="og:title" content={_title} />

      {metas.map((item, idx) => (
        <meta {...item} key={idx}></meta>
      ))}
      {links.map((item, idx) => (
        <link {...item} key={idx}></link>
      ))}
    </Head>
  );
};

export default DocumentTitle;
