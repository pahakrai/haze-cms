import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import * as Common from '@golpasal/common';
import styled from 'styled-components'
import { DatePicker } from 'antd'

import moment from 'moment'
import Title from '../../Components/Common/H5'

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`
export default class CouponFilter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  }
  static defaultProps = {
    onChanged: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      createdAt: []
    }
  }

  _onChanged = () => {
    const { onChanged } = this.props
    const createdAt = this.state.createdAt.length
      ? moment(this.state.createdAt[0]).format('YYYY-MM-DD hh:mmZ') +
        ',' +
        moment(this.state.createdAt[1]).format('YYYY-MM-DD hh:mmZ')
      : ''
    onChanged({
      ...this.state,
      createdAt
    })
  }

  render() {
    const { _onChanged } = this
    const { intl } = this.props

    return (
      <div>
        <FilterLabel>{intl.formatMessage({ id: 'date' })}</FilterLabel>
        <DatePicker.RangePicker
          defaultValue={this.state.createdAt}
          onChange={(value) => {
            this.setState(
              {
                createdAt: value
              },
              _onChanged
            )
          }}
        />
      </div>
    )
  }
}
