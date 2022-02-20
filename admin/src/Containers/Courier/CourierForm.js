import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FormName from '../../Constants/Form';
import { toast } from '../../Lib/Toast';
import Loading from '../../Components/Common/Loading';
import CourierForm from '../../Components/App/Courier/CourierForm';

import { CourierActions } from '../../Redux/Courier/actions';
import { getCourierById } from '../../Redux/selectors';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';

class CouriermContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const { fetchCourierById, courierId } = this.props;
    if (courierId) {
      fetchCourierById(courierId);
    }
  }

  onSubmit(_courier) {
    const { updateMode } = this.props;
    let formatCourier = Object.assign({}, _courier);
    const { createCourier, updateCourier } = this.props;
    if (formatCourier._id && updateMode) {
      updateCourier(formatCourier);
    } else {
      createCourier(formatCourier);
    }
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, history, fetchCourier, updateMode } = this.props;
    fetchCourier({
      query: { populates: [], refresh: true }
    });
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    onSubmitSuccess();
    history.push('/couriers');
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
    const { courier, updateMode } = this.props;
    const createValue = {
      isActive: true
    };
    let updateValue = {};
    if (courier && updateMode) {
      updateValue = {
        ...courier
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
      courier,
      currentWorkspace,
      formValueUnit,
      form
    } = this.props;
    if (courier) {
      isLoading = false;
    }
    if (!updateMode) {
      isLoading = false;
    }
    const initialValues = this.getInitialValues();
    return isLoading ? (
      <Loading />
    ) : (
      <CourierForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={initialValues}
        updateMode={updateMode}
        formValueUnit={formValueUnit}
        currentWorkspace={currentWorkspace}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = ownProps.courierId !== undefined;
  const { COURIER_CREATE, COURIER_UPDATE } = FormName;
  const form = updateMode ? COURIER_UPDATE : COURIER_CREATE;
  return {
    locale: state.intl.locale,
    updateMode,
    courier: getCourierById(state, ownProps.courierId),
    currentWorkspace: getCurrentWorkspace(state),
    form
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCourier: CourierActions.updateCourier,
      createCourier: CourierActions.createCourier,
      fetchCourier: CourierActions.getCouriers,
      fetchCourierById: CourierActions.getCourierById
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouriermContainer)
);
