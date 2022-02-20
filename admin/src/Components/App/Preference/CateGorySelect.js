import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Select } from 'antd'
import Common from '@golpasal/common'

import { ErrorMessage } from '../../Form/Errors'

const { WorkspaceType } = Common.type

const { Option } = Select

const Label = styled.div`
  padding: 3px 0;
  display: inline-block;
  font-eight: 600;
  color: #666666;
  font-size: 14px;
`

const CategorySelect = ({
  intl,
  categories,
  defaultValue,
  noLabel,
  disabled,
  currentWorkspace,
  input,
  meta: { touched, error },
  input: { value, onChange, name }
}) => {
  const items = value && value.length > 0 ? value : []
  const onSelect = (selectTags) => {
    onChange([...items, selectTags])
  }
  const onDeselect = (selectTags) => {
    onChange(items ? items.filter((item) => item !== selectTags) : [''])
  }
  return (
    <div style={{ marginBottom: 20 }}>
      {!noLabel && (
        <Label>
          {currentWorkspace.type === WorkspaceType.JOBHUNTING
            ? intl.formatMessage({ id: 'display_preference_industry' })
            : intl.formatMessage({ id: 'display_preference_category' })}
        </Label>
      )}
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={defaultValue ? Object.assign([], defaultValue) : []}
        placeholder={<FormattedMessage id="display_select" />}
        onSelect={onSelect}
        onDeselect={onDeselect}
        disabled={disabled}
      >
        {categories.length > 0
          ? categories.map((v) => (
              <Option key={v._id}>{v.name[intl.locale]}</Option>
            ))
          : []}
      </Select>

      {touched && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

export default (props) => {
  return <Field {...props} component={CategorySelect} />
}
