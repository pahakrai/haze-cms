import React, { useEffect, useState } from 'react'
import { reduxForm } from 'redux-form'
import { Row, Col } from 'react-flexa'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Tabs } from 'antd'
import { helpers as EcommCommonHelpers } from '@golpasal/common'
// util
import { isMultiLanguagePost } from '../../../Lib/util'

import { createGlobalStyle } from 'styled-components'
// import PostQueriesInput from './PostQueriesInput';
import PostTags from './PostTags'
import FormName from '../../../Constants/Form'

// import Button from '../../Common/Button';
import Title from '../../Common/Title'

import Form from '../../Form/Form'
import Errors from '../../Form/Errors'
import Uploader from '../../Form/Uploader'
import Dropdown from '../../Form/Dropdown'
import LikesModal from './LikesModal'
import PostCommentModel from '../PostComment/PostCommentModel'

import TabEditor from '../../Form/TabEditor'
import DatePicker from '../../Form/DatePicker'
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput'

// auth button
import withAuthButton from '../../../Containers/Ac/withAuthButton'
import PostIndustry from './PostIndustry'
import PostSubject from './PostSubject'
import PostRegion from './PostRegion'
import request from '../../../utils/api-utils'
import { serialize } from '../../../Services/APIServices/ServiceUtils'
import { ecommApi } from '../../../Services/APIs'
const CreateButton = withAuthButton(['Post:Create'])
const EditButton = withAuthButton(['Post:Edit'])

createGlobalStyle`
.ant-modal-content{
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0 0 0;
}
`

export const statuOptionsHash = {
  ACTIVE: true,
  INACTIVE: false
}

const statuOptions = [
  { label: <FormattedMessage id="active" />, value: true },
  { label: <FormattedMessage id="inactive" />, value: false }
]

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`

const validate = (values) => {
  const errors = {}
  const titleError = validateMTField(values.title || {}, isMultiLanguagePost)
  const snippetsError = validateMTField(
    values.snippets || {},
    isMultiLanguagePost
  )
  const contentError = validateMTField(
    values.content || {},
    isMultiLanguagePost
  )

  if (titleError) {
    errors.title = titleError
  }
  if (snippetsError) {
    errors.snippets = snippetsError
  }
  if (contentError) {
    errors.content = contentError
  }
  if (!values.type) {
    errors.type = <FormattedMessage id={'error.required'} />
  }

  return errors
}

const PostForm = ({
  intl,
  form,
  initialValues,
  onSubmitSuccess,
  submitting,
  onSubmit,
  onSubmitFail = () => true,
  postId,
  tagsDisplay,
  tags,
  fetchTagsByPostId,
  postCommentCount
}) => {
  const [activeKey, setActiveKey] = useState('1')
  const typeOptions = EcommCommonHelpers.getConstants(
    'type',
    'PostType',
    intl.locale
  ).map((PostType) => ({
    label: PostType.text,
    value: PostType.value
  }))
  const isUpdateForm = form === FormName.POST_UPDATE

  return (
    <Form
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'post.title' })}</Title>
        <Title.Right>
          {!isUpdateForm && (
            <CreateButton
              intl={intl}
              updateMode={isUpdateForm}
              disabled={submitting}
            />
          )}
          {isUpdateForm && (
            <EditButton
              intl={intl}
              updateMode={isUpdateForm}
              disabled={submitting}
            />
          )}
        </Title.Right>
      </Title.Wrapper>
      <Errors />
      <Tabs
        type="card"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        tabBarStyle={{ marginBottom: 0 }}
        style={{
          overflow: 'visible'
        }}
      >
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_base' })}
          key="1"
        >
          <FormContent>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <MultiLanguageTextInput
                  intl={intl}
                  isMultiLanguage={isMultiLanguagePost}
                  name="title"
                  label={intl.formatMessage({
                    id: 'display_post_title'
                  })}
                />
                <MultiLanguageTextInput
                  intl={intl}
                  isMultiLanguage={isMultiLanguagePost}
                  name="snippets"
                  label={intl.formatMessage({
                    id: 'display_post_snippets'
                  })}
                />
                <DatePicker
                  name="postDate"
                  label={intl.formatMessage({
                    id: 'display_post_date'
                  })}
                />
                <Dropdown
                  name="type"
                  label={intl.formatMessage({ id: 'display_post_type' })}
                  options={typeOptions}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <Dropdown
                  name="isActive"
                  label={intl.formatMessage({
                    id: 'display_post_status'
                  })}
                  options={statuOptions}
                />
                <PostTags
                  name="tags"
                  label="Tags"
                  tags={tags}
                  tagsDisplay={tagsDisplay}
                  postId={postId}
                  isUpdateForm={isUpdateForm}
                  fetchTagsByPostId={fetchTagsByPostId}
                />
                <PostIndustry
                  name="industries"
                  label="Industry"
                  postId={postId}
                  isUpdateForm={isUpdateForm}
                />
                <PostSubject
                  name="subjects"
                  label="Subject"
                  postId={postId}
                  isUpdateForm={isUpdateForm}
                />
                <PostRegion
                  name="regions"
                  label="Region"
                  postId={postId}
                  isUpdateForm={isUpdateForm}
                />
                <Dropdown
                  isMulti
                  label={intl.formatMessage({
                    id: 'display_platform_types'
                  })}
                  name="platformTypes"
                  options={EcommCommonHelpers.getConstants(
                    'type',
                    'PlatformType',
                    intl.locale
                  ).map((status) => ({
                    label: status.text,
                    value: status.value
                  }))}
                />
                <LikesModal likes={initialValues.likes || []} intl={intl} />
                <PostCommentModel
                  isUpdateForm={isUpdateForm}
                  postId={initialValues._id}
                  postCommentCount={postCommentCount}
                  intl={intl}
                />
              </Col>
            </Row>
            <TabEditor
              label={intl.formatMessage({
                id: 'display_post_content'
              })}
              name="content"
              intl={intl}
              isMultiLanguage={isMultiLanguagePost}
            />
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_image' })}
          key="2"
        >
          <FormContent>
            <Uploader
              intl={intl}
              uploadReview
              multiple
              name="images"
              label={`${intl.formatMessage({ id: 'label_images' })}`}
            />
          </FormContent>
        </Tabs.TabPane>
      </Tabs>
    </Form>
  )
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(PostForm)
