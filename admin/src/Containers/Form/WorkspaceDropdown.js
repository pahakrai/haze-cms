import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Common from '@golpasal/common'

// redux
import { WorkspaceActions } from '../../Redux/Workspace/actions'

import { getAllWorkspace } from '../../Redux/selectors'

import FormDropdown from '../../Components/Form/Dropdown'
import CommonDropdown from '../../Components/Common/Dropdown'

class WorkspaceDropdown extends PureComponent {
  componentDidMount() {
    const { fetchWorkspaces } = this.props

    fetchWorkspaces({ status: Common.status.WorkspaceStatus.ACTIVE })
  }
  render() {
    const {
      intl,
      workspaces,
      enableField = true,
      value,
      onChange,
      ...props
    } = this.props

    let workspaceIds = workspaces.reduce(
      (wsIds, workspace) => {
        wsIds.push({ label: workspace.code, value: workspace._id })
        return wsIds
      },
      [{ label: '', value: '' }]
    )
    const AdditionalProps = {}
    const Comp = enableField ? FormDropdown : CommonDropdown

    if (!enableField) {
      AdditionalProps.onChange = (opt) => onChange(opt ? opt.value : '')
      AdditionalProps.value = workspaceIds.find(
        (opt) => opt.value === value
      ) || {
        value: ''
      }
    }

    return (
      <Comp
        name="workspace"
        intl={intl}
        label={intl.formatMessage({ id: 'display_user_workspace' })}
        placeholder={intl.formatMessage({ id: 'display_user_workspace' })}
        options={workspaceIds}
        {...AdditionalProps}
        {...props}
      />
    )
  }
}

const mapStateToProps = (state, { input }) => ({
  workspaces: getAllWorkspace(state)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchWorkspaces: WorkspaceActions.getAllWorkspace
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(WorkspaceDropdown))
