import React from 'react'
import { Field } from 'redux-form'
import Select from 'react-select'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import * as Common from '@golpasal/common'
// Comp
import FieldLabel from '../../Form/FieldLabel'

const RowWarp = styled(Row)`
  & .ant-tabs-bar {
    margin-bottom: 0px !important;
    border-bottom: none;
  }
  @media (min-width: 788px) {
    & .ant-tabs-tab {
      padding-top: 0px !important;
      padding-bottom: 8px !important;
    }
  }
`

class QueriesInputContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.input.value,
      groups: props.setGroups
    }
  }

  static defaultProps = {
    input: {
      onChange: () => true,
      onBlur: () => true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.input.value !== prevState.value) {
      return {
        value: nextProps.input.value,
        groups: nextProps.setGroups
      }
    }
    if (nextProps.setGroups !== prevState.setGroups) {
      return {
        value: nextProps.input.value,
        groups: nextProps.setGroups
      }
    }
    return null
  }

  static defaultProps = {
    input: {
      onChange: () => true,
      onBlur: () => true
    }
  }

  _onChangePeople = (value) => {
    // this.setState({ groups: value });
    const {
      input: { onChange }
    } = this.props
    const newState = { ...this.state.value, groups: [value.value] }
    this.props._setGroups(value.value)
    this.setState(newState, () => onChange(newState))
  }
  render() {
    const { intl } = this.props
    const peopleOption = Common.helpers
      .getConstants('type', 'PushNotificationScheduleToPeople', intl.locale)
      .map((peopleType) => ({
        label: peopleType.text,
        value: peopleType.value
      }))
      .filter((item) => item.value !== 'all')
    return (
      <React.Fragment>
        <RowWarp gutter={30} style={{ marginBottom: 10 }}>
          <Col span={24}>
            <FieldLabel
              style={{
                padding: '3px 0',
                display: 'inline-block',
                fontWeight: 600,
                color: '#666666',
                fontSize: '14px'
              }}
            >
              {intl.formatMessage({
                id: 'display_pushNotification_user_queries_title'
              })}
            </FieldLabel>
          </Col>
        </RowWarp>
        <React.Fragment>
          <RowWarp gutter={30} style={{ marginBottom: 10 }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Select
                placeholder={intl.formatMessage({ id: 'display_select_users' })}
                options={peopleOption}
                onChange={(value) => this._onChangePeople(value)}
                value={peopleOption.find(
                  (opt) => opt.value === this.state.groups
                )}
              />
            </Col>
          </RowWarp>
        </React.Fragment>
      </React.Fragment>
    )
  }
}

export default (props) => {
  return <Field {...props} component={QueriesInputContainer} />
}
