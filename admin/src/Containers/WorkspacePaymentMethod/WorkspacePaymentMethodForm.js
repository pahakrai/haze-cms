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
import WorkspacePaymentMethodForm from '../../Components/App/WorkspacePaymentMethod/WorkspacePaymentMethodForm';
import { WorkspacePaymentMethodActions } from '../../Redux/WorkspacePaymentMethod/actions';
import {
  getWorkspacePaymentMethodById,
  getWorkspacePaymentMethods
} from '../../Redux/selectors';
import PaymentMethodService from '../../Services/APIServices/PaymentMethodService';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspacePaymentMethodFormContainer extends React.PureComponent {
  static defaultProps = {};
  state = {
    paymentMethod: []
  };
  async componentDidMount() {
    const {
      workspacePaymentMethodId,
      getWorkspacePaymentMethodById
    } = this.props;
    if (workspacePaymentMethodId) {
      getWorkspacePaymentMethodById(workspacePaymentMethodId, {
        populates: ['paymentMethod']
      });
    }
    const { data } = await PaymentMethodService.getPaymentMethods({});
    this.setState({ paymentMethod: data });
  }
  componentDidUpdate(prevProps) {
    const { formValueCode, form, formValueChange, updateMode } = this.props;
    const { paymentMethod } = this.state;
    if (
      prevProps.formValueCode !== formValueCode &&
      paymentMethod.length &&
      !updateMode
    ) {
      const data = paymentMethod.filter(v => v.code === formValueCode);
      if (data.length) {
        formValueChange(form, 'paymentMethodModel.name', data[0].name);
      }
    }
  }
  onSubmit(workspacePaymentMethod) {
    const {
      createWorkspacePaymentMethod,
      updateWorkspacePaymentMethod,
      // updateMode,
      currentWorkspace
    } = this.props;
    const { paymentMethod } = this.state;
    const fn = Boolean(workspacePaymentMethod._id)
      ? updateWorkspacePaymentMethod
      : createWorkspacePaymentMethod;

    workspacePaymentMethod.workspace = currentWorkspace && currentWorkspace._id;
    const data = paymentMethod.filter(
      v => v.code === workspacePaymentMethod.paymentMethodModel.code
    );
    workspacePaymentMethod.paymentMethod = data[0]._id;
    delete workspacePaymentMethod.paymentMethodModel;
    fn(workspacePaymentMethod);
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      // history,
      getWorkspacePaymentMethods,
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

    // history.push('/my-payment-method');
    getWorkspacePaymentMethods({
      query: {},
      refresh: true
    });
  }

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspacePaymentMethod } = this.props;

    return workspacePaymentMethod
      ? {
          ...workspacePaymentMethod,
          paymentMethodModel: workspacePaymentMethod.paymentMethod,
          paymentMethod: workspacePaymentMethod.paymentMethod._id
        }
      : {
          // paymentMethodModel: {
          //   chargeSymbol: '%'
          // }
        };
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      locale,
      intl,
      workspacePaymentMethod,
      form,
      workspacePaymentMethods
    } = this.props;
    // loading
    if (!updateMode) {
      isLoading = false;
    } else {
      if (workspacePaymentMethod) {
        isLoading = false;
      }
    }
    return isLoading ? (
      // <Loading />
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <WorkspacePaymentMethodForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={this.getInitialValues()}
        updateMode={updateMode}
        workspacePaymentMethods={workspacePaymentMethods}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = !!ownProps.workspacePaymentMethodId;
  const {
    WORKSPACE_PAYMENT_METHOD_CREATE,
    WORKSPACE_PAYMENT_METHOD_UPDATE
  } = FormName;
  const workspacePaymentMethod = getWorkspacePaymentMethodById(
    state,
    ownProps.workspacePaymentMethodId
  );
  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode
    ? WORKSPACE_PAYMENT_METHOD_UPDATE
    : WORKSPACE_PAYMENT_METHOD_CREATE;
  const selector = formValueSelector(form);
  return {
    workspacePaymentMethod,
    form,
    locale: state.intl.locale,
    updateMode,
    currentWorkspace: currentWorkspace,
    workspacePaymentMethods: getWorkspacePaymentMethods(state),
    formValueCode: selector(state, 'paymentMethodModel.code')
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspacePaymentMethods:
        WorkspacePaymentMethodActions.getWorkspacePaymentMethods,
      updateWorkspacePaymentMethod:
        WorkspacePaymentMethodActions.updateWorkspacePaymentMethod,
      createWorkspacePaymentMethod:
        WorkspacePaymentMethodActions.createWorkspacePaymentMethod,
      getWorkspacePaymentMethodById:
        WorkspacePaymentMethodActions.getWorkspacePaymentMethodById,
      toggleActive: WorkspacePaymentMethodActions.toggleActive,
      deleteWorkspacePaymentMethod:
        WorkspacePaymentMethodActions.deleteWorkspacePaymentMethod,
      reset: reset,
      formValueChange
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkspacePaymentMethodFormContainer)
);
