import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexa'
import Common, { helpers } from '@golpasal/common'

import Button from '../../Common/Button'
import Title from '../../Common/Title'

import Errors from '../../Form/Errors'
import Form from '../../Form/Form'
import Dropdown from '../../Form/Dropdown'
import Switch from '../../Form/Switch'
import TextInput from '../../Form/TextInput'
import SelectAddress from '../../../Containers/Form/SelectAddress'

import CateGorySelect from './CateGorySelect'
import TagSelect from './TagSelect'
import EmploymentTypeSelect from './EmploymentTypeSelect'
import { UnitSelect } from './UnitSelect'

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const validate = (values, { currentWorkspace }) => {
  const errors = {}
  const required = <FormattedMessage id={'error.required'} />
  if (!values.categories || values.categories.length === 0) {
    errors.categories = required
  }

  if (
    !values.locations ||
    !values.locations.properties ||
    !values.locations.properties.district
  ) {
    errors.locations = required
  }

  if (currentWorkspace.type === Common.type.WorkspaceType.JOBHUNTING) {
    if (!values.employmentTypes || values.employmentTypes.length === 0) {
      errors.employmentTypes = required
    }
    if (values.wage) {
      if (!values.wage.unit) {
        errors.wage = errors.wage || {}
        errors.wage.unit = required
      }
      if (!values.wage.max) {
        errors.wage = errors.wage || {}
        errors.wage.max = required
      }
      if (!values.wage.min) {
        errors.wage = errors.wage || {}
        errors.wage.min = required
      }
      if (
        values.wage.min &&
        values.wage.max &&
        parseInt(values.wage.max) < parseInt(values.wage.min)
      ) {
        errors.wage = errors.wage || {}
        errors.wage.min = <FormattedMessage id={'error.min_than_max'} />
      }
    } else {
      errors.wage = errors.wage || {}
      errors.wage.unit = required
      errors.wage.max = required
      errors.wage.min = required
    }
  }

  return errors
}

class PreferenceForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  }

  renderButtons() {
    const { intl, pristine, submitting, updateMode } = this.props

    if (updateMode) {
      return (
        <ButtonWrapper>
          <Button.Primary disabled={pristine || submitting} type="submit">
            {intl.formatMessage({
              id: 'update_btn'
            })}
          </Button.Primary>
        </ButtonWrapper>
      )
    }
    return (
      <ButtonWrapper>
        <Button.Primary disabled={submitting} type="submit">
          {intl.formatMessage({
            id: 'create_btn'
          })}
        </Button.Primary>
      </ButtonWrapper>
    )
  }

  render() {
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      displaySubmitButtons,
      categories,
      tagRecommendations,
      noTitle,
      formValueCategory,
      formValueEmploymentType,
      formValueTag,
      formValueUnit,
      currencies,
      currentWorkspace
    } = this.props

    const employmentType = helpers.getConstants(
      'type',
      'EmploymentType',
      intl.locale
    )

    let CurrenciesOption = []
    if (currencies) {
      currencies.forEach((currency) => {
        CurrenciesOption.push({
          label: currency.code,
          value: currency.code
        })
      })
    }
    const inputConent = (
      <React.Fragment>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <CateGorySelect
              intl={intl}
              name="categories"
              defaultValue={formValueCategory}
              categories={categories}
              currentWorkspace={currentWorkspace}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <TagSelect
              intl={intl}
              name="tags"
              defaultValue={formValueTag}
              tagRecommendations={tagRecommendations}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <SelectAddress
              intl={intl}
              name="locations"
              label={intl.formatMessage({
                id: 'display_preference_location'
              })}
              showDetailedAddressInput={false}
              showLocalLocationButton={false}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            {currentWorkspace.type === Common.type.WorkspaceType.JOBHUNTING && (
              <EmploymentTypeSelect
                intl={intl}
                name="employmentTypes"
                defaultValue={formValueEmploymentType}
                employmentType={employmentType}
              />
            )}
          </Col>
        </Row>
        {currentWorkspace.type === Common.type.WorkspaceType.JOBHUNTING && (
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <UnitSelect
                intl={intl}
                name="wage.unit"
                formValueUnit={formValueUnit}
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Dropdown
                name="wage.currency"
                label={intl.formatMessage({ id: 'currency' })}
                options={CurrenciesOption}
              />
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <div style={{ display: 'flex', width: '100%' }}>
                <TextInput
                  name="wage.min"
                  label={intl.formatMessage({
                    id: 'display_preference_unit_min'
                  })}
                  containerStyle={{ flex: 1 }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50px'
                  }}
                >
                  -
                </div>
                <TextInput
                  name="wage.max"
                  label={intl.formatMessage({
                    id: 'display_preference_unit_max'
                  })}
                  containerStyle={{ flex: 1 }}
                />
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Switch
              type="number"
              name="showAvgFeedback"
              label={intl.formatMessage({
                id: 'display_preference_show_avg_feedback'
              })}
            />
          </Col>
        </Row>
      </React.Fragment>
    )

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        {(!noTitle || displaySubmitButtons) && (
          <Title.Wrapper>
            {!noTitle && (
              <Title>{intl.formatMessage({ id: 'nav.preference' })}</Title>
            )}
            <Title.Right>
              {displaySubmitButtons ? this.renderButtons() : null}
            </Title.Right>
          </Title.Wrapper>
        )}
        {inputConent}
      </Form>
    )
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(PreferenceForm)
