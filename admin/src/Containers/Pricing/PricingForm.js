import React from 'react';
import { connect } from 'react-redux';
import { toast } from '../../Lib/Toast';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Spin } from 'antd';
import {
  reset,
  formValueSelector,
  change as formValueChange
} from 'redux-form';

import FormName from '../../Constants/Form';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import PricingForm from '../../Components/App/Pricing/PricingForm';
import { PrcingsActions } from '../../Redux/Pricing/actions';
import { getPricingById } from '../../Redux/selectors';
import { getAllVehicleTypes } from '../../Redux/selectors';
import { VehicleTypeActions } from '../../Redux/VehicleType/actions';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class PricingFormContainer extends React.PureComponent {
  static defaultProps = {};
  async componentDidMount() {
    const { pricingId, getPricingById, getAllVehicleTypes } = this.props;
    if (pricingId) {
      getPricingById(pricingId);
    }
    getAllVehicleTypes({ isActive: true });
  }

  onSubmit(pricing) {
    const {
      createPricingService,
      createPricingTunnel,
      updatePricing,
      updatePricingTunnel,
      // updateMode,
      currentWorkspace,
      serviceId,
      tunnelId
    } = this.props;
    let formatPricing = Object.assign({}, pricing);
    // const fn = Boolean(pricing._id)
    //   ? updatePricing
    //   : serviceId
    //   ? createPricingService
    //   : createPricingTunnel;

    const updateService = Boolean(tunnelId)
      ? updatePricingTunnel
      : updatePricing;
    const createService = Boolean(serviceId)
      ? createPricingService
      : createPricingTunnel;

    const fn = Boolean(pricing._id) ? updateService : createService;
    formatPricing.workspace = currentWorkspace && currentWorkspace._id;
    formatPricing.pricingService = serviceId;
    formatPricing.pricingTunnel = tunnelId;
    fn(formatPricing);
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      // history,
      closeModal
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    closeModal();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  }

  onSubmitFail() {}

  getInitialValues = () => {
    const { pricing, vehicleType, tunnelId } = this.props;

    return pricing
      ? {
          ...pricing,
          vehicleType,
          tunnelId
        }
      : { isActive: true, tunnelId };
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      locale,
      intl,
      pricing,
      form,
      tunnelId,
      vehicleTypes
    } = this.props;
    // loading
    if (!updateMode) {
      isLoading = false;
    } else {
      if (pricing) {
        isLoading = false;
      }
    }
    return isLoading ? (
      // <Loading />
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <PricingForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={this.getInitialValues()}
        vehicleTypes={vehicleTypes}
        tunnelId={tunnelId}
        updateMode={updateMode}
        pricing={pricing}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = !!ownProps.pricingId;
  const serviceId = ownProps.serviceId;
  const { PRICING_CREATE, PRICING_UPDATE } = FormName;
  const pricing = getPricingById(state, ownProps.pricingId);
  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode ? PRICING_UPDATE : PRICING_CREATE;
  const selector = formValueSelector(form);
  return {
    pricing,
    form,
    selector,
    serviceId,
    locale: state.intl.locale,
    updateMode,
    currentWorkspace: currentWorkspace,
    vehicleTypes: getAllVehicleTypes(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePricing: PrcingsActions.updatePricing,
      updatePricingTunnel: PrcingsActions.updatePricingTunnel,
      createPricingService: PrcingsActions.createPricingService,
      createPricingTunnel: PrcingsActions.createPricingTunnel,
      getPricingById: PrcingsActions.getPricingById,
      getAllVehicleTypes: VehicleTypeActions.getAllVehicleTypes,
      reset: reset,
      formValueChange
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PricingFormContainer)
);
