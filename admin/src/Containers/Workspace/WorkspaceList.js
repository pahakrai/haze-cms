import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import WorkspaceList from '../../Components/App/Workspace/WorkspaceList';
import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { getWorkspaces } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class WorkspaceListContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchWorkspaces, workspaces } = this.props;
    if (!workspaces.length) {
      fetchWorkspaces();
    }
  }

  onItemClick = workspace => {
    const { setSelected } = this.props;
    setSelected(workspace);
    this.props.history.push(`/workspaces/${workspace}`);
  };

  render() {
    const { onItemClick } = this;
    const isLoading = false;
    const { workspaces, selectedId, locale, intl } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <WorkspaceList
        locale={locale}
        intl={intl}
        onItemClick={onItemClick}
        workspaces={workspaces}
        selected={selectedId}
        onDeleteClick={workspace => true}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  workspaces: getWorkspaces(state),
  selectedId: state.workspace.selected
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelected: WorkspaceActions.setSelected,
      fetchWorkspaces: WorkspaceActions.getWorkspaces
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceListContainer)
);
