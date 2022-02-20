import React, { PureComponent } from 'react'
import Select from 'antd/lib/select'
import PropTypes from 'prop-types'
import { helpers as EcommCommonHelpers } from '@golpasal/common'

import FilterLayout from '../../Components/Common/FilterLayout'

export default class Filter extends PureComponent {
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
  render() {
    const { intl, onChanged } = this.props

    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'display_platform_types' })}:{' '}
        </FilterLayout.FilterLabel>
        <Select
          style={{ flex: 1 }}
          defaultValue=""
          onChange={(v) => {
            onChanged({
              ...this.state,
              platformTypes: v === '' ? undefined : [v]
            })
          }}
        >
          <Select.Option value="">
            {intl.formatMessage({ id: 'all' })}
          </Select.Option>
          {EcommCommonHelpers.getConstants(
            'type',
            'PlatformType',
            intl.locale
          ).map((v, idx) => (
            <Select.Option key={idx} value={v.value}>
              {v.text}
            </Select.Option>
          ))}
        </Select>
      </FilterLayout.FilterRow>
    )
  }
}
