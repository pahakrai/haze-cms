import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScrollToTop from '../Components/Common/ScrollToTop';
import Loading from '../Components/Common/Loading';
import { WebMenuActions } from '../Redux/WebMenu/actions';
import { AccountActions } from '../Redux/Account/actions';
import sitemap from './sitemap';

const Routes = ({
  webMenusLoading,
  webMenuResources,
  getWebMenus,
  getAccountUser,
  getAccountWorkspace
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // first get routes
    getWebMenus && getWebMenus();
    // first get me
    getAccountUser &&
      getAccountUser({}, { notRetry: true, notRefreshToken: true });
    // first get workspace
    getAccountWorkspace &&
      getAccountWorkspace({}, { notRetry: true, notRefreshToken: true });
  }, [getAccountUser, getAccountWorkspace, getWebMenus]);
  useEffect(() => {
    // when request webmenu api , set loading true
    if (!!webMenusLoading && webMenusLoading !== loading) setLoading(loading);
  }, [loading, webMenusLoading]);
  useEffect(() => {
    // get all menus for array
    const webMenus = Object.values(webMenuResources);

    // set handle menus loading...
    setLoading(true);
    // merge webMenu.menu
    const menus = (Array.isArray(webMenus) ? webMenus : [webMenus]).reduce(
      (all, item) => [...all, ...(item.menu || [])],
      []
    );
    // by service fetch route , set loading ,
    // if loading true, need await fetch route
    // loading false and fetch data != null , set sitemap
    // merge sitemap :
    //   1. need getSitemap (some routes defined in code)
    //   2. filter defined in code repeated routes
    //   3. merge fetch data
    sitemap.setSitemapFromApi && sitemap.setSitemapFromApi(menus);
    console.log('Routes set webMenus lentgh ', menus.length);
    // set handle menus loading finish , for render
    setLoading(false);
  }, [webMenuResources]);
  return (
    <Router>
      <ScrollToTop containerId="main-view">
        {loading && <Loading isLoading={true} fill={true} />}
        {!loading && <Switch>{sitemap.loadRoutes()}</Switch>}
      </ScrollToTop>
    </Router>
  );
};

export default connect(
  state => ({
    webMenuResources: state.resources.webMenu,
    webMenusLoading: state.loading.webMenus
  }),
  dispatch =>
    bindActionCreators(
      {
        getWebMenus: WebMenuActions.getWebMenus,
        getAccountUser: AccountActions.getAccountUser,
        getAccountWorkspace: AccountActions.getAccountWorkspace
      },
      dispatch
    )
)(Routes);
