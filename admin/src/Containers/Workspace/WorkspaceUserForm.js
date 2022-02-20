import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import FormName from '../../Constants/Form';
import WorkspaceForm from '../../Components/App/Workspace/WorkspaceForm';
import { CurrencyActions } from '../../Redux/Currency/actions';
import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { getCurrencies } from '../../Redux/selectors';
import { getWorkspaceByCode } from '../../Redux/Workspace/selectors';
import AccountSelector from '../../Redux/Account/selectors';

class WorkspaceFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const {
      fetchWorkspaces,
      fetchWorkspaceByCode,
      workspaceCode,
      getCurrencies,
      currencies
    } = this.props;
    (!currencies || currencies.length === 0) && getCurrencies();
    if (workspaceCode) {
      fetchWorkspaceByCode(workspaceCode);
    }
    fetchWorkspaces();
  }

  onSubmit(workspace) {
    let formatWorkspace = Object.assign({}, workspace);
    const newImages = [];
    const { createWorkspace, updateWorkspace } = this.props;
    const fn = formatWorkspace.code ? updateWorkspace : createWorkspace;
    if (formatWorkspace.logo.length !== 0) {
      formatWorkspace.logo.forEach(image => {
        if (image.fileMeta) {
          if (typeof image.fileMeta === 'string') {
            formatWorkspace.logo = image.fileMeta;
          } else {
            formatWorkspace.logo = image.fileMeta._id;
          }
        } else {
          newImages.push(image);
        }
      });
    } else {
      formatWorkspace.logo = undefined;
    }

    fn(formatWorkspace, newImages);
  }

  onSubmitSuccess() {
    const { onSubmitSuccess, fetchWorkspaces } = this.props;
    fetchWorkspaces();
    onSubmitSuccess();
  }

  onSubmitFail() {}

  render() {
    let initialValues = {};
    const {
      workspace,
      locale,
      intl,
      updateMode,
      currencies,
      currentUserType
    } = this.props;
    if (workspace) {
      initialValues = Object.assign({}, workspace, {
        logo: workspace.logo ? [{ fileMeta: workspace.logo }] : []
      });
    }
    const { WORKSPACE_CREATE, WORKSPACE_UPDATE } = FormName;
    return (
      <WorkspaceForm
        locale={locale}
        intl={intl}
        form={updateMode ? WORKSPACE_UPDATE : WORKSPACE_CREATE}
        images={initialValues ? initialValues.logo : []}
        updateMode={updateMode}
        currencies={currencies}
        initialValues={initialValues}
        currentUserType={currentUserType}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  updateMode: ownProps.workspaceCode !== undefined,
  locale: state.intl.locale,
  workspace: getWorkspaceByCode(state, ownProps.workspaceCode),
  currencies: getCurrencies(state),
  currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateWorkspace: WorkspaceActions.updateWorkspace,
      createWorkspace: WorkspaceActions.createWorkspace,
      fetchWorkspaces: WorkspaceActions.getWorkspaces,
      fetchWorkspaceByCode: WorkspaceActions.getWorkspaceByCode,
      getCurrencies: CurrencyActions.getCurrencies,
      reset: reset
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceFormContainer)
);
