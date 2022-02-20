import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { getWorkspaceById } from '../../Redux/selectors';
import FormName from '../../Constants/Form';

import WorkspaceContactForm from '../../Components/App/WorkspaceContact/WorkspaceContactForm';

class WorkspaceContactFormContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchWorkspaceById, workspaceId } = this.props;
    if (workspaceId) {
      fetchWorkspaceById(workspaceId);
    }
  }

  getFormProperty() {
    const { contactId, workspaceContactId } = this.props;
    const updateMode = Boolean(contactId);
    const initialValues = updateMode
      ? workspaceContactId
      : { isPrimary: false };

    return {
      updateMode,
      formName: updateMode
        ? FormName.WORKSPACE_UPDATE_CONTACT
        : FormName.WORKSPACE_CREATE_CONTACT,
      initialValues
    };
  }

  render() {
    const { intl, workspace, contactId } = this.props;
    const { formName, updateMode } = this.getFormProperty();
    let value = {};
    if (workspace) {
      workspace.contacts.forEach(item => {
        if (item._id === contactId) {
          value = item;
        }
      });
    }
    return (
      value && (
        <WorkspaceContactForm
          form={formName}
          updateMode={updateMode}
          initialValues={value}
          intl={intl}
        />
      )
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
)(withRouter(WorkspaceContactFormContainer));
