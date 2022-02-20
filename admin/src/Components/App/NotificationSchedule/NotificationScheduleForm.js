import React from 'react'
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexa'
import { Tabs } from 'antd'
import styled from 'styled-components'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'

import { isMultiLanguagePost } from '../../../Lib/util'

import Button from '../../Common/Button'
import Dropdown from '../../Form/Dropdown'
import Form from '../../Form/Form'
import Title from '../../Common/Title'
import Uploader, { UPLOAD_ACCEPT_TYPE } from '../../Form/Uploader'
import FormName from '../../../Constants/Form'
import QueriesInput from './QueriesInput'
import NotificationScheduleTime from './NotificationScheduleTime'
import ScreenParametersInput from './ScreenParametersInput'
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput'

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`

const validate = (values) => {
  let newError = {
    notification: {
      data: {}
    }
  }
  if (values.notification) {
    // values.title
    const titleError = validateMTField(
      values.notification.title || {},
      isMultiLanguagePost
    )
    const bodyError = validateMTField(
      values.notification.body || {},
      isMultiLanguagePost
    )
    if (bodyError) {
      newError.notification.body = bodyError
    }
    if (titleError) newError.notification.title = titleError
    // screen
    if (!values.notification.data.screen) {
      newError.notification.data.screen = (
        <FormattedMessage id={'error.required'} />
      )
    }
    if (
      values.notification.data.screen === 'post' &&
      !Object.keys(values.notification.data.parameters).length
    ) {
      newError.notification.data.parameters = (
        <FormattedMessage id={'error.required'} />
      )
    }
  }
  let flag = false
  Object.keys(newError).forEach((item) => {
    Object.keys(newError[item]).forEach((items) => {
      if (Object.keys(newError[item][items]).length > 0) {
        flag = true
      }
    })
  })
  if (!flag) {
    newError = {}
  }
  return newError && Object.keys(newError).length ? newError : null
}

class NotificationScheduleForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
  }

  render() {
    const {
      // locale,
      // invalid,
      // submitting,
      // _onChangetargetStatus,
      // pristine,
      // canUpdate,
      // updateMode,
      // queriesInputProps = {},
      intl,
      onSubmit,
      form,
      initialValues,
      onSubmitSuccess,
      mobileURINavigationOptions,
      clientOptions,
      driverOptions,
      screenParametersOption,
      // notification,
      notificationMediaType,
      emailTemplates,
      _setGroups,
      setGroups,
      onSubmitFail = () => true
    } = this.props

    let notification = initialValues.notification
    const isUpdateForm = form === FormName.PUSH_NOTIFICATION_SCHEDULE_UPDATE
    const statusOptions = EcommCommonHelpers.getConstants(
      'status',
      'NotificationScheduleStatus',
      intl.locale
    ).map((status) => ({
      label: status.text,
      value: status.value
    }))
    const notificationMediaTypeOptions = EcommCommonHelpers.getConstants(
      'type',
      'NotificationMediaType',
      intl.locale
    )
      .map((notificationMediaTypeDataItem) => ({
        label: notificationMediaTypeDataItem.text,
        value: notificationMediaTypeDataItem.value
      }))
      .filter(
        (items) =>
          items.value ===
          process.env.REACT_APP_NOTIFICATION_SCHEDULE_MEDIA_TYPES
      )

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Title.Wrapper>
          <Title>
            {intl.formatMessage({ id: 'nav.notificationSchedule' })}
          </Title>
          <Title.Right>
            {!isUpdateForm && (
              <Button.Primary
                // disabled={(updateMode && !canUpdate) || submitting}
                type="submit"
              >
                {isUpdateForm
                  ? intl.formatMessage({
                      id: 'update_btn'
                    })
                  : intl.formatMessage({
                      id: 'create_btn'
                    })}
              </Button.Primary>
            )}
          </Title.Right>
        </Title.Wrapper>
        <Tabs
          type="card"
          activeKey={this.state.activeKey}
          onChange={(key) => this.setState({ activeKey: key })}
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
                <Col xs={24} sm={12} md={12}>
                  <QueriesInput
                    name="to"
                    intl={intl}
                    setGroups={setGroups}
                    _setGroups={_setGroups}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Dropdown
                    disabled={
                      process.env
                        .REACT_APP_PUSH_NOTIFICATION_SCHEDULE_TO_CONFIGURABLE ===
                      'true'
                    }
                    name="notificationMediaType"
                    label={intl.formatMessage({
                      id: 'display_pushnotificationschedule_notificationMediaType'
                    })}
                    options={notificationMediaTypeOptions}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <Dropdown
                    disabled
                    name="status"
                    label={intl.formatMessage({
                      id: 'display_pushnotificationschedule_status'
                    })}
                    options={statusOptions}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <MultiLanguageTextInput
                    horizontal
                    name="notification.title"
                    intl={intl}
                    isMultiLanguage={true}
                    placeholder={intl.formatMessage({
                      id: 'display_notificationschedule_title_is_required'
                    })}
                    label={intl.formatMessage({
                      id: 'display_page_title'
                    })}
                  />
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <MultiLanguageTextInput
                    horizontal
                    name="notification.body"
                    rows="true"
                    intl={intl}
                    isMultiLanguage={true}
                    placeholder={intl.formatMessage({
                      id: 'display_notificationschedule_content_is_required'
                    })}
                    label={intl.formatMessage({
                      id: 'display_message_body'
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} sm={24}>
                  <ScreenParametersInput
                    intl={intl}
                    name="notification.data"
                    screenOption={screenParametersOption}
                    selectOptions={mobileURINavigationOptions}
                    clientOptions={clientOptions}
                    driverOptions={driverOptions}
                    setGroups={setGroups}
                    notification={notification}
                    notificationMediaType={notificationMediaType}
                    emailTemplates={emailTemplates}
                    screenPlaceholder={intl.formatMessage({
                      id: 'display_select'
                    })}
                    parametersLabel={`${intl.formatMessage({
                      id: 'display_pushnotificationschedule_parameters'
                    })}`}
                  />
                </Col>
              </Row>
              <NotificationScheduleTime name="notificationTime" intl={intl} />
            </FormContent>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'tab_workspace_form_image' })}
            key="2"
          >
            <FormContent>
              <Uploader
                intl={intl}
                disabled={
                  notificationMediaType ===
                  Common.type.NotificationMediaType.EMAIL
                }
                accept={UPLOAD_ACCEPT_TYPE.IMAGE}
                multiple
                name="notification.images"
                label={intl.formatMessage({ id: 'label_images' })}
              />
            </FormContent>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    )
  }
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
  // asyncValidate,
  // asyncBlurFields: ['code']
})(NotificationScheduleForm)
