import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import styled from 'styled-components';
import { Spin } from 'antd';
import { formValueSelector } from 'redux-form';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import WorkspacePhoneRegionForm from '../../Components/App/WorkspacePhoneRegion/WorkspacePhoneRegionForm';
import { WorkspacePhoneRegionActions } from '../../Redux/WorkspacePhoneRegion/actions';
import {
  getWorkspacePhoneRegionById2,
  getWorkspacePhoneRegions
} from '../../Redux/selectors';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class WorkspacePhoneRegionFormContainer extends React.PureComponent {
  componentDidMount() {
    const { workspacePhoneRegionId, getWorkspacePhoneRegionById } = this.props;
    if (workspacePhoneRegionId) {
      getWorkspacePhoneRegionById(workspacePhoneRegionId, {
        populates: ['paymentMethod']
      });
    }
  }

  onSubmit(workspacePhoneRegion) {
    const {
      createWorkspacePhoneRegion,
      updateWorkspacePhoneRegion,
      // updateMode,
      currentWorkspace
    } = this.props;
    const fn = Boolean(workspacePhoneRegion._id)
      ? updateWorkspacePhoneRegion
      : createWorkspacePhoneRegion;

    workspacePhoneRegion.workspace = currentWorkspace && currentWorkspace._id;
    workspacePhoneRegion.phoneRegion = workspacePhoneRegion.phoneRegion[0];
    fn(workspacePhoneRegion);
  }

  onSubmitSuccess() {
    const {
      onSubmitSuccess,
      updateMode,
      // history,
      getWorkspacePhoneRegions,
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

    getWorkspacePhoneRegions({
      query: {},
      refresh: true
    });
  }

  onSubmitFail() {}

  getInitialValues = () => {
    const { workspacePhoneRegion } = this.props;

    return workspacePhoneRegion
      ? {
          ...workspacePhoneRegion,
          phoneRegion: [workspacePhoneRegion.phoneRegion._id]
        }
      : {};
  };
  render() {
    let isLoading = true;
    const {
      updateMode,
      locale,
      intl,
      workspacePhoneRegion,
      workspacePhoneRegions,
      formValuePhoneRegion,
      form
    } = this.props;
    // loading
    if (!updateMode) {
      isLoading = false;
    } else {
      if (workspacePhoneRegion) {
        isLoading = false;
      }
    }
    return isLoading ? (
      <LoadingWrapper>
        <Spin tip="Loading..." />
      </LoadingWrapper>
    ) : (
      <WorkspacePhoneRegionForm
        locale={locale}
        intl={intl}
        form={form}
        initialValues={this.getInitialValues()}
        workspacePhoneRegions={workspacePhoneRegions}
        updateMode={updateMode}
        formValuePhoneRegion={formValuePhoneRegion}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = !!ownProps.workspacePhoneRegionId;
  const {
    WORKSPACE_PHONE_REGION_CREATE,
    WORKSPACE_PHONE_REGION_UPDATE
  } = FormName;
  const workspacePhoneRegion = getWorkspacePhoneRegionById2(
    state,
    ownProps.workspacePhoneRegionId
  );
  const currentWorkspace = getCurrentWorkspace(state);
  const form = updateMode
    ? WORKSPACE_PHONE_REGION_UPDATE
    : WORKSPACE_PHONE_REGION_CREATE;

  const selector = formValueSelector(form);
  return {
    workspacePhoneRegion,
    form,
    workspacePhoneRegions: getWorkspacePhoneRegions(state),
    locale: state.intl.locale,
    updateMode,
    currentWorkspace: currentWorkspace,
    formValuePhoneRegion: selector(state, 'phoneRegion')
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWorkspacePhoneRegions:
        WorkspacePhoneRegionActions.getWorkspacePhoneRegions,
      updateWorkspacePhoneRegion:
        WorkspacePhoneRegionActions.updateWorkspacePhoneRegion,
      createWorkspacePhoneRegion:
        WorkspacePhoneRegionActions.createWorkspacePhoneRegion,
      getWorkspacePhoneRegionById:
        WorkspacePhoneRegionActions.getWorkspacePhoneRegionById,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkspacePhoneRegionFormContainer)
);
