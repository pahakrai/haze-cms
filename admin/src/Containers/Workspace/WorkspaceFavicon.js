import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentWorkspace } from '../../Redux/Account/selectors';
import { AccountActions } from '../../Redux/Account/actions';

class WorkspaceFaviconContainer extends React.PureComponent {
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
    const {
      currentWorkspace,
      container: Container = React.Fragment
    } = this.props;
    const faviconHref =
      (currentWorkspace &&
        currentWorkspace.setting &&
        currentWorkspace.setting.favicon &&
        currentWorkspace.setting.favicon.uri) ||
      process.env.REACT_APP_DEFAULT_FAVICON;
    return (
      <Container>
        <link rel="shortcut icon" href={faviconHref} />
      </Container>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceFaviconContainer);
