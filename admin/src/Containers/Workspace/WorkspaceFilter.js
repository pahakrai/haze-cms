import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import Common from '@golpasal/common'

import H5 from '../../Components/Common/H5'
import Select from '../../Components/Common/Select'

import { WorkspaceActions } from '../../Redux/Workspace/actions'
import { getWorkspaces } from '../../Redux/selectors'
import { getCurrentUser } from '../../Redux/Account/selectors'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 300px;
  line-height: normal;
`
const FilterLabel = styled(H5)`
  margin-right: 1em;
  margin-left: 1em;
  margin-top: auto;
  margin-bottom: auto;
`

class WorkspaceFilter extends React.PureComponent {
  static defaultProps = {
    defaultWorkspace: '', // workspaceId
    onChange: (workspaceId) => {}
  }

  componentDidMount() {
    const { fetchWorkspaces, workspaces } = this.props
    if (!workspaces.length) {
      fetchWorkspaces()
    }
  }

  onWorkspaceChange = ({ value }) => {
    const { onChange } = this.props
    if (onChange) onChange(value)
  }

  render() {
    const { intl, defaultWorkspace, workspaces, currentUser } = this.props
    const isProvider =
      currentUser && currentUser.userType === Common.type.UserType.PROVIDER
    const workspaceOptions = [
      { label: intl.formatMessage({ id: 'all' }), value: '' },
      ...(Array.isArray(workspaces) ? workspaces : []).map((workspace) => ({
        value: workspace._id,
        label: workspace.name[intl.locale]
      }))
    ]
    return (
      isProvider && (
        <Container>
          <FilterLabel>
            {intl.formatMessage({ id: 'display_workspace_name' })}
          </FilterLabel>
          <div style={{ flex: 1, width: '100%' }}>
            <Select
              options={workspaceOptions}
              onChange={this.onWorkspaceChange}
              defaultValue={
                (defaultWorkspace &&
                  workspaceOptions.find((w) => w.value === defaultWorkspace)) ||
                workspaceOptions[0]
              }
            />
          </div>
        </Container>
      )
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  workspaces: getWorkspaces(state),
  currentUser: getCurrentUser(state)
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchWorkspaces: WorkspaceActions.getWorkspaces
    },
    dispatch
  )
export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(WorkspaceFilter)
)
