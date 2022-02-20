import React from 'react'
import { Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { Select } from 'antd'

import { ErrorMessage } from '../../Form/Errors'

class MultiChoice extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  onSelect = (selectTags) => {
    const {
      input: { value: items = [], onChange }
    } = this.props
    onChange([...items, selectTags])
  }
  onDeselect = (selectTags) => {
    const {
      input: { value: items = [], onChange }
    } = this.props
    onChange(items ? items.filter((item) => item !== selectTags) : [''])
  }
  render() {
    const {
      meta: { touched, error },
      input,
      defaultValue,
      disabled = false,
      label,
      children,
      noLabel = false
    } = this.props

    return (
      <div>
        <label
          style={{
            padding: ' 3px 0',
            display: 'inline-block',
            fontWeight: 600,
            color: '#666666',
            fontSize: '14px'
          }}
        >
          {' '}
          {!noLabel && label}
        </label>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          value={Object.assign([], defaultValue)}
          placeholder={<FormattedMessage id="display_select" />}
          onSelect={this.onSelect}
          onBlur={input.onBlur}
          onDeselect={this.onDeselect}
          disabled={disabled}
        >
          {children}
        </Select>

        {touched && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    )
  }
}

export default (props) => {
  return <Field {...props} component={MultiChoice} />
}
