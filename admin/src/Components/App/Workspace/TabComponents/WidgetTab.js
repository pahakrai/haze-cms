import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa'
import Common, { helpers as EcommCommonHelpers } from '@golpasal/common'

import Uploader from '../../../Form/Uploader'
import Checkbox from '../../../Form/Checkbox'
import TextInput from '../../../Form/TextInput'
import Dropdown from '../../../Form/Dropdown'

import CurrencyDropdowm from '../../../../Containers/Form/CurrencyDropdowm'
import Card from '../../../../Components/Common/Card'

import RecruitmentTypes from '../RecruitmentTypes'

const { WorkspaceType } = Common.type

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`

const CardTitle = styled(Card.Title)`
  min-height: unset;
  padding-top: 0;
  padding-bottom: 10px;
  border: 0;
`

export class WidgetTab extends React.PureComponent {
  render() {
    const { intl, worksapceType } = this.props

    const mapTypeOptions = EcommCommonHelpers.getConstants(
      'type',
      'MapType',
      intl.locale
    ).map((type) => ({
      label: type.text,
      value: type.value
    }))
    mapTypeOptions.push({
      label: intl.formatMessage({ id: 'display_not' }),
      value: ''
    })

    let memberIntl = ''
    let merchantIntl = ''
    let eventIntl = ''
    let productIntl = ''
    switch (worksapceType) {
      case WorkspaceType.EDUCATION:
        memberIntl = intl.formatMessage({ id: 'student' })
        merchantIntl = intl.formatMessage({ id: 'teacher' })
        eventIntl = intl.formatMessage({ id: 'event_education_display' })
        productIntl = intl.formatMessage({ id: 'product_education_display' })
        break
      case WorkspaceType.SHOPPING:
        memberIntl = intl.formatMessage({ id: 'display_payroll_member' })
        merchantIntl = intl.formatMessage({ id: 'display_payroll_merchant' })
        eventIntl = intl.formatMessage({ id: 'event_base_display' })
        productIntl = intl.formatMessage({ id: 'product_shopping_display' })
        break
      case WorkspaceType.JOBHUNTING:
        memberIntl = intl.formatMessage({ id: 'display_payroll_employee' })
        merchantIntl = intl.formatMessage({ id: 'employer' })
        eventIntl = intl.formatMessage({ id: 'event_base_display' })
        break
      case WorkspaceType.LOGISTICS:
        memberIntl = intl.formatMessage({ id: 'display_client' })
        merchantIntl = intl.formatMessage({ id: 'dashboard_stats_driver' })
        eventIntl = intl.formatMessage({ id: 'event_base_display' })
        break
      default:
        productIntl = intl.formatMessage({ id: 'product_base_display' })
        break
    }

    return (
      <>
        <EventContent eventIntl={eventIntl} {...this.props} />

        {worksapceType === WorkspaceType.JOBHUNTING && (
          <RecruitmentContent {...this.props} />
        )}

        <SalaryContent {...this.props} />

        <PushNotificationContent {...this.props} />

        <OrderContent {...this.props} />

        <AuthContent
          memberIntl={memberIntl}
          merchantIntl={merchantIntl}
          {...this.props}
        />

        <ProductContent productIntl={productIntl} {...this.props} />

        {worksapceType === WorkspaceType.LOGISTICS && (
          <FormContent style={{ marginTop: 20 }}>
            {/* map */}
            <CardTitle>{intl.formatMessage({ id: 'display_map' })}</CardTitle>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  name="preferences.mapType"
                  label={intl.formatMessage({
                    id: 'display_type'
                  })}
                  options={mapTypeOptions}
                />
              </Col>
            </Row>
          </FormContent>
        )}

        {worksapceType === WorkspaceType.LOGISTICS && (
          <FormContent style={{ marginTop: 20 }}>
            <CardTitle>
              {intl.formatMessage({
                id: 'display_workspace_userVehicle'
              })}
            </CardTitle>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <Checkbox
                  name="preferences.userVehicle.enableNearBy"
                  label={intl.formatMessage({
                    id: 'display_enableNearBy_vehicle'
                  })}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  type="number"
                  label={intl.formatMessage(
                    {
                      id: 'display_workspace_uservehicle_reload'
                    },
                    { type: memberIntl }
                  )}
                  name="preferences.userVehicle.reload"
                />
              </Col>
            </Row>
          </FormContent>
        )}
        <FormContent style={{ marginTop: 20 }}>
          {/* members */}
          <CardTitle>{memberIntl}</CardTitle>
          <Uploader
            intl={intl}
            name="preferences.member.icon"
            label={
              <>
                {memberIntl}
                {intl.locale === 'en' ? <>&nbsp;</> : ''}
                {intl.formatMessage({
                  id: 'display_category_icon'
                })}
              </>
            }
            disableDelete={false}
            hideUploadArea={true}
          />
        </FormContent>
        <FormContent style={{ marginTop: 20 }}>
          {/* merchants */}
          <CardTitle>{merchantIntl}</CardTitle>
          <Uploader
            intl={intl}
            name="preferences.merchant.icon"
            label={
              <>
                {merchantIntl}
                {intl.locale === 'en' ? <>&nbsp;</> : ''}
                {intl.formatMessage({
                  id: 'display_category_icon'
                })}
              </>
            }
            disableDelete={false}
            hideUploadArea={true}
          />
        </FormContent>
        <FormContent style={{ marginTop: 20 }}>
          {/* receipts */}
          <CardTitle>
            {intl.formatMessage({
              id: 'display_receipt'
            })}
          </CardTitle>
          <Uploader
            intl={intl}
            name="preferences.receipt.backgroundImage"
            label={intl.formatMessage({
              id: 'display_receipt_backgroundImage'
            })}
            disableDelete={false}
            hideUploadArea={true}
          />
          <Uploader
            intl={intl}
            name="preferences.receipt.headerImage"
            label={intl.formatMessage({
              id: 'display_receipt_headerImage'
            })}
            disableDelete={false}
            hideUploadArea={true}
          />
          <Uploader
            intl={intl}
            name="preferences.receipt.footerImage"
            label={intl.formatMessage({
              id: 'display_receipt_footerImage'
            })}
            disableDelete={false}
            hideUploadArea={true}
          />
        </FormContent>
        {/* <FormContent style={{ marginTop: 20 }}>
      <CardTitle>
        {intl.formatMessage({ id: 'display_workspace_widget' })}
      </CardTitle>
      <WorkspaceWidgets name="preferences.widgets" intl={intl} />
    </FormContent> */}
      </>
    )
  }
}

const EventContent = ({ eventIntl, worksapceType, intl }) => {
  return (
    <FormContent>
      <CardTitle>{eventIntl}</CardTitle>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6}>
          <TextInput
            label={
              worksapceType === WorkspaceType.EDUCATION
                ? intl.formatMessage({
                    id: 'event_education_display'
                  }) +
                  intl.formatMessage({
                    id: 'display_event_notAllowModifyIn'
                  })
                : intl.formatMessage({
                    id: 'event_campaign_base_display'
                  }) +
                  intl.formatMessage({
                    id: 'display_event_notAllowModifyIn'
                  })
            }
            type="number"
            name="preferences.event.notAllowModifyIn"
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <TextInput
            type="number"
            name="preferences.event.peopleInChargeLimit"
            label={
              intl.formatMessage({
                id:
                  worksapceType === WorkspaceType.EDUCATION
                    ? 'teacher'
                    : 'event_people_in_charge_display'
              }) +
              intl.formatMessage({
                id: 'display_event_peopleInChargeLimit'
              })
            }
          />
        </Col>
      </Row>
    </FormContent>
  )
}

const RecruitmentContent = ({ intl, formValueRecruitmentTypes }) => {
  return (
    <>
      <FormContent style={{ marginTop: 20 }}>
        {/* recruitment */}
        <CardTitle>
          {intl.formatMessage({
            id: 'display_workspace_recruitment'
          })}
        </CardTitle>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Checkbox
              name="preferences.recruitment.invitePushNotificaton"
              label={intl.formatMessage({
                id: 'display_invite_push_notificaton'
              })}
            />
          </Col>
          <Col xs={12} sm={6} md={6} lg={6}>
            <Checkbox
              name="preferences.recruitment.allowEdit"
              label={intl.formatMessage({
                id: 'display_recruitment_allow_edit'
              })}
            />
          </Col>
        </Row>
      </FormContent>

      <FormContent style={{ marginTop: 20 }}>
        <CardTitle>
          {intl.formatMessage({
            id: 'display_apply_recruitment_limit'
          })}
        </CardTitle>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
            <CurrencyDropdowm
              name="preferences.recruitment.applyRecruitmentLimit.currency"
              label={intl.formatMessage({
                id: 'currency'
              })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <TextInput
              type="number"
              name="preferences.recruitment.applyRecruitmentLimit.amount"
              label={intl.formatMessage({
                id: 'amount'
              })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <RecruitmentTypes
              intl={intl}
              label={intl.formatMessage({
                id: 'display_recruitment_type'
              })}
              defaultValue={formValueRecruitmentTypes}
              name="preferences.recruitment.applyRecruitmentLimit.recruitmentTypes"
            />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Checkbox
              name="preferences.recruitment.enableViews"
              label={intl.formatMessage({
                id: 'display_recruitment_enable_views'
              })}
            />
          </Col>
        </Row>
      </FormContent>
    </>
  )
}

const SalaryContent = ({ intl }) => {
  const methodPayrollOptions = EcommCommonHelpers.getConstants(
    'method',
    'PayrollCalculationMethod',
    intl.locale
  ).map((PayrollMethod) => ({
    label: PayrollMethod.text,
    value: PayrollMethod.value
  }))
  return (
    <FormContent style={{ marginTop: 20 }}>
      <CardTitle>{intl.formatMessage({ id: 'display_salary' })}</CardTitle>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Dropdown
            name="preferences.payroll.calculationMethod"
            label={intl.formatMessage({
              id: 'display_calculationMethod'
            })}
            options={methodPayrollOptions}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            name="preferences.payroll.calculateAmountByDetails"
            label={intl.formatMessage({
              id: 'display_payroll_calculate_amount'
            })}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            name="preferences.payroll.enable"
            label={intl.formatMessage({
              id: 'display_payroll_enable'
            })}
          />
        </Col>
      </Row>
    </FormContent>
  )
}

const PushNotificationContent = ({ intl }) => {
  return (
    <FormContent style={{ marginTop: 20 }}>
      <CardTitle>
        {intl.formatMessage({
          id: 'display_push_notification'
        })}
      </CardTitle>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            name="preferences.pushNotification.paymenTransactionStatusUpdate"
            label={intl.formatMessage({
              id: 'display_push_notification_paymentTransactionStatusUpdate'
            })}
          />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            name="preferences.pushNotification.userStatusUpdate"
            label={intl.formatMessage({
              id: 'display_push_notification_userStatusUpdate'
            })}
          />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Checkbox
            name="preferences.pushNotification.userActiviationIssueAdd"
            label={intl.formatMessage({
              id: 'display_push_notification_userActiviationIssueAdd'
            })}
          />
        </Col>
      </Row>
    </FormContent>
  )
}

const OrderContent = ({ intl, worksapceType }) => {
  const userTypeOptions = EcommCommonHelpers.getConstants(
    'type',
    'UserType',
    intl.locale
  ).map((type) => ({
    label: type.text,
    value: type.value
  }))

  const orderLogisticLocationTypeOptions = EcommCommonHelpers.getConstants(
    'type',
    'OrderLogisticLocationType',
    intl.locale
  ).map((type) => ({
    label: type.text,
    value: type.value
  }))
  return (
    <FormContent style={{ marginTop: 20 }}>
      {/* orders */}
      <CardTitle>{intl.formatMessage({ id: 'nav.orders' })}</CardTitle>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Dropdown
            isMulti
            label={intl.formatMessage({
              id: 'display_user_type'
            })}
            name="preferences.order.clientUserTypes"
            options={userTypeOptions}
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <TextInput
            name="preferences.order.dailyCancelLimit"
            type="number"
            label={intl.formatMessage({
              id: 'display_daily_cancel_limit'
            })}
          />
        </Col>
        {worksapceType === WorkspaceType.LOGISTICS && (
          <>
            <Col xs={12} sm={6} md={6} lg={6}>
              <TextInput
                name="preferences.order.acceptOrderCoolingOffPeriod"
                type="number"
                label={intl.formatMessage({
                  id: 'display_accept_order_cooling_off_period'
                })}
              />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Dropdown
                name="preferences.order.locationType"
                label={intl.formatMessage({
                  id: 'display_worksapce_order_logistic_location_type'
                })}
                options={orderLogisticLocationTypeOptions}
              />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Checkbox
                name="preferences.order.updatePeopleInCharge"
                label={intl.formatMessage({
                  id: 'display_order_update_people_charge'
                })}
              />
            </Col>
          </>
        )}
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.subscription"
            label={intl.formatMessage({
              id: 'display_workspace_subscription'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.hasConsignee"
            label={intl.formatMessage({
              id: 'display_hasConsignee'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.hasInvoice"
            label={intl.formatMessage({
              id: 'display_hasInvoice'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.hasInvoice"
            label={intl.formatMessage({
              id: 'display_hasInvoice'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.allowEdit"
            label={intl.formatMessage({
              id: 'display_order_edit'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.allowShoppingNoAddress"
            label={intl.formatMessage({
              id: 'display_order_allow_shopping_no_address'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.enableSignature"
            label={intl.formatMessage({
              id: 'display_order_enable_signature'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.order.consumeCredit"
            label={intl.formatMessage({
              id: 'display_order_consume_credit'
            })}
          />
        </Col>
      </Row>
    </FormContent>
  )
}

const AuthContent = ({ intl, worksapceType, merchantIntl, memberIntl }) => {
  const twilioVerifyChannelTypeOptions = EcommCommonHelpers.getConstants(
    'type',
    'TwilioVerifyChannelType',
    intl.locale
  ).map((v) => ({
    label: v.text,
    value: v.value
  }))
  return (
    <FormContent style={{ marginTop: 20 }}>
      {/* auth */}
      <CardTitle>{intl.formatMessage({ id: 'display_auth' })}</CardTitle>
      <Row>
        {worksapceType === WorkspaceType.LOGISTICS && (
          <Col xs={12} sm={12} md={12} lg={12}>
            <Dropdown
              name="preferences.auth.twilioLogin.channel"
              label={intl.formatMessage({
                id: 'display_twilio_verify_type'
              })}
              options={twilioVerifyChannelTypeOptions}
            />
          </Col>
        )}
      </Row>

      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <TextInput
            type="number"
            label={intl.formatMessage(
              {
                id: 'display_workspace_authorized_devices'
              },
              { type: intl.formatMessage({ id: 'display_provider' }) }
            )}
            name="preferences.auth.authorizedDeviceLimit.provider"
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <TextInput
            type="number"
            label={intl.formatMessage(
              {
                id: 'display_workspace_authorized_devices'
              },
              { type: merchantIntl }
            )}
            name="preferences.auth.authorizedDeviceLimit.user"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <TextInput
            type="number"
            label={intl.formatMessage(
              {
                id: 'display_workspace_authorized_devices'
              },
              { type: memberIntl }
            )}
            name="preferences.auth.authorizedDeviceLimit.member"
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <TextInput
            type="number"
            label={intl.formatMessage({
              id: 'display_workspace_request_asscode_limit'
            })}
            name="preferences.auth.dailyRequestPasscodeLimit"
          />
        </Col>
      </Row>
    </FormContent>
  )
}

const ProductContent = ({ intl, productIntl }) => {
  return (
    <FormContent style={{ marginTop: 20 }}>
      {/* product */}
      <CardTitle>{productIntl}</CardTitle>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.product.isEnableCart"
            label={intl.formatMessage({
              id: 'display_is_enable_cart'
            })}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Checkbox
            name="preferences.product.hasDeliveryAndPaymentInfo"
            label={intl.formatMessage({
              id: 'display_has_delivery_payment_info'
            })}
          />
        </Col>
      </Row>
    </FormContent>
  )
}
