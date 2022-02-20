import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { AccountActions } from '../../Redux/Account/actions';
import P from '../../Components/Common/P';

class WorkspaceCodeContainer extends React.PureComponent {
  componentDidMount() {
    const {
      currentWorkspace,
      getAccountWorkspace,
      fetchWorkspaceLoading
    } = this.props;
    if (!currentWorkspace && getAccountWorkspace && !fetchWorkspaceLoading)
      getAccountWorkspace();
  }
  render() {
    const { currentWorkspace, history } = this.props;
    return (
      <P
        style={{ cursor: 'pointer' }}
        onClick={() => {
          history.push('/my-workspace');
        }}
      >
        {currentWorkspace && currentWorkspace.code}
      </P>
    );
  }
}
const mapStateToProps = state => ({
  currentWorkspace: getCurrentWorkspace(state),
  fetchWorkspaceLoading: state.loading.accountWorkspace
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAccountWorkspace: AccountActions.getAccountWorkspace
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceCodeContainer)
);
