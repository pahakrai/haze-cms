import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Common from '@golpasal/common';

import { toast } from '../../Lib/Toast';

import UserGroupForm from '../../Components/App/UserGroup/UserGroupForm';
import Loading from '../../Components/Common/Loading';

import { ResourcesActions } from '../../Redux/Resources/actions';
import { UserGroupActions } from '../../Redux/UserGroup/actions';
import { getUserGroupById } from '../../Redux/UserGroup/selectors';
import { getCurrentUser } from '../../Redux/Account/selectors';

import FormName from '../../Constants/Form';

const { PolicyType } = Common.type;

class UserGroupFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  state = {
    allowed: false
  };

  componentDidMount() {
    const {
      getUserGroupById,
      userGroupId,
      updateMode,
      removeUserGroups
    } = this.props;
    if (updateMode && getUserGroupById) {
      removeUserGroups(userGroupId);
      getUserGroupById(userGroupId);
    }
  }
  componentDidUpdate(prevProps) {
    const { userGroup, history, currentUser } = this.props;

    if (prevProps.userGroup !== userGroup && userGroup) {
      const { SYSTEM_ADMINISTRATOR, SYSTEM_SUPPORT } = PolicyType;
      const isAdmin = (currentUser?.actions?.allows || []).some(v =>
        [SYSTEM_ADMINISTRATOR, SYSTEM_SUPPORT].includes(v)
      );
      const included = new RegExp(
        `"${SYSTEM_ADMINISTRATOR}"|"${SYSTEM_SUPPORT}"`
      ).test(JSON.stringify(userGroup.policies || {}));

      if (included) {
        if (isAdmin) {
          this.setState({ allowed: true });
        } else {
          history.push('/error');
        }
      } else {
        this.setState({ allowed: true });
      }
    }
  }

  _onSubmit = fromValue => {
    const { updateUserGroup, createUserGroup, updateMode } = this.props;
    const fn = updateMode ? updateUserGroup : createUserGroup;
    fn && fn(fromValue);
  };

  _onSubmitSuccess = () => {
    const { onSubmitSuccess, intl, history, updateMode } = this.props;
    if (!updateMode) {
      toast.success(intl.formatMessage({ id: 'created_successfully' }));
    } else {
      toast.success(intl.formatMessage({ id: 'updated_successfully' }));
    }
    if (onSubmitSuccess) onSubmitSuccess();
    history.push('/user-groups');
  };

  _onSubmitFail = () => {
    const { updateMode } = this.props;

    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    );
  };

  _getInitialValues = () => {
    const { userGroup = {}, updateMode } = this.props;
    const createValues = {
      _id: null,
      name: '',
      // userCount: 0,
      // description: '',
      policies: [],
      users: []
      // isActive: true
    };
    const updateValues = {
      ...createValues,
      ...userGroup,
      policies: userGroup?.policies?.map?.(v => v._id) || []
    };
    return updateMode ? updateValues : createValues;
  };

  render() {
    const { userGroup, locale, intl, formName, updateMode } = this.props;
    const { allowed } = this.state;
    const key = userGroup ? userGroup._id : 'new';
    const isLoading = !((userGroup && updateMode && allowed) || !updateMode);

    return isLoading ? (
      <Loading isLoading />
    ) : (
      <UserGroupForm
        initialValues={this._getInitialValues()}
        intl={intl}
        locale={locale}
        key={key}
        updateMode={updateMode}
        form={formName}
        onSubmit={this._onSubmit}
        onSubmitFail={this._onSubmitFail}
        onSubmitSuccess={this._onSubmitSuccess}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { USER_GROUP_CREATE, USER_GROUP_UPDATE } = FormName;
  const updateMode = !!ownProps.userGroupId;
  const formName = !updateMode ? USER_GROUP_CREATE : USER_GROUP_UPDATE;
  return _state => {
    const userGroup = getUserGroupById(_state, ownProps.userGroupId);
    return {
      locale: _state.intl.locale,
      userGroup: userGroup,
      formName,
      updateMode,
      currentUser: getCurrentUser(state)
    };
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserGroup: UserGroupActions.updateUserGroup,
      createUserGroup: UserGroupActions.createUserGroup,
      getUserGroupById: UserGroupActions.getUserGroupById,
      removeUserGroups: ResourcesActions.removeUserGroups
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserGroupFormContainer)
);
