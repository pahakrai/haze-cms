import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Common from '@golpasal/common'

import Loading from '../../Components/Common/Loading'
import WorkspaceContactList from '../../Components/App/WorkspaceContact/WorkspaceContactList'
import AccountSelector from '../../Redux/Account/selectors'
import { WorkspaceActions } from '../../Redux/Workspace/actions'
import { getWorkspaceById } from '../../Redux/selectors'

class WorkspaceContactListContainer extends React.PureComponent {
  componentDidMount() {
    const { workspaceId, getWorkspaceContactsById } = this.props
    if (workspaceId) {
      getWorkspaceContactsById(workspaceId)
    }
  }

  componentDidUpdate(prevProps) {
    const { workspaceId, getWorkspaceContactsById } = this.props
    if (workspaceId !== prevProps.workspaceId && workspaceId) {
      getWorkspaceContactsById(workspaceId)
    }
  }

  onItemClick = (contactId) => {
    const { history, workspaceId } = this.props
    history.push(`/workspaces/${workspaceId}/contact/${contactId}`)
  }

  onAddClick = (id) => {
    const { history, workspaceId, currentUserType } = this.props
    currentUserType === Common.type.UserType.USER
      ? history.push(`/workspace/${workspaceId}/create`)
      : history.push(`/workspaces/${workspaceId}/create`)
  }

  onDelectItem = (contactId) => {
    const { deleteWorkspaceContact, workspaceId } = this.props
    deleteWorkspaceContact(workspaceId, contactId)
  }

  onToggle = (value, contactId) => {
    const { updateWorkspaceContactIsPrimary, workspaces } = this.props
    updateWorkspaceContactIsPrimary(workspaces._id, contactId, value)
  }

  render() {
    const { onItemClick, onAddClick, onDelectItem, onToggle } = this
    const isLoading = false
    const { workspaces, locale, intl, initialValues } = this.props
    const contacts = workspaces && workspaces.contacts
    return isLoading ? (
      <Loading />
    ) : (
      <WorkspaceContactList
        locale={locale}
        intl={intl}
        initialValues={initialValues}
        contacts={contacts}
        onAddClick={onAddClick}
        onItemClick={onItemClick}
        onDelectItem={onDelectItem}
        onToggle={onToggle}
      />
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  locale: state.intl.locale,
  currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType,
  workspaces: getWorkspaceById(state, ownProps.workspaceId)
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWorkspaceContactsById: WorkspaceActions.getWorkspaceById,
      deleteWorkspaceContact: WorkspaceActions.deleteWorkspaceContact,
      updateWorkspaceContactIsPrimary:
        WorkspaceActions.updateWorkspaceContactIsPrimary
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceContactListContainer)
)
