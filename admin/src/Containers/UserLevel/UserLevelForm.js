import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import FormName from '../../Constants/Form';
import UserLevelForm from '../../Components/App/UserLevel/UserLevelForm';
import Loading from '../../Components/Common/Loading';

import { UserLevelActions } from '../../Redux/UserLevel/actions';
import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { getUserLevelById } from '../../Redux/selectors';

class UserLevelFormContainer extends React.PureComponent {
  componentDidMount() {
    const { userLevelId, getUserLevelById } = this.props;
    if (userLevelId) getUserLevelById(userLevelId);
  }

  onSubmit = userLevel => {
    const { createUserLevel, updateUserLevel } = this.props;
    const fn = userLevel._id ? updateUserLevel : createUserLevel;

    fn(userLevel);
  };

  onSubmitSuccess = () => {
    const { history, onSubmitSuccess } = this.props;
    history.push('/user-levels');
    onSubmitSuccess && onSubmitSuccess();
  };

  onSubmitFail = () => {};

  getInitialValues = () => {
    const { updateMode, userLevel } = this.props;
    const createValue = {
      isActive: true
    };
    let updateValue = {};
    if (userLevel) {
      updateValue = userLevel;
    }
    return updateMode ? updateValue : createValue;
  };

  render() {
    const key = this.props.userLevel ? this.props.userLevel._id : 'new';
    let initialValues = {};
    let isLoading = false; // dummy
    const {
      updateMode,
      intl,
      userLevel,
      form,
      currentWorkspaceType,
      userLevelId
    } = this.props;
    if (userLevel) {
      isLoading = false;
    }
    if (!updateMode) {
      isLoading = false;
    }
    initialValues = this.getInitialValues();
    return isLoading ? (
      <Loading isLoading={isLoading} />
    ) : (
      <UserLevelForm
        // form props
        key={key}
        form={form}
        updateMode={updateMode}
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        // other props
        intl={intl}
        userLevelId={userLevelId}
        workspaceType={currentWorkspaceType}
      />
    );
  }
}
const mapStateToProps = (state, { userLevelId }) => {
  const { USER_LEVEL_CREATE, USER_LEVEL_UPDATE } = FormName;
  const updateMode = Boolean(userLevelId);
  const form = updateMode ? USER_LEVEL_UPDATE : USER_LEVEL_CREATE;
  const userLevel = getUserLevelById(state, userLevelId);
  const currentWorkspace = getCurrentWorkspace(state);

  return {
    form,
    userLevel,
    updateMode,
    currentWorkspace,
    currentWorkspaceType:
      currentWorkspace && currentWorkspace.type
        ? currentWorkspace.type
        : undefined
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUserLevel: UserLevelActions.createUserLevel,
      updateUserLevel: UserLevelActions.updateUserLevel,
      getUserLevels: UserLevelActions.getUserLevels,
      getUserLevelById: UserLevelActions.getUserLevelById
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserLevelFormContainer));
