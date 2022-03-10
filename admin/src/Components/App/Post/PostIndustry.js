import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { useQuery, useMutation, useInfiniteQuery } from 'react-query'
import common from '@golpasal/common'

import { ErrorMessage } from '../../Form/Errors'
import FieldContainer from '../../Form/FieldContainer'
import { FieldLabel } from '../../Form/form.styled'
import api from '../../../Services/APIServices/CategoryService'

const { CategoryType } = common.type

const Option = Select.Option

const generateOption = function (selects) {
  const children = []

  for (const select of selects) {
    children.push(
      <Option key={select._id} value={select._id}>
        {select.name.en}
      </Option>
    )
  }
  return children
}

const PostIndustry = ({
  isUpdateForm,
  input,
  label,
  meta: { touched, error, warning }
}) => {
  const [pageNumber, setPageNumber] = useState(null)
  const {
    isLoading,
    error: errorIndustries,
    data
  } = useQuery(
    ['industries'],
    () =>
      api.getCategories({
        types: [CategoryType.INDUSTRY],
        workspaces: process.env.REACT_APP_WORKSPACE
      }),
    {}
  )
  const defaultValue = [].map((industry) => industry) // default value test later
  const children = data?.data.length ? generateOption(data.data) : []

  const handleChange = async (valueArray) => {
    // const formatVal = []
    // valueArray.forEach((v) => {
    //   const industry = data?.data.filter((t) => t === v)[0]
    //   formatVal.push((industry && { text: industry.name }) || { text: v })
    // })
    // input.onChange(formatVal)
  }

  const onSelect = async (value) => {
    if (isUpdateForm) {
      // deselect here
    }
  }

  const onDeselect = async (value) => {
    // const deletedindustry = data?.data.filter(
    //   (industry) => industry.name === value || industry === value
    // )
    // if (isUpdateForm && deletedIndustry.length > 0) {
    //   // if update form, deselect remove industry in db
    //   // const deleteIndustry = await IndustryService.deleteIndustry(deletedIndustry[0]._id);
    // }
  }

  const isMulti = false

  return (
    !isLoading && (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <div>
          {defaultValue && Array.isArray(defaultValue) && (
            <Select
              mode="single"
              size={'default'}
              defaultValue={defaultValue || []}
              placeholder={<FormattedMessage id="display_select" />}
              // onChange={handleChange}
              // onSelect={onSelect}
              onDeselect={onDeselect}
              onChange={(val) => {
                // NOTE: currently single select but on db its saved inside array
                input.onChange([val])
              }}
              onBlur={(opt) =>
                input.onBlur && input.onBlur(opt ? opt.value : '')
              }
              style={{ width: '100%' }}
              onPopupScroll={(e) => {
                e.persist()
                let target = e.target
                if (
                  target.scrollTop + target.offsetHeight ===
                  target.scrollHeight
                ) {
                  setPageNumber(Math.random() + 'random string')
                }
              }}
              dropdownRender={(menu) => (
                <React.Fragment>
                  <div onMouseDown={() => console.log('before clicked')}>
                    BEFORE
                  </div>
                  {menu}
                  <div onMouseDown={() => console.log('after clicked')}>
                    AFTER
                  </div>
                </React.Fragment>
              )}
            >
              {children}
            </Select>
          )}
          {touched &&
            ((error && <ErrorMessage>{error}</ErrorMessage>) ||
              (warning && <ErrorMessage>{warning}</ErrorMessage>))}
        </div>
      </FieldContainer>
    )
  )
}

export default (props) => {
  return <Field {...props} component={PostIndustry} />
}
