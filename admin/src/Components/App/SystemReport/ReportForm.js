import React from 'react'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { helpers as EcommCommonHelpers } from '@golpasal/common'
import { Row, Col } from 'react-flexa'
import { Select } from 'antd'

import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Card from '../../../Components/Common/Card'
import Errors from '../../Form/Errors'
import Form from '../../Form/Form'
import MultiLanguageTextInput from '../../Form/MultiLanguageTextInput'
import FormName from '../../../Constants/Form'

import MultiChoice from './MultiChoice'

const { Option } = Select

const validate = (values) => {
  const errors = {}
  if (!values.workspaceTypes || values.workspaceTypes.length === 0) {
    errors.workspaceTypes = <FormattedMessage id={'error.required'} />
  }

  if (!values.workspaces || values.workspaces.length === 0) {
    errors.workspaces = <FormattedMessage id={'error.required'} />
  }
  return errors
}

class ReportForm extends React.PureComponent {
  renderButtons() {
    const { intl, invalid, pristine, submitting } = this.props
    if (this.props.form === FormName.REPORT_UPDATE) {
      return (
        <Button.Primary disabled={pristine || submitting} type="submit">
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      )
    }
    return (
      <Button.Primary disabled={invalid || submitting} type="submit">
        {intl.formatMessage({
          id: 'add'
        })}
      </Button.Primary>
    )
  }

  render() {
    const {
      intl,
      formValueWorkspaceTypes,
      formValueWorkspaces,
      workspaces,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props
    const workspaceTypeOption = EcommCommonHelpers.getConstants(
      'type',
      'WorkspaceType',
      intl.locale
    ).map((workspaceType) => (
      <Option key={workspaceType.value}>{workspaceType.text}</Option>
    ))

    const workspaceOptions = workspaces.map((workspace) => (
      <Option key={workspace._id}>{workspace.name}</Option>
    ))

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.reports' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>

        <Card>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <MultiLanguageTextInput
                intl={intl}
                name="name"
                label={intl.formatMessage({
                  id: 'display_reportName'
                })}
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <MultiChoice
                intl={intl}
                name="workspaceTypes"
                defaultValue={formValueWorkspaceTypes}
                label={intl.formatMessage({
                  id: 'display_report_workspace_types'
                })}
              >
                {workspaceTypeOption}
              </MultiChoice>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <MultiChoice
                intl={intl}
                name="workspaces"
                defaultValue={formValueWorkspaces}
                label={intl.formatMessage({
                  id: 'display_report_workspaces'
                })}
              >
                {workspaceOptions}
              </MultiChoice>
            </Col>
          </Row>
        </Card>
      </Form>
    )
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(ReportForm)
