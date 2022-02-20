import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field } from 'redux-form';

import { getVehicleTypeById } from '../../../../../Redux/selectors';
import ServiceService from '../../../../../Services/APIServices/ServiceService';
import { withFormValues } from '../../../../Form/utils';

import SelectServices from '../../../../../Containers/Service/SelectServices';

class OrderServiceComponent extends PureComponent {
  state = {
    loading: false,
    services: []
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    const { vehicleType, input, vehicleTypeId } = this.props;

    if (vehicleTypeId !== prevProps.vehicleTypeId) {
      input.onChange([]);
    }
    if (vehicleType !== prevProps.vehicleType) {
      const services = ((vehicleType && vehicleType.services) || []).join('');
      const prevServices = (
        (prevProps.vehicleType && prevProps.vehicleType.services) ||
        []
      ).join('');
      if (services !== prevServices) {
        this.fetchData();
      }
    }
  }
  fetchData = async () => {
    const { vehicleType } = this.props;
    // clear
    this.setState({ services: [] });
    if (vehicleType && vehicleType.services && vehicleType.services.length) {
      this.setState({ loading: true });
      try {
        const query = {
          _ids: vehicleType && vehicleType.services,
          isActive: true,
          populates: ['pricings', 'pricing', 'uom']
        };
        const result = await ServiceService.getServices(query);
        if (result && result.data) {
          this.setState({ services: result && result.data });
        }
      } catch (e) {
      } finally {
        this.setState({ loading: false });
      }
    }
  };
  render() {
    const { disabled, intl, input } = this.props;
    const { loading, services } = this.state;

    return (
      <SelectServices
        loading={loading}
        name={input.name}
        services={services}
        intl={intl}
        disabled={disabled}
        valueControl={ServicesValueControl}
      />
    );
  }
}
const ServicesValueControl = {
  get: v => v.service,
  set: (v, value) => ({ service: v, value })
};

const mapStateToProps = (state, { vehicleTypeId }) => {
  return {
    vehicleType: getVehicleTypeById(state, vehicleTypeId)
  };
};
const mapDispatchToProps = {};

export const OrderService = compose(
  withFormValues({ fields: [['logistic.vehicleType', 'vehicleTypeId']] }),
  connect(mapStateToProps, mapDispatchToProps)
)(props => <Field {...props} component={OrderServiceComponent} />);

export default OrderService;
