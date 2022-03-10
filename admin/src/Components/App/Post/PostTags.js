import React from 'react'
import { Select } from 'antd'
import { Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'

import { ErrorMessage } from '../../Form/Errors'
import { FieldLabel } from '../../Form/form.styled'
import FieldContainer from '../../Form/FieldContainer'

// import TagService from '../../../Services/APIServices/TagService';

const Option = Select.Option

const generateOption = function (selects) {
  const children = []

  for (const select of selects) {
    children.push(<Option key={select}>{select}</Option>)
  }
  return children
}

class PostTags extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      tags,
      // postId,
      isUpdateForm,
      input,
      label,
      tagsDisplay,
      //fetchTagsByPostId,
      meta: { touched, error, warning }
    } = this.props
    //fetchTagsByPostId(postId);
    const children = generateOption(tags)
    const defaultValue = tagsDisplay.map((tag) => tag)
    async function handleChange(valueArray) {
      const formatVal = []
      valueArray.forEach((v) => {
        const tag = tags.filter((t) => t === v)[0]
        formatVal.push((tag && { text: tag }) || { text: v })
      })
      input.onChange(formatVal)
    }

    async function onSelect(value) {
      if (isUpdateForm) {
        // const createNewTag = await TagService.createTag({
        //   post: postId,
        //   text: value
        // });
      }
    }

    async function onDeselect(value) {
      const deletedTag = tags.filter(
        (tag) => tag.text === value || tag === value
      )
      if (isUpdateForm && deletedTag.length > 0) {
        // if update form, deselect remove tag in db
        // const deleteTag = await TagService.deleteTag(deletedTag[0]._id);
      }
    }

    return (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <div>
          {defaultValue && Array.isArray(defaultValue) && (
            <Select
              mode="tags"
              size={'default'}
              defaultValue={defaultValue || []}
              placeholder={<FormattedMessage id="display_select" />}
              onChange={handleChange}
              onSelect={onSelect}
              onDeselect={onDeselect}
              style={{ width: '100%' }}
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
  }
}

export default (props) => {
  return <Field {...props} component={PostTags} />
}
