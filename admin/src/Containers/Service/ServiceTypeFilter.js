import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

// import * as Common from '@golpasal/common';
import { Select } from 'antd'
import { ServiceTypeActions } from '../../Redux/ServiceType/actions'
import { getServiceTypesByWorkspaceType } from '../../Redux/selectors'

import FilterLayout from '../../Components/Common/FilterLayout'

class ServiceStatusFilter extends React.PureComponent {
  componentDidMount() {
    const { getServiceTypesByWorkspaceType } = this.props
    getServiceTypesByWorkspaceType({})
  }

  render() {
    const { serviceTypes, intl, filterValues, onChanged } = this.props
    const typeOptions = serviceTypes.map((types) => (
      <Select.Option key={types.type} value={types.type}>
        {types.name}
      </Select.Option>
    ))

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_service_type' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          value={filterValues.types !== undefined ? filterValues.types : ''}
          onChange={(v) => onChanged({ types: v })}
        >
          <Select.Option value={''}>
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {typeOptions}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    locale: state.intl.locale,
    serviceTypes: getServiceTypesByWorkspaceType(state)
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getServiceTypesByWorkspaceType:
        ServiceTypeActions.getServiceTypesByWorkspaceType
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceStatusFilter)
)
