import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'

import TextInput from '../../../Form/TextInput'
import Dropdown from '../../../Form/Dropdown'
import Switch from '../../../Form/Switch'

const { WorkspaceType } = Common.type

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`

export class BaseTab extends React.PureComponent {
  render() {
    const { intl, currencies, worksapceType, allowEdit } = this.props

    const statusOptions = EcommCommonHelpers.getConstants(
      'status',
      'WorkspaceStatus',
      intl.locale
    ).map((WorkspaceStatus) => ({
      label: WorkspaceStatus.text,
      value: WorkspaceStatus.value
    }))

    const typeOptions = EcommCommonHelpers.getConstants(
      'type',
      'WorkspaceType',
      intl.locale
    ).map((v) => ({
      label: v.text,
      value: v.value
    }))

    let CurrenciesOption = []
    if (currencies) {
      currencies.forEach((currency) => {
        CurrenciesOption.push({
          label: currency.code,
          value: currency.code
        })
      })
    }

    return (
      <FormContent>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <TextInput
              name="code"
              disabled={!allowEdit}
              label={intl.formatMessage({ id: 'display_workspace_code' })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <Dropdown
              name="status"
              label={intl.formatMessage({
                id: 'display_workspace_status'
              })}
              disabled={!allowEdit}
              options={statusOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <TextInput
              name="name"
              label={intl.formatMessage({
                id: 'display_workspace_name'
              })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <Dropdown
              name="type"
              label={intl.formatMessage({
                id: 'display_workspace_type'
              })}
              options={typeOptions}
              disabled={!allowEdit}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={10} md={10} lg={5}>
            <TextInput
              label={intl.formatMessage({
                id: 'display_webHost'
              })}
              name="webHost"
              disabled={!allowEdit}
            />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <Switch
              type="number"
              name="alwaysHttpsWebHost"
              label="HTTPS"
              disabled={!allowEdit}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <TextInput
              label={intl.formatMessage({
                id: 'display_app_store_url'
              })}
              name="appStoreUrl"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={10} md={10} lg={5}>
            <TextInput
              label={
                worksapceType === WorkspaceType.EDUCATION
                  ? intl.formatMessage({
                      id: 'display_education_merchant_webHost'
                    })
                  : intl.formatMessage({
                      id: 'display_default_merchant_webHost'
                    })
              }
              name="merchantWebHost"
              disabled={!allowEdit}
            />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <Switch
              type="number"
              name="alwaysHttpsMerchantWebHost"
              label="HTTPS"
              disabled={!allowEdit}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <TextInput
              label={intl.formatMessage({
                id: 'display_google_play_url'
              })}
              name="googlePlayUrl"
            />
          </Col>
        </Row>
        {process.env.REACT_APP_WORKSPACE && (
          <Row>
            <Col xs={10} sm={10} md={10} lg={5}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_admin_webHost'
                })}
                name="adminHost"
                disabled={!allowEdit}
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Switch
                type="number"
                name="alwaysHttpsAdminHost"
                label="HTTPS"
                disabled={!allowEdit}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <Dropdown
              name="defaultCurrency"
              label={intl.formatMessage({
                id: 'currency'
              })}
              options={CurrenciesOption}
            />
          </Col>
        </Row>
      </FormContent>
    )
  }
}
