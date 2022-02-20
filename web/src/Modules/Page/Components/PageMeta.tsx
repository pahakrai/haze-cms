import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();

const PROPERTYLIST = ["og:", "fb:"];

interface PageMetaProps {
  page?: Partial<IPage>;
  pageParam?: IPageParam;
}

export const PageMeta = ({ page, pageParam }: PageMetaProps) => {
  const pageMeta = page?.meta || {};
  const commonMeta = pageParam?.meta || {};
  const router = useRouter();
  return (
    <Head>
      {/* workspace meta */}
      {!!commonMeta &&
        Object.keys(commonMeta).map((name) => (
          <meta
            key={name}
            content={commonMeta[name]}
            {...(PROPERTYLIST.some((sw) => name.startsWith(sw))
              ? { property: name }
              : { name })}
          />
        ))}
      {!!pageMeta &&
        Object.keys(pageMeta)
          .filter((key) => pageMeta[key])
          .map((name) => (
            <meta
              key={name}
              content={pageMeta[name]}
              {...(PROPERTYLIST.some((sw) => name.startsWith(sw))
                ? { property: name }
                : { name })}
            />
          ))}
      <meta
        key="og:url"
        property="og:url"
        content={
          pageMeta["og:url"] ||
          commonMeta["og:url"] ||
          `${publicRuntimeConfig.SITE_ROOT}${router.asPath}`
        }
      />
    </Head>
  );
};

export default PageMeta;
