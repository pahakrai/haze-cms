/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../Components/Common/Loading';
import Error from './Error';

const PageNotFound = ({ loading }) => (
  <React.Fragment>
    {loading && (
      <Loading isLoading={true} fill={true} style={{ background: '#fff' }} />
    )}
    <Error />
  </React.Fragment>
);

/**
 * listen webMenu fetching
 */
export default connect(state => ({
  loading: state.loading.webMenus
}))(PageNotFound);
