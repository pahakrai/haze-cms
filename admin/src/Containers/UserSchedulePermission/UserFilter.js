import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Common from '@golpasal/common'

import { Select } from 'antd'
import { withRouter } from 'react-router'

import FilterLayout from '../../Components/Common/FilterLayout'

import { UserActions } from '../../Redux/User/actions'
import { getSearchUsers } from '../../Redux/selectors'

class UserFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  }
  static defaultProps = {
    onChanged: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { searchUsers } = this.props
    searchUsers('', {
      userTypes: [Common.type.UserType.USER]
    })
  }

  render() {
    const { intl, onChanged, users } = this.props
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_user' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue={''}
          onChange={(user) =>
            onChanged({
              ...this.state,
              user: user === '' ? undefined : user
            })
          }
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {users &&
            users.map((user) => {
              return (
                <Select.Option key={user._id} value={user._id}>
                  {user.username}
                </Select.Option>
              )
            })}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: getSearchUsers(state)
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchUsers: UserActions.searchUsers
    },
    dispatch
  )

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserFilter)
)
