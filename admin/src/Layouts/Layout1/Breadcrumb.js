import React from 'react';
import { Breadcrumb } from 'antd';
import styled from 'styled-components';
import IntlMessages from '../../Components/Common/IntlMessages';
import { withRouter, matchPath } from 'react-router-dom';
import Link from '../../Components/Common/Link';
import P from '../../Components/Common/P';
import NavBar from '../../Components/Common/NavBar';

const Span = styled(P)`
  display: inline-block;
`;

// Get match path corresponding to localeId
export const getMatchPathId = (sitemap, url) => {
  const pathArr = sitemap.getNames();
  // const pathKeys = Object.keys(pathMap);
  let matchResultIndex = -1;
  for (let index = 0; index < pathArr.length; index++) {
    const pathObj = pathArr[index];
    let matchResult = matchPath(url, {
      path: pathObj.to,
      exact: pathObj.exact
    });
    if (matchResult) {
      matchResultIndex = index;
      break;
    }
  }
  const matchResult = pathArr[matchResultIndex];
  if (!matchResult || !matchResult.localeId) return null;
  return matchResult.localeId;
};

// Breadcrumb Items Separator
const Separator = () => <Span>{'>'}</Span>;

const getUrl = url => {
  switch (url) {
    case '/workspace-app':
      return '/my-workspace#app';
    default:
      return url;
  }
};
// Breadcrumb Item
export const breadcrumbItem = ({ url, name = '', intlMessagesProps = {} }) => {
  return (
    <Breadcrumb.Item key={url} separator={<Separator />}>
      <Link to={getUrl(url)}>
        <Span>
          <IntlMessages id={name} {...intlMessagesProps} />
        </Span>
      </Link>
    </Breadcrumb.Item>
  );
};

// Breadcrumb logic handle
const BreadcrumbComp = ({
  children,
  sitemap,
  appendBreadcrumbItems = [],
  formatBreadcrumbData = v => v,
  ...props
}) => {
  const { location } = props;
  // split array
  // Split the current URL
  const pathSnippets = `${location.pathname + location.search}`
    .split('/')
    .filter(i => i);
  // breadcrumb Item arry
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = formatBreadcrumbData(
      `/${pathSnippets.slice(0, index + 1).join('/')}`
    );
    const urlNameId = getMatchPathId(sitemap, url);

    return urlNameId
      ? breadcrumbItem(formatBreadcrumbData({ url, name: urlNameId }))
      : null;
  });

  return (
    <NavBar>
      <Breadcrumb>
        {[breadcrumbItem({ url: '/', name: 'nav.home' })].concat(
          extraBreadcrumbItems,
          appendBreadcrumbItems
        )}
      </Breadcrumb>
    </NavBar>
  );
};
export default withRouter(BreadcrumbComp);
