import React from 'react'
// import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa'
import { Tabs } from 'antd'
import { helpers as EcommCommonHelpers } from '@golpasal/common'
import Common from '@golpasal/common'

import CurrencyDropdowm from '../../../Containers/Form/CurrencyDropdowm'
import FormName from '../../../Constants/Form'
import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Dropdown from '../../Form/Dropdown'
import Errors from '../../Form/Errors'
import Form from '../../Form/Form'
import TextInput from '../../Form/TextInput'
import Switch from '../../Form/Switch'
import Uploader from '../../Form/Uploader'
import Checkbox from '../../Form/Checkbox'
import Card from '../../../Components/Common/Card'

// import WorkspaceWidgets from './WorkspaceWidgets';
// import WorkspaceContactList from '../../../Containers/WorkspaceContact/WorkspaceContactList';
// import WorkspaceItemsForm from './WorkspaceItemsForm';
import { CustomizeHooks } from './index'
import CreateButton from './CreateButton'
import { validate, asyncValidate, WorkSpaceSecert } from './WorkspaceFormUtils'
import RecruitmentTypes from './RecruitmentTypes'
import WorkspaceTheme from './WorkspaceTheme'
import WorkTimeDropDown from './WorkTimeDropDown'
import WorkDayDropDown from './WorkDayDropDown'
import CreateContactButton from './CreateContactButton'
import DeleteContactButton from './DeleteContactButton'

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

class MyWorkspaceForm extends React.PureComponent {
  constructor(props) {
    super(props)
    const hasDefaultValue = props.initialValues.contacts
    this.state = {
      hasDefaultValue,
      activeKey: '0'
      //  contacts: hasDefaultValue ? props.initialValues.contacts : ['']
    }
  }

  renderButtons() {
    const { intl, invalid, pristine, submitting } = this.props
    if (this.props.form === FormName.WORKSPACE_UPDATE) {
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
      // images,
      onSubmit,
      onSubmitSuccess,
      currencies,
      worksapceType,
      // updateMode,
      onSubmitFail = () => true,
      workspaceId,
      workspaceHooks,
      secretValueSelector,
      appHook,
      appHookName,
      formValueIntegrations,
      formValueContacts,
      formValueRecruitmentTypes,
      formValueSetting,
      currentUser
      // form
    } = this.props
    //  const updateMode = form === FormName.WORKSPACE_UPDATE;
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

    const twilioVerifyChannelTypeOptions = EcommCommonHelpers.getConstants(
      'type',
      'TwilioVerifyChannelType',
      intl.locale
    ).map((v) => ({
      label: v.text,
      value: v.value
    }))

    const methodPayrollOptions = EcommCommonHelpers.getConstants(
      'method',
      'PayrollCalculationMethod',
      intl.locale
    ).map((PayrollMethod) => ({
      label: PayrollMethod.text,
      value: PayrollMethod.value
    }))

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

    let CurrenciesOption = []
    if (currencies) {
      currencies.forEach((currency) => {
        CurrenciesOption.push({
          label: currency.code,
          value: currency.code
        })
      })
    }

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

    const allowEdit =
      currentUser.actions.allows.includes('MyWorkspace:Account:Update') &&
      workspaceId

    const inputConent = (
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
          key="0"
        >
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
            <WorkSpaceSecert
              intl={intl}
              secretValueSelector={secretValueSelector}
            />
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_contact_person' })}
          key="1"
        >
          {formValueContacts &&
            formValueContacts.map((v, i) => (
              <FormContent key={i} style={{ marginTop: i === 0 ? 0 : 20 }}>
                <DeleteContactButton name="contacts" i={i} />
                <CardTitle>
                  {intl.formatMessage({
                    id: 'display_contact_base'
                  })}
                </CardTitle>
                <Row>
                  <Col xs={12} sm={12} md={6}>
                    <TextInput
                      name={`contacts[${i}].department`}
                      label={intl.formatMessage({
                        id: 'display_department'
                      })}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={6}>
                    <TextInput
                      name={`contacts[${i}].name`}
                      label={intl.formatMessage({
                        id: 'display_person'
                      })}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <TextInput
                      name={`contacts[${i}].phoneNo`}
                      label={intl.formatMessage({
                        id: 'display_phone'
                      })}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={6}>
                    <TextInput
                      name={`contacts[${i}].email`}
                      label={intl.formatMessage({
                        id: 'display_email'
                      })}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12}>
                    <TextInput
                      name={`contacts[${i}].address`}
                      label={intl.formatMessage({
                        id: 'address'
                      })}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={3} md={3}>
                    <TextInput
                      name={`contacts[${i}].coordinates[0]`}
                      label={intl.formatMessage({
                        id: 'display_longitude'
                      })}
                    />
                  </Col>
                  <Col xs={12} sm={3} md={3}>
                    <TextInput
                      name={`contacts[${i}].coordinates[1]`}
                      label={intl.formatMessage({
                        id: 'display_latitude'
                      })}
                    />
                  </Col>
                </Row>

                {/* serviceHour */}
                <CardTitle>
                  {intl.formatMessage({
                    id: 'display_service_hour'
                  })}
                </CardTitle>
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <WorkTimeDropDown intl={intl} />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <WorkDayDropDown
                      intl={intl}
                      name={`contacts[${i}].serviceHour.workdays`}
                      label={intl.formatMessage({
                        id: 'display_recruitment_workday'
                      })}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <TextInput
                      intl={intl}
                      name={`contacts[${i}].serviceHour.timeTableDescription`}
                      rows={4}
                      label={intl.formatMessage({
                        id: 'display_description'
                      })}
                    />
                  </Col>
                </Row>
              </FormContent>
            ))}
          <CreateContactButton name="contacts" />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_marketing' })}
          key="2"
        >
          <FormContent>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="marketing.googleTagManager"
                  label={intl.formatMessage({
                    id: 'display_workspace_googleTagManager'
                  })}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="marketing.facebookPixel"
                  label={intl.formatMessage({
                    id: 'display_workspace_facebookPixel'
                  })}
                />
              </Col>
            </Row>
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_social_inks' })}
          key="3"
        >
          <FormContent>
            <CardTitle>Facebook</CardTitle>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.facebook.name"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_name'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_name'
                    },
                    {
                      name: 'Facebook'
                    }
                  )}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.facebook.url"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_link'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_link'
                    },
                    {
                      name: 'Facebook'
                    }
                  )}
                />
              </Col>
            </Row>
          </FormContent>

          <FormContent style={{ marginTop: 20 }}>
            <CardTitle>Youtube</CardTitle>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.youtube.name"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_name'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_name'
                    },
                    {
                      name: 'Youtube'
                    }
                  )}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.youtube.url"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_link'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_link'
                    },
                    {
                      name: 'Youtube'
                    }
                  )}
                />
              </Col>
            </Row>
          </FormContent>

          <FormContent style={{ marginTop: 20 }}>
            <CardTitle>Instagram</CardTitle>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.instagram.name"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_name'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_name'
                    },
                    {
                      name: 'Instagram'
                    }
                  )}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.instagram.url"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_link'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_link'
                    },
                    {
                      name: 'Instagram'
                    }
                  )}
                />
              </Col>
            </Row>
          </FormContent>

          <FormContent style={{ marginTop: 20 }}>
            <CardTitle>Baidu</CardTitle>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.baidu.name"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_name'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_name'
                    },
                    {
                      name: 'Baidu'
                    }
                  )}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.baidu.url"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_link'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_link'
                    },
                    {
                      name: 'Baidu'
                    }
                  )}
                />
              </Col>
            </Row>
          </FormContent>

          <FormContent style={{ marginTop: 20 }}>
            <CardTitle>Youku</CardTitle>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.youku.name"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_name'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_name'
                    },
                    {
                      name: 'Youku'
                    }
                  )}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                  name="socialLinks.youku.url"
                  label={intl.formatMessage({
                    id: 'display_workspace_social_platforms_link'
                  })}
                  placeholder={intl.formatMessage(
                    {
                      id: 'display_workspace_social_platforms_placehoder_link'
                    },
                    {
                      name: 'Youku'
                    }
                  )}
                />
              </Col>
            </Row>
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane tab="SEO" key="4">
          <FormContent>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <TextInput
                  name="seoMeta[og:site_name]"
                  label={intl.formatMessage({
                    id: 'display_seo_site_name'
                  })}
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <TextInput
                  name="seoMeta[og:locale]"
                  label={intl.formatMessage({
                    id: 'display_seo_locale'
                  })}
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <TextInput
                  name="seoMeta[og:url]"
                  label={intl.formatMessage({
                    id: 'display_seo_url'
                  })}
                />
                <TextInput
                  name="seoMeta[og:title]"
                  label={intl.formatMessage({
                    id: 'display_seo_title'
                  })}
                />
                <TextInput
                  name="seoMeta[og:type]"
                  label={intl.formatMessage({
                    id: 'display_seo_type'
                  })}
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <TextInput
                  name="seoMeta[fb:pages]"
                  label={intl.formatMessage({
                    id: 'display_seo_pages'
                  })}
                />
                <TextInput
                  name="seoMeta[fb:app_id]"
                  label={intl.formatMessage({
                    id: 'display_seo_app_id'
                  })}
                />
              </Col>
            </Row>
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_theme' })}
          key="5"
        >
          <FormContent>
            <Uploader
              intl={intl}
              name="setting.logo"
              label={`${intl.formatMessage({
                id: 'display_workspace_logo'
              })}`}
              multiple={false}
              disableDelete={false}
            />
            <Uploader
              intl={intl}
              name="setting.favicon"
              label={`${intl.formatMessage({
                id: 'display_workspace_favicon'
              })}`}
              multiple={false}
              disableDelete={false}
            />
            <Uploader
              intl={intl}
              name="setting.headerLogo"
              label={`${intl.formatMessage({
                id: 'display_workspace_header_logo'
              })}`}
              multiple={false}
              disableDelete={false}
            />
            <Uploader
              intl={intl}
              name="setting.loginBackgroundImage"
              label={`${intl.formatMessage({
                id: 'display_workspace_login_background'
              })}`}
              multiple={false}
              disableDelete={false}
            />
          </FormContent>
          <FormContent style={{ marginTop: 20 }}>
            <CardTitle>{intl.formatMessage({ id: 'display_theme' })}</CardTitle>
            <WorkspaceTheme
              name="setting.theme"
              intl={intl}
              formValueSetting={formValueSetting}
            />
          </FormContent>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_app_integration' })}
          key="6"
        >
          <div>
            {workspaceHooks.length > 0 ? (
              <div>
                <CustomizeHooks
                  workspaceHooks={workspaceHooks}
                  intl={intl}
                  appHook={appHook}
                  appHookName={appHookName}
                  formValueIntegrations={formValueIntegrations}
                />
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#fff',
                  marginTop: 0,
                  padding: '20px 30px'
                }}
              >
                {intl.formatMessage({ id: 'display_workspace_hook_no_data' })}
              </div>
            )}
            <CreateButton name="integrations" />
          </div>
        </Tabs.TabPane>
        {currentUser.actions.allows.includes(
          'MyWorkspace:Account:Preference'
        ) && (
          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'tab_workspace_form_widgets' })}
            key="7"
          >
            <>
              <FormContent>
                {/* events */}
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
              {worksapceType === WorkspaceType.JOBHUNTING && (
                <FormContent style={{ marginTop: 20 }}>
                  {/* recruitments */}
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
              )}
              <FormContent style={{ marginTop: 20 }}>
                {/* salarys */}
                <CardTitle>
                  {intl.formatMessage({ id: 'display_salary' })}
                </CardTitle>
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

              <FormContent style={{ marginTop: 20 }}>
                {/* push notification */}
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

              <FormContent style={{ marginTop: 20 }}>
                {/* salarys */}
                <CardTitle>
                  {intl.formatMessage({ id: 'display_salary' })}
                </CardTitle>
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
              <FormContent style={{ marginTop: 20 }}>
                {/* orders */}
                <CardTitle>
                  {intl.formatMessage({ id: 'nav.orders' })}
                </CardTitle>
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
                  <Col
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
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
                      name="preferences.order.allowEdit"
                      label={intl.formatMessage({
                        id: 'display_order_edit'
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
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <Checkbox
                      name="preferences.order.allowShoppingNoAddress"
                      label={intl.formatMessage({
                        id: 'display_order_allow_shopping_no_address'
                      })}
                    />
                  </Col>
                </Row>
              </FormContent>
              <FormContent style={{ marginTop: 20 }}>
                {/* auth */}
                <CardTitle>
                  {intl.formatMessage({ id: 'display_auth' })}
                </CardTitle>
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
                        { type: memberIntl }
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
              {worksapceType === WorkspaceType.LOGISTICS && (
                <FormContent style={{ marginTop: 20 }}>
                  {/* map */}
                  <CardTitle>
                    {intl.formatMessage({ id: 'display_map' })}
                  </CardTitle>
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

              <FormContent style={{ marginTop: 20 }}>
                {/* recruitment */}
                <CardTitle>
                  {intl.formatMessage({ id: 'display_workspace_recruitment' })}
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
                </Row>
              </FormContent>
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
          </Tabs.TabPane>
        )}
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_service_app' })}
          key="8"
        >
          <>
            <FormContent style={{ marginTop: 20 }}>
              {/* facebook */}
              <CardTitle>
                {intl.formatMessage({ id: 'display_service_facebook' })}
              </CardTitle>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextInput
                    placeholder={intl.formatMessage({
                      id: 'display_service_appId'
                    })}
                    name="serviceApps.facebook.appId"
                  />
                </Col>
              </Row>
            </FormContent>
            <FormContent style={{ marginTop: 20 }}>
              {/* google */}
              <CardTitle>
                {intl.formatMessage({ id: 'display_service_google' })}
              </CardTitle>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextInput
                    label={intl.formatMessage({
                      id: 'display_service_google_web'
                    })}
                    placeholder={intl.formatMessage({
                      id: 'display_service_appId'
                    })}
                    name="serviceApps.google.web.appId"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextInput
                    label={intl.formatMessage({
                      id: 'display_service_google_ios'
                    })}
                    placeholder={intl.formatMessage({
                      id: 'display_service_appId'
                    })}
                    name="serviceApps.google.ios.appId"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextInput
                    label={intl.formatMessage({
                      id: 'display_service_google_android'
                    })}
                    placeholder={intl.formatMessage({
                      id: 'display_service_appId'
                    })}
                    name="serviceApps.google.android.appId"
                  />
                </Col>
              </Row>
            </FormContent>
          </>
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
          <Title>{intl.formatMessage({ id: 'workspace.title' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        {inputConent}
      </Form>
    )
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {},
  asyncValidate,
  asyncBlurFields: ['code']
})(MyWorkspaceForm)
