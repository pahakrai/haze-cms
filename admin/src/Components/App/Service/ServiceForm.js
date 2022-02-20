import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { Tabs } from 'antd'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexa'
import Common, { helpers } from '@golpasal/common'
import { helpers as EcommCommonHelpers } from '@golpasal/common'

import { isMultiLanguageService } from '../../../Lib/util'
import CategoryDropdown from '../../../Containers/Form/CategoryDropdown'

import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Errors from '../../Form/Errors'
import Form from '../../Form/Form'
import FormName from '../../../Constants/Form'
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput'
import Dropdown from '../../Form/Dropdown'
import TextInput from '../../Form/TextInput'
import Checkbox from '../../Form/Checkbox'
import Uploader from '../../Form/Uploader'
import SelectServiceType from '../../../Containers/Form/SelectServiceType'

const FormContent = styled.div`
  padding: 20px 30px 100px;
  background-color: #fff;
  border-radius: 5px;
`

const validate = (values) => {
  const errors = {}
  const required = <FormattedMessage id={'error.required'} />
  const { name, type, unit, unitMeta, _category } = values
  const nameError = validateMTField(name || {}, isMultiLanguageService)

  if (nameError) {
    errors.name = nameError
  }

  let unitMetaErrors = {}
  if (!type) {
    errors.type = required
  }

  if (!_category) {
    errors._category = required
  }

  if (!unit) {
    errors.unit = required
  }

  if (!unitMeta || !unitMeta.max) {
    if (unit !== Common.unit.ServiceUnit.BOOLEAN) {
      unitMetaErrors.max = required
    }
  }

  if (!unitMeta || !unitMeta.min) {
    if (unit !== Common.unit.ServiceUnit.BOOLEAN) {
      unitMetaErrors.min = required
    }
  }

  if (
    !unitMeta ||
    (!unitMeta.interval && unit === Common.unit.ServiceUnit.NUMBER)
  ) {
    unitMetaErrors.interval = required
  }
  if (
    !unitMeta ||
    (!unitMeta.default && unit === Common.unit.ServiceUnit.NUMBER)
  ) {
    unitMetaErrors.default = required
  }

  if (unitMeta) {
    if (unitMeta.max && unitMeta.min) {
      if (parseInt(unitMeta.max) < parseInt(unitMeta.min)) {
        unitMetaErrors.max = <FormattedMessage id={'error.min_than_max'} />
      }
    }
    if (unitMeta.max && unitMeta.interval) {
      if (parseInt(unitMeta.max) < parseInt(unitMeta.interval)) {
        unitMetaErrors.interval = (
          <FormattedMessage id={'error.interval_cannot_than_max'} />
        )
      }
    }
    if (parseInt(unitMeta.max) < 0) {
      unitMetaErrors.max = <FormattedMessage id={'error.max_cannot_zero'} />
    }

    if (parseInt(unitMeta.min) < 0) {
      unitMetaErrors.min = <FormattedMessage id={'error.min_cannot_zero'} />
    }
    if (unit === Common.unit.ServiceUnit.NUMBER) {
      if (parseInt(unitMeta.default) < parseInt(unitMeta.min)) {
        unitMetaErrors.default = (
          <FormattedMessage id={'error.default_cannot_less_min'} />
        )
      }
      if (parseInt(unitMeta.default) > parseInt(unitMeta.max)) {
        unitMetaErrors.default = (
          <FormattedMessage id={'error.default_cannot_greater_max'} />
        )
      }
    }
  }
  if (Object.keys(unitMetaErrors).length !== 0) errors.unitMeta = unitMetaErrors
  return errors
}

class ServiceForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  }

  renderButtons() {
    const { intl, pristine, submitting } = this.props

    if (this.props.form === FormName.SERVICE_UPDATE) {
      return (
        <Button.Primary disabled={pristine || submitting} type="submit">
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      )
    }
    return (
      <Button.Primary disabled={submitting} type="submit">
        {intl.formatMessage({
          id: 'add'
        })}
      </Button.Primary>
    )
  }

  render() {
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      currentWorkspace,
      initialValues,
      formValueUnit,
      formValueType,
      formValueUnitMetaDefault
    } = this.props
    const inputContent = (
      <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_service_base' })}
          key="1"
        >
          <FormContent>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <MultiLanguageTextInput
                  intl={intl}
                  isMultiLanguage={isMultiLanguageService}
                  name="name"
                  label={intl.formatMessage({
                    id: 'display_service_name'
                  })}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  label={intl.formatMessage({
                    id: 'display_is_active'
                  })}
                  name="isActive"
                  options={[
                    {
                      label: intl.formatMessage({ id: 'display_active' }),
                      value: true
                    },
                    {
                      label: intl.formatMessage({ id: 'display_inactive' }),
                      value: false
                    }
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <MultiLanguageTextInput
                  intl={intl}
                  isMultiLanguage={isMultiLanguageService}
                  name="description"
                  rows={4}
                  label={intl.formatMessage({
                    id: 'display_service_description'
                  })}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  name="alias"
                  label={intl.formatMessage({
                    id: 'display_alias'
                  })}
                  intl={intl}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <CategoryDropdown
                  name="_category"
                  label={intl.formatMessage({
                    id: 'display_service_category'
                  })}
                  intl={intl}
                  multiple={false}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
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
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <SelectServiceType
                  multiple={false}
                  name="type"
                  intl={intl}
                  formValueType={formValueType}
                  defaultValue={initialValues.type}
                />
                {/* {formValueType && (
                  <Dropdown
                    label={intl.formatMessage({
                      id: 'display_service_type'
                    })}
                    name="type"
                    options={formValueType.map(item => ({
                      label: item.name,
                      value: item.name
                    }))}
                  />
                )} */}
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  label={intl.formatMessage({
                    id: 'display_service_unit'
                  })}
                  name="unit"
                  options={helpers
                    .getConstants('unit', 'ServiceUnit', intl.locale)
                    .map((item) => ({
                      label: item.text,
                      value: item.value
                    }))}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3}>
                <Checkbox
                  name="isConfigurable"
                  label={intl.formatMessage({
                    id: 'display_isConfigurable'
                  })}
                />
              </Col>
              <Col xs={12} sm={3} md={3} lg={3}>
                <Checkbox
                  name="isMatchCriteria"
                  label={intl.formatMessage({
                    id: 'display_isMatchCriteria'
                  })}
                />
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Checkbox
                  name="isUserInfo"
                  label={intl.formatMessage({
                    id: 'display_isUserInfo'
                  })}
                />
              </Col>
            </Row>
            <Row>
              {formValueUnit !== Common.unit.ServiceUnit.BOOLEAN && (
                <Col xs={12} sm={3} md={3} lg={3}>
                  <TextInput
                    name="unitMeta.min"
                    type="number"
                    label={intl.formatMessage({
                      id: 'display_service_unit_min'
                    })}
                  />
                </Col>
              )}

              {formValueUnit !== Common.unit.ServiceUnit.BOOLEAN && (
                <Col xs={12} sm={3} md={3} lg={3}>
                  <TextInput
                    name="unitMeta.max"
                    type="number"
                    label={intl.formatMessage({
                      id: 'display_service_unit_max'
                    })}
                  />
                </Col>
              )}
              <div style={{ visibility: 'hidden', width: 0 }}>
                <TextInput name="unitMeta.interval" />
                <TextInput name="unitMeta.default" />
              </div>
              {formValueUnit === Common.unit.ServiceUnit.NUMBER && (
                <Col xs={12} sm={3} md={3} lg={3}>
                  <TextInput
                    name="unitMeta.interval"
                    type="number"
                    label={intl.formatMessage({
                      id: 'display_service_unit_interval'
                    })}
                  />
                </Col>
              )}
              {formValueUnit === Common.unit.ServiceUnit.NUMBER && (
                <Col xs={12} sm={3} md={3} lg={3}>
                  <TextInput
                    name="unitMeta.default"
                    type="number"
                    label={intl.formatMessage({
                      id: 'display_service_unit_default'
                    })}
                  />
                </Col>
              )}
              {formValueUnit === Common.unit.ServiceUnit.BOOLEAN && (
                <Col xs={12} sm={3} md={3} lg={3}>
                  <Checkbox
                    name="unitMeta.default"
                    label={intl.formatMessage({
                      id: 'display_service_unit_default'
                    })}
                    checked={formValueUnitMetaDefault}
                  />
                </Col>
              )}
              <div style={{ visibility: 'hidden' }}>
                <TextInput name="icon" />
              </div>
            </Row>
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({
            id: 'tab_service_image'
          })}
          key="2"
        >
          <FormContent>
            <Uploader
              intl={intl}
              name="icon"
              label={`${intl.formatMessage({
                id: 'label_images'
              })}`}
            />
          </FormContent>
        </Tabs.TabPane>
      </Tabs>
    )
    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>
            {intl.formatMessage({
              id:
                currentWorkspace.type === Common.type.WorkspaceType.EDUCATION ||
                currentWorkspace.type === Common.type.WorkspaceType.JOBHUNTING
                  ? 'nav.skills'
                  : 'nav.service'
            })}
          </Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        {inputContent}
      </Form>
    )
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(ServiceForm)
