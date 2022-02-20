import React from 'react';
// import { hasIn } from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import common from '@golpasal/common';
import { getFormValues } from 'redux-form';

import { toast } from '../../Lib/Toast';

import { UserActions } from '../../Redux/User/actions';
import AccountSelector from '../../Redux/Account/selectors';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';

import Loading from '../../Components/Common/Loading';
import H2 from '../../Components/Common/H4';
import UserInviteForm, {
  validate
} from '../../Components/App/User/UserForm/UserInviteForm';

import { getUserById } from '../../Redux/selectors';

import FormName from '../../Constants/Form';

const { ContactType } = common.type;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
const ErrorWrapper = styled(LoadingWrapper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

class UserInviteFormContainer extends React.PureComponent {
  state = {
    activeKey: '1',
    requirementFields: [],
    getUserRequirementsLoading: false,
    merchantField: []
  };
  componentDidMount() {
    const { workspaceTypes } = this.props;

    if (!workspaceTypes) this.updateRequirementFields();
  }
  componentDidUpdate(prevProps) {
    const { userId, userType } = this.props;

    if (userId && userId !== prevProps.userId) {
      this.setState({ activeKey: '1' });
    }
    if (userType !== prevProps.userType) {
      this.updateRequirementFields();
    }
  }

  updateRequirementFields() {
    const { userType } = this.props;
    if (userType) {
      this.setState({
        requirementFields: ['email']
      });
    }
  }

  onSubmit = () => {
    const { activeKey, requirementFields } = this.state;
    const { inviteUsers, formValues, setState, userType } = this.props;

    const formHasError =
      Object.keys(validate({ ...(formValues || {}) }, { requirementFields }))
        .length > 0;

    // tab switch flow
    if (formHasError) {
      let newActiveKey = activeKey;
      if (formHasError) {
        newActiveKey = '1';
      }
      activeKey !== newActiveKey && setState({ activeKey: newActiveKey });
      return;
    }
    inviteUsers(
      {
        contacts: formValues.email ? [formValues.email] : [],
        contactType: ContactType.EMAIL
      },
      userType
    );
  };

  onResetPassword = email => {
    const { sendResetPasswordEmail } = this.props;
    if (email) {
      sendResetPasswordEmail(email);
      toast.success(`Send Reset Password Successfully`);
    }
  };

  onSubmitSuccess = () => {
    const { onSubmitSuccess } = this.props;
    onSubmitSuccess && onSubmitSuccess();
  };

  onSubmitFail = () => {};

  getInitialValues = () => {
    const createValue = {
      email: ''
    };
    return createValue;
  };

  renderError() {
    return (
      <ErrorWrapper>
        <H2>
          <FormattedMessage id="error.user_no_exist" />
        </H2>
      </ErrorWrapper>
    );
  }

  render() {
    const key = this.props.user ? this.props.user._id : 'new';
    const {
      fieldControl = {},
      form,
      intl,
      phoneRegions,
      updateUserProfileLoading,
      userType,
      updateMode,
      getUserErrors
    } = this.props;
    const { requirementFields, getUserRequirementsLoading } = this.state;
    const isLoading = updateUserProfileLoading || getUserRequirementsLoading;
    const initialValues = this.getInitialValues();
    const displaySubmitButtons = !updateMode;

    if (getUserErrors) {
      return this.renderError();
    }
    const userForm = (
      <UserInviteForm
        key={key}
        form={form}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        // others
        intl={intl}
        userType={userType}
        fieldControl={fieldControl}
        phoneRegions={phoneRegions}
        initialValues={initialValues}
        requirementFields={requirementFields}
        displaySubmitButtons={displaySubmitButtons}
      />
    );

    return isLoading ? (
      <LoadingWrapper>
        <Loading isLoading={isLoading} fill={false} />
      </LoadingWrapper>
    ) : (
      userForm
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { USER_INVITE } = FormName;
  const form = USER_INVITE;
  return {
    form,
    formValues: getFormValues(form)(state),
    user: getUserById(state, ownProps.userId),
    currentUser: AccountSelector.getCurrentUser(state),
    currentWorkspace: getCurrentWorkspace(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      inviteUsers: UserActions.inviteUsers
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInviteFormContainer)
);
