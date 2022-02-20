import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FormName from '../../Constants/Form';
import { toast } from '../../Lib/Toast';
import Loading from '../../Components/Common/Loading';
import SalesVolumeForm from '../../Components/App/SalesVolume/SalesVolumeForm';
import { CurrencyActions } from '../../Redux/Currency/actions';

import { SalesVolumeActions } from '../../Redux/SalesVolume/actions';
import { getSalesVolumeById, getCurrencies } from '../../Redux/selectors';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';

class SalesVolumemContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const {
      fetchSalesVolumeById,
      salesVolumeId,
      currencies,
      fetchCurrencies
    } = this.props;
    if (salesVolumeId) {
      fetchSalesVolumeById(salesVolumeId);
    }
    if (!currencies.length) {
      fetchCurrencies();
    }
  }

  onSubmit(salesVolume) {
    const { createSalesVolume, updateSalesVolume } = this.props;
    const fn = salesVolume._id ? updateSalesVolume : createSalesVolume;
    if (salesVolume._id) {
      fn(salesVolume);
    } else {
      fn(salesVolume);
    }
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      history,
      fetchSalesVolume,
      updateMode
    } = this.props;
    fetchSalesVolume({
      query: { populates: [], refresh: true }
    });
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    onSubmitSuccess();
    history.push('/sales-volume');
  }

  onSubmitFail() {
    const { updateMode } = this.props;

    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    );
  }

  getInitialValues = () => {
    const { salesVolume, updateMode, initialValues } = this.props;
    const createValue = { currency: 'HKD' };
    let updateValue = {};
    if (initialValues.year !== undefined && initialValues.month !== undefined) {
      createValue.time = `${initialValues.year}-${
        initialValues.month < 10 ? '0' : ''
      }${initialValues.month}`;
    }
    if (salesVolume && updateMode) {
      updateValue = {
        ...salesVolume
      };
    }

    return updateMode ? { ...updateValue } : createValue;
  };

  render() {
    let isLoading = true;
    const {
      updateMode,
      locale,
      intl,
      salesVolume,
      currencies,
      currentWorkspace,
      form
    } = this.props;
    if (salesVolume) {
      isLoading = false;
    }
    if (!updateMode) {
      isLoading = false;
    }
    const initialValues = this.getInitialValues();
    return isLoading ? (
      <Loading />
    ) : (
      <SalesVolumeForm
        locale={locale}
        intl={intl}
        form={form}
        currencies={currencies}
        initialValues={initialValues}
        updateMode={updateMode}
        currentWorkspace={currentWorkspace}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = ownProps.salesVolumeId !== undefined;
  const { SALES_VOLUME_CREATE, SALES_VOLUME_UPDATE } = FormName;
  const form = updateMode ? SALES_VOLUME_UPDATE : SALES_VOLUME_CREATE;
  return {
    locale: state.intl.locale,
    updateMode,
    currencies: getCurrencies(state),
    salesVolume: getSalesVolumeById(state, ownProps.salesVolumeId),
    currentWorkspace: getCurrentWorkspace(state),
    form
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateSalesVolume: SalesVolumeActions.updateSalesVolume,
      createSalesVolume: SalesVolumeActions.createSalesVolume,
      fetchSalesVolume: SalesVolumeActions.getSalesVolumes,
      fetchSalesVolumeById: SalesVolumeActions.getSalesVolumeById,
      fetchCurrencies: CurrencyActions.getCurrencies
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SalesVolumemContainer)
);
