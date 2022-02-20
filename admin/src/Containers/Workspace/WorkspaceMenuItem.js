import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { getWorkspaceById } from '../../Redux/selectors';

class WorkspaceMenuItemContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchWorkspaceById, workspaceId } = this.props;
    if (workspaceId) {
      fetchWorkspaceById(workspaceId);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.workspaceId !== this.props.workspaceId &&
      this.props.workspaceId &&
      this.props.fetchWorkspaceById
    ) {
      this.props.fetchWorkspaceById(this.props.workspaceId);
    }
  }

  render() {
    const { workspace, children } = this.props;
    return (
      !!children &&
      !!workspace &&
      typeof children === 'function' &&
      children(workspace)
    );
  }
}

const mapStateToProps = (state, props) => ({
  workspace: getWorkspaceById(state, props.workspaceId)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchWorkspaceById: WorkspaceActions.getWorkspaceById
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WorkspaceMenuItemContainer));
