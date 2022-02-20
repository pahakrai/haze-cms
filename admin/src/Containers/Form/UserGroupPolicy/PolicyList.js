import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from '../../../Components/Common/Loading';
import PolicyList from '../../../Components/App/UserGroupPolicy/PolicyList';
import { UserGroupPolicyActions } from '../../../Redux/UserGroupPolicy/actions';
import { getUserGroupPolicys } from '../../../Redux/UserGroupPolicy/selectors';
import { getCurrentWorkspace } from '../../../Redux/Account/selectors';
class PolicyListContainer extends React.PureComponent {
  componentDidMount() {
    const {
      getUserGroupPolicys,
      userGroupPolicys,
      currentWorkspace
    } = this.props;
    if (getUserGroupPolicys && (!userGroupPolicys || !userGroupPolicys.length))
      getUserGroupPolicys({
        workspace: currentWorkspace._id
      });
  }

  _onItemDelete = row => {
    const { filterRowKeys, onSelectChange } = this.props;
    onSelectChange &&
      onSelectChange(
        filterRowKeys && filterRowKeys.filter(item => item !== row._id)
      );
  };

  _handleoptions = () => {
    const {
      userGroupPolicys,
      // code
      filterRowKeys = [],
      disabledSelected
    } = this.props;
    if (!disabledSelected) return userGroupPolicys;
    // disabledSelected mode and filterRowKeys list empty
    if (!filterRowKeys || !filterRowKeys.length) return [];
    // disabledSelected mode and filterRowKeys list not empty
    // handle options
    const options = [];
    for (let index = 0; index < filterRowKeys.length; index++) {
      const userGroupPolicy = userGroupPolicys.filter(
        item => item._id === filterRowKeys[index]
      );
      if (userGroupPolicy && Array.isArray(userGroupPolicy))
        options.push(...userGroupPolicy);
    }
    return options;
  };

  render() {
    const {
      userGroupPolicys,
      // code
      selectedRowKeys,
      onSelectChange,
      disabledSelected,
      intl,
      pageSize,
      ...props
    } = this.props;
    return !userGroupPolicys || !userGroupPolicys.length ? (
      <Loading />
    ) : (
      <PolicyList
        intl={intl}
        dataSource={this._handleoptions()}
        disabledSelected={
          !selectedRowKeys || !onSelectChange || disabledSelected
        }
        pageSize={pageSize}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={onSelectChange}
        onItemDelete={this._onItemDelete}
        {...props}
      />
    );
  }
}
const mapStateToProps = state => {
  const currentWorkspace = getCurrentWorkspace(state);
  const userGroupPolicys = getUserGroupPolicys(state);
  return {
    userGroupPolicys:
      userGroupPolicys &&
      userGroupPolicys.asMutable &&
      userGroupPolicys.asMutable({ deep: true }),
    currentWorkspace: currentWorkspace
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserGroupPolicys: UserGroupPolicyActions.getUserGroupPolicys
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyListContainer);
