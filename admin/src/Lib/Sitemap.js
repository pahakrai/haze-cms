import React from 'react';
import { Route } from 'react-router-dom';

class Sitemap {
  static DefaultRoute = Route;
  static DefaultDynamicComp = ({ path, query }) => <div />;

  static hasValidRouteProps = props => {
    return props.to && (props.component || props.render || props.dynamic);
  };
  static getRouteComponent = props => {
    const {
      to,
      path,
      exact,
      auth,
      localeId,
      query,
      dynamic,
      route: RouteComponent = Sitemap.DefaultRoute,
      hideMenu,
      sitemap,
      ...routeProps
    } = props;

    if (Sitemap.hasValidRouteProps(props)) {
      // if sitemap has proper props
      return (
        <RouteComponent
          layoutProps={{ sitemap }}
          key={path || to}
          path={path || to}
          exact={exact}
          auth={auth}
          {...(dynamic
            ? {
                render: () => (
                  <Sitemap.DefaultDynamicComp path={to} query={query} />
                )
              }
            : {})}
          {...routeProps}
        />
      );
    } else {
      return null;
    }
  };
  constructor(sitemap = []) {
    // save sitemap to this.items
    this.setSitemap(sitemap);
  }

  setSitemap = sitemap => {
    this.items = sitemap;
    this.names = null;
    this.initNames();
  };

  /**
   * sitemap {
   *    to: '/',
   *    exact: true,
   *    hideMenu: false,
   *    icon: MdHome,
   *    localeId: 'nav.home',
   *    component: HomePage,
   *    auth: []
   * }
   */
  appendSitemap = sitemap => {
    this.items.push(sitemap);
  };

  getSitemap = () => {
    return this.items;
  };

  flattenSitemapRoutes = (sitemapItems = this.items) => {
    return Array.from(sitemapItems)
      .reduce((arr, sitemapItem) => {
        if (sitemapItem.to) {
          // if sitemapItem has `to`, add to resultObj
          arr.push(sitemapItem);
        }
        if (sitemapItem.items) {
          // if sitemapItem has `items`, it is a group. Get all names from `items`
          arr = arr.concat(this.flattenSitemapRoutes(sitemapItem.items));
        }
        return arr;
      }, [])
      .sort((a, b) => a.idx - b.idx);
  };

  loadRoutes = (sitemapItems = this.items) => {
    return this.flattenSitemapRoutes(sitemapItems)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .map(sitemapItem => {
        return Sitemap.getRouteComponent({ ...sitemapItem, sitemap: this });
      })
      .filter(item => item);
  };

  // init
  initNames = (sitemapItems = this.items) => {
    // go through each item in sitemapItems and recursively
    // retreive all path and its names
    // this.names = {};
    this.names = this.flattenSitemapRoutes(sitemapItems)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .map(item => ({
        to: item.to,
        localeId: item.localeId,
        exact: item.exact
        // priority: item.priority
      }))
      .filter(item => item);
    // .map(item => (this.names[item.to] = item));
    return this.names;
  };
  // get this.names
  getNames = () => this.names;
}

export default Sitemap;
