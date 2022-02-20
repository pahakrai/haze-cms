import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Collapse, DatePicker, Row, Col, Select } from 'antd'
import { withRouter } from 'react-router-dom'
import Common from '@golpasal/common'
import Title from '../../Components/Common/H5'
import Button from '../../Components/Common/Button'
import { UserActions } from '../../Redux/User/actions'
import { MemberActions } from '../../Redux/Member/actions'
import { FilterActions } from '../../Redux/Filter/actions'
import FilterLayout from '../../Components/Common/FilterLayout'
import TextInput from '../../Components/Common/TextInput'
import { filterTimeRangeFormat } from '../../Lib/util'
const { UserType } = Common.type
const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`
const Spacer10 = styled.div`
  height: 10px;
`
const SearchButton = styled(Button.Primary)`
  margin: 0px !important;
`

class UserSearchContainer extends React.PureComponent {
  onSearchTermChanged(searchTerm) {
    // const { getUsers, userType } = this.props;
    // const query = { q: searchTerm, userType };
    // getUsers({ q: query, refresh: true });
    const { setSearchTerm } = this.props
    setSearchTerm(searchTerm)
  }

  _onSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      this._onClickSearch()
    }
  }

  _onChanged = (value) => {
    const { setFilterOptions } = this.props
    setFilterOptions('isHandleBy', value)
  }

  _onClickSearch = () => {
    const { userFilters, getUsers, getMembers, setSelected } = this.props
    const { userType, ...userFilterRes } = userFilters || {}
    setSelected()

    if (userType === UserType.MEMBER) {
      getMembers({
        query: {
          ...userFilterRes
        },
        refresh: true
      })
    } else {
      getUsers({
        q: {
          ...userFilterRes,
          userTypes: [userType]
        },
        refresh: true
      })
    }
  }

  _handleFilterChange = (value) => {
    const { setFilterOptions } = this.props
    if (value) {
      const [startTime, endTime] = filterTimeRangeFormat(value[0], value[1])

      setFilterOptions('createdAtFr', startTime)
      setFilterOptions('createdAtTo', endTime)
    } else {
      setFilterOptions('createdAtFr', undefined)
      setFilterOptions('createdAtTo', undefined)
    }
  }
  render() {
    const {
      intl,
      userFilters = {
        isHandleBy: null,
        createdAtFr: null,
        createdAtTo: null,
        checkbox: null
      },
      userType
    } = this.props
    return (
      <div>
        <Row gutter={10}>
          <Col xs={24} sm={16} md={16} lg={24} xl={15} xxl={16}>
            <TextInput
              value={userFilters.q}
              onKeyDown={this._onSearchKeyDown}
              style={{ marginBottom: 10 }}
              placeholder={intl.formatMessage({ id: 'search_placeholder' })}
              onChange={this.onSearchTermChanged.bind(this)}
            />
          </Col>
          <Col xs={24} sm={6} md={6} lg={24} xl={8} xxl={6}>
            <SearchButton onClick={this._onClickSearch}>
              {intl.formatMessage({ id: 'search' })}
            </SearchButton>
          </Col>
        </Row>
        <Row>
          <Col xs={24} span={8}>
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              style={{ backgroundColor: '#fff' }}
            >
              <Collapse.Panel
                header={intl.formatMessage({ id: 'advance_filter' })}
                key="1"
              >
                <FilterLabel>
                  {intl.formatMessage({ id: 'create_time' })}
                </FilterLabel>
                <DatePicker.RangePicker
                  value={[
                    userFilters.createdAtFr
                      ? moment(userFilters.createdAtFr)
                      : null,
                    userFilters.createdAtTo
                      ? moment(userFilters.createdAtTo)
                      : null
                  ]}
                  onChange={this._handleFilterChange}
                />
                <Spacer10 />
                {userType === UserType.MEMBER && (
                  <div>
                    <FilterLabel>
                      {intl.formatMessage({
                        id: 'display_is_member_handle_by'
                      })}
                    </FilterLabel>
                    <FilterLayout.FilterRow>
                      <Select
                        style={{ flex: 1 }}
                        value={
                          userFilters.isHandleBy !== undefined
                            ? userFilters.isHandleBy
                            : ''
                        }
                        allowClear={true}
                        onChange={(v) => this._onChanged(v)}
                      >
                        <Select.Option value="true">
                          {intl.formatMessage({ id: 'display_yes' })}
                        </Select.Option>
                        <Select.Option value="false">
                          {intl.formatMessage({ id: 'display_no' })}
                        </Select.Option>
                      </Select>
                    </FilterLayout.FilterRow>
                    <Spacer10 />
                  </div>
                )}
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userFilters: state.filter.user
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUsers: UserActions.getUsers,
      getMembers: MemberActions.getMembers,
      getMemberById: MemberActions.getMemberById,
      setSelected: UserActions.setSelected,
      setFilterOptions: (field, value) =>
        FilterActions.updateFilterField('user', field, value),
      setSearchTerm: (value) =>
        FilterActions.updateFilterField('user', 'q', value)
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSearchContainer)
)
