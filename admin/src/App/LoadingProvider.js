import React from 'react';
import { connect } from 'react-redux';
import Loading from '../Components/Common/Loading';

const LoadingProvider = ({ form }) => {
  // by form submitting ,display loading full
  const formSubmiting = Object.values(form).some(o => o.submitting);
  return <Loading isLoading={formSubmiting} full={true} />;
};

export default connect(state => ({ form: state.form }))(LoadingProvider);
