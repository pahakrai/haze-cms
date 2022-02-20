import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Modal, Tabs } from 'antd';
import Common from '@golpasal/common';

import SelectUserModal from '../OrderLogisticList/SelectUserModal/SelectUserModal';
import Button from '../../../Common/Button';
import Title from '../../../Common/Title';
import ICard from '../../../Common/Card';
import { formatUserName } from '../../../../Lib/util';
import { Row, Col } from 'react-flexa';
import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper,
  ColWrapper
} from '../../Form/Wrapper';
import Errors from '../../../Form/Errors';
import Form from '../../../Form/Form';
import TextInput from '../../../Form/TextInput';
import { FieldLabel } from '../../../Form/form.styled';
import DriverDetail from '../../../../Containers/Order/DriverDetail';
import SelectUser from '../../../../Containers/Form/SelectUser';
import OrderLog from '../Form/OrderLog';
import LogisticItem from '../OrderLogisticForm/Components/LogisticItem';
import LogisticItemButton from '../OrderLogisticForm/Components/LogisticItemButton';

import {
  OrderStatusBar,
  OrderDuration,
  VehicleTypeSelect,
  DateSelect,
  OrderLocation,
  OrderStore,
  Remarks,
  OrderService,
  SignatureTab
} from './Components';

const { UserType, OrderLogisticLocationType } = Common.type;
const { TravelOrderStatus: CommonOrderStatus, UserStatus } = Common.status;

const OrderNumber = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const Card = styled(ICard)`
  box-shadow: none;
`;
const AmountCard = styled(Card)`
  margin-top: 7px;
  padding-top: 35px;
  padding-bottom: 35px;
  flex-direction: row;
`;

export const AllAmountText = styled.span`
  font-size: 20px;
  font-weight: 500;
`;
const CoordinateAcceptContainer = styled.div`
  border-top: 1px solid #ddd;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
`;

const TabContent = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
`;

export const UserModalControl = {
  peopleInCharge: {
    get: v => (v.peopleInCharge._id ? v.peopleInCharge?._id : v.peopleInCharge),
    set: (user, data) => ({
      ...data,
      user: user._id ? user._id : user,
      name: formatUserName(user) || '-'
    })
  }
};

const validate = (values, { hasConsignee, currentWorkspace }) => {
  const errors = {};
  const required = <FormattedMessage id={'error.required'} />;
  const phoneError = (
    <FormattedMessage id="error.phone.length" values={{ number: 8 }} />
  );
  const { logisticItems } = Object.assign([], values);
  const logistic = values.logistic || {};
  const contact = values.contact || {};
  const consignee = values.consignee || {};
  const locationType = currentWorkspace?.preferences?.order?.locationType;

  const setLogisticErrors = errs => {
    errors.logistic = { ...(errors.logistic || {}), ...errs };
  };
  const setLocToError = (index, err) => {
    const locTo = [...((errors.logistic && errors.logistic.locTo) || [])];
    locTo[index] = err;
    setLogisticErrors({ locTo });
  };
  const setContactErrors = errs => {
    errors.contact = { ...(errors.contact || {}), ...errs };
  };
  const setConsigneeErrors = errs => {
    errors.consignee = { ...(errors.consignee || {}), ...errs };
  };

  if (!logistic.vehicleType) {
    setLogisticErrors({
      vehicleType: <FormattedMessage id="error.pls_select_vehicle_type" />
    });
  }
  // contact
  if (!contact.name) {
    setContactErrors({ name: required });
  }
  if (!contact.phone) {
    setContactErrors({ phone: required });
  } else if (!/^\d{8}$/.test(contact.phone + '')) {
    setContactErrors({ phone: phoneError });
  }
  if (!consignee.name && hasConsignee) {
    setConsigneeErrors({ name: required });
  }
  if (!consignee.phone && hasConsignee) {
    setConsigneeErrors({ phone: required });
  } else if (!/^\d{8}$/.test(consignee.phone + '')) {
    setConsigneeErrors({ phone: phoneError });
  }
  if (locationType === OrderLogisticLocationType.LOCATION) {
    // localtion
    if (
      !logistic.locFr ||
      !logistic.locFr.geometry ||
      !logistic.locFr.geometry.coordinates ||
      !logistic.locFr.geometry.coordinates.length ||
      !logistic.locFr.properties ||
      !logistic.locFr.properties.name
    ) {
      setLogisticErrors({ locFr: required });
    }

    if (logistic.locTo && logistic.locTo.length) {
      logistic.locTo.forEach((loc, index) => {
        if (
          !loc ||
          !loc.geometry ||
          !loc.geometry.coordinates ||
          !loc.geometry.coordinates.length ||
          !loc.properties ||
          !loc.properties.name
        ) {
          setLocToError(index, required);
        }
      });
    } else {
      setLocToError(0, required);
    }
  }
  if (locationType === OrderLogisticLocationType.STORE) {
    if (!logistic.storeTo) {
      setLogisticErrors({ storeTo: required });
    }
  }
  if (logisticItems && logisticItems.length > 0) {
    const logisticItemErrors = [];
    logisticItems.forEach((item, i) => {
      logisticItemErrors[i] = { dimensions: {} };
      if (item.qty === '' || item.qty === undefined) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].qty = required;
      } else if (item?.qty <= 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].qty = (
          <FormattedMessage id={'error.number.gtzero'} />
        );
      }
      if (!item.qUnit) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].qUnit = required;
      }
      if (item.qty2 && item.qty2 < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].qty2 = (
          <FormattedMessage id={'error.number.gtezero'} />
        );
      }
      // if (item.qty2 && !item.qUnit2) {
      //   logisticItemErrors[i] = logisticItemErrors[i] || {};
      //   logisticItemErrors[i].qUnit2 = required;
      // }
      // if (!item.qty2 && item.qUnit2) {
      //   logisticItemErrors[i] = logisticItemErrors[i] || {};
      //   logisticItemErrors[i].qty2 = required;
      // }
      if (
        item?.dimensions?.length === '' ||
        item?.dimensions?.length === undefined
      ) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.length = required;
      } else if (item?.dimensions?.length < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.length = (
          <FormattedMessage id={'error.than_zero'} />
        );
      }
      if (
        item?.dimensions?.width === '' ||
        item?.dimensions?.width === undefined
      ) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.width = required;
      } else if (item?.dimensions?.width < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.width = (
          <FormattedMessage id={'error.than_zero'} />
        );
      }
      if (
        item?.dimensions?.height === '' ||
        item?.dimensions?.height === undefined
      ) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.height = required;
      } else if (item?.dimensions?.height < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.height = (
          <FormattedMessage id={'error.than_zero'} />
        );
      }

      if (
        item?.dimensions?.unit === '' ||
        item?.dimensions?.unit === undefined
      ) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].dimensions.unit = required;
      }

      if (item?.weight === '' || item?.weight === undefined) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].weight = required;
      } else if (item?.weight < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].weight = (
          <FormattedMessage id={'error.than_zero'} />
        );
      }

      if (item?.weightUnit === '' || item?.weightUnit === undefined) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].weightUnit = required;
      }

      if (item.cbm === '' || item.cbm === undefined) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].cbm = required;
      } else if (item?.cbm < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].cbm = <FormattedMessage id={'error.than_zero'} />;
      }
      if (item.rt === '' || item.rt === undefined) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].rt = required;
      } else if (item?.rt < 0) {
        logisticItemErrors[i] = logisticItemErrors[i] || {};
        logisticItemErrors[i].rt = <FormattedMessage id={'error.than_zero'} />;
      }
    });
    let flag = false;
    logisticItemErrors.forEach(item => {
      if (Object.keys(item).length) flag = true;
      if (
        Object.keys(item.dimensions).length === 0 &&
        Object.keys(item).length === 1
      )
        flag = false;
    });
    if (flag) errors.logisticItems = logisticItemErrors;
  }

  return errors;
};

class OrderForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  renderStatusButton = () => {
    const {
      formValueStatus,
      intl,
      cancelOrder,
      updateOrderStatus,
      updateOrderStatusLoading
      // checkoutUrl,
      // checkoutLoading
    } = this.props;
    const confirm = (title, callback) =>
      Modal.confirm({
        title: intl.formatMessage({
          id: title
        }),
        okText: intl.formatMessage({ id: 'display_yes' }),
        cancelText: intl.formatMessage({ id: 'cancel' }),
        onOk: () => {
          callback();
          return Promise.resolve();
        }
      });
    const cancel = (
      <Button.Danger
        margin={false}
        type="button"
        onClick={() => confirm('msg.update_order_status', cancelOrder)}
      >
        {intl.formatMessage({
          id: 'display_order_cancel'
        })}
      </Button.Danger>
    );
    const accept = (
      <Button.Primary
        margin={false}
        type="button"
        style={{ marginLeft: 20 }}
        disabled={updateOrderStatusLoading}
        loading={updateOrderStatusLoading}
        onClick={() =>
          confirm('msg.update_order_status', () =>
            updateOrderStatus(CommonOrderStatus.TRANSPORTING)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_order_driver_accepted'
        })}
      </Button.Primary>
    );
    const complete = (
      <Button.Primary
        margin={false}
        style={{ marginLeft: 20 }}
        type="button"
        disabled={updateOrderStatusLoading}
        loading={updateOrderStatusLoading}
        onClick={() =>
          confirm('msg.update_order_status', () =>
            updateOrderStatus(CommonOrderStatus.ARRIVE_DESTINATION)
          )
        }
      >
        {intl.formatMessage({
          id: 'display_order_arrive_destination'
        })}
      </Button.Primary>
    );
    // const checkout = (
    //   <CopyTextContainer text={checkoutUrl}>
    //     {({ onCopy }) => (
    //       <Button.Primary
    //         margin={false}
    //         type="button"
    //         disabled={checkoutLoading}
    //         loading={checkoutLoading}
    //         onClick={onCopy}
    //       >
    //         {intl.formatMessage({
    //           id: 'display_copy_checkout_link'
    //         })}
    //       </Button.Primary>
    //     )}
    //   </CopyTextContainer>
    // );

    switch (formValueStatus) {
      case CommonOrderStatus.AWAITING:
        return (
          <Button.Right>
            {cancel} {accept}
          </Button.Right>
        );
      case CommonOrderStatus.TRANSPORTING:
        return <Button.Right>{complete}</Button.Right>;
      case CommonOrderStatus.COMPLETED:
      default:
    }

    return null;
  };

  renderButtons() {
    const { intl, updateMode, pristine, submitting } = this.props;

    if (updateMode) {
      return (
        <Button.Primary disabled={pristine || submitting} type="submit">
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      );
    }
    return (
      <Button.Primary disabled={submitting} type="submit">
        {intl.formatMessage({
          id: 'create_btn'
        })}
      </Button.Primary>
    );
  }

  render() {
    const {
      intl,
      form,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      disabled,
      formValueOrderNo,
      amountText,
      updateMode,
      // submitting,
      // pristine,
      formValueDriver,
      currentWorkspace,
      hasConsignee,
      initialValues,
      orderId,
      formValueStatus,
      formValueLogisticItems,
      unitOfMeasures,
      formValueVehicleType,
      vehicleTypes
    } = this.props;
    const buttons = this.renderStatusButton();
    const allowEdit = currentWorkspace?.preferences?.order?.allowEdit;
    const locationType = currentWorkspace?.preferences?.order?.locationType;
    const enableSignature =
      currentWorkspace?.preferences?.order?.enableSignature === true;
    const updatePeopleInCharge =
      currentWorkspace?.preferences?.order?.updatePeopleInCharge;
    const updatePeopleInChargeStatus =
      initialValues.status <= CommonOrderStatus.DRIVER_ACCEPTED;
    const peopleInCharge = initialValues?.logistic?.peopleInCharge;
    const vehicleType = vehicleTypes.find(v => v._id === formValueVehicleType);

    const logisticItemContent = (
      <React.Fragment>
        <LogisticItem
          name="logisticItems"
          intl={intl}
          unitOfMeasures={unitOfMeasures}
          form={form}
        />
      </React.Fragment>
    );
    const inputConent = (
      <RowWrapper>
        <ColWrapper xs={12}>
          <Card style={{ marginTop: 0, marginBottom: 7 }}>
            <OrderNumber>
              {intl.formatMessage({ id: 'order_no_display' })}
              {': '}
              {formValueOrderNo}
            </OrderNumber>
            <OrderStatusBar name="status" intl={intl} />
          </Card>
          {updateMode && (formValueDriver || buttons) && (
            <Card
              style={{
                marginTop: 0,
                marginBottom: 7,
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              <div
                style={{
                  paddingLeft: 30,
                  paddingRight: 30
                }}
              >
                <RowWrapper>
                  <ColWrapper xs={6}>
                    {formValueDriver && (
                      <DriverDetail
                        name="driver"
                        intl={intl}
                        logistic={initialValues?.logistic}
                      />
                    )}
                  </ColWrapper>
                  {currentWorkspace.preferences.order.allowEdit && (
                    <ColWrapper xs={6}>{buttons}</ColWrapper>
                  )}
                </RowWrapper>
              </div>
              {initialValues?.logistic?.coordinateAccept && (
                <CoordinateAcceptContainer>
                  <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <FieldLabel>
                        <FormattedMessage id="display_order_accept_location" />
                      </FieldLabel>
                      <div style={{ fontSize: 12, color: '#aaa' }}>
                        {initialValues?.logistic?.coordinateAccept?.properties
                          ?.name || '-'}
                      </div>
                    </Col>
                    {formValueStatus ===
                      CommonOrderStatus.ARRIVE_DESTINATION && (
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <FieldLabel>
                          <FormattedMessage id="display_complete_time" />
                        </FieldLabel>
                        <div style={{ fontSize: 12, color: '#aaa' }}>
                          {moment(initialValues?.completeTime).format(
                            'YYYY-MM-DD hh:mm'
                          )}
                        </div>
                      </Col>
                    )}
                  </Row>
                </CoordinateAcceptContainer>
              )}
            </Card>
          )}
        </ColWrapper>
        <LeftColWrapper xs={12} sm={12} md={8}>
          <Card style={{ marginTop: 0, height: '100%' }}>
            <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
              <Tabs.TabPane
                tab={intl.formatMessage({ id: 'tab_order_base' })}
                key="1"
              >
                <TabContent>
                  <DateSelect name="date" intl={intl} disabled={disabled} />
                  <OrderDuration
                    name="time.duration"
                    disabled={disabled}
                    form={form}
                  />
                  <VehicleTypeSelect
                    name="logistic.vehicleType"
                    disabled={disabled}
                    updateMode={updateMode}
                    label={intl.formatMessage({ id: 'display_vehicle_type' })}
                    intl={intl}
                    form={form}
                  />
                  <OrderLocation
                    updateMode={updateMode}
                    disabled={disabled}
                    allowEdit={allowEdit}
                    currentWorkspace={currentWorkspace}
                    intl={intl}
                    form={form}
                    hideLocTo={locationType === OrderLogisticLocationType.STORE}
                  />
                  {locationType === OrderLogisticLocationType.STORE && (
                    <OrderStore />
                  )}
                  <SelectUser
                    containerStyle={{ width: '100%' }}
                    label={intl.formatMessage({ id: 'display_client' })}
                    query={{
                      userTypes:
                        currentWorkspace?.preferences?.order?.clientUserTypes ||
                        [],
                      statuses: [Common.status.UserStatus.ACTIVE]
                    }}
                    name="client"
                    formatOption={user =>
                      `${
                        formatUserName(user) ? `${formatUserName(user)} ` : ''
                      }${(user && user.phone) || ''}`
                    }
                    disabled={
                      formValueStatus >= CommonOrderStatus.DRIVER_ACCEPTED
                    }
                  />
                  <TextInput
                    label={intl.formatMessage({
                      id: 'display_order_sender'
                    })}
                    disabled={disabled}
                    name="contact.name"
                    inputProps={{ disabledTextColor: '#000' }}
                  />
                  <TextInput
                    label={intl.formatMessage({
                      id: 'display_order_sender_contact'
                    })}
                    disabled={disabled}
                    name="contact.phone"
                    inputProps={{ disabledTextColor: '#000' }}
                  />
                  {hasConsignee && (
                    <>
                      <TextInput
                        label={intl.formatMessage({
                          id: 'display_order_receiver'
                        })}
                        disabled={disabled}
                        name="consignee.name"
                        inputProps={{ disabledTextColor: '#000' }}
                      />
                      <TextInput
                        label={intl.formatMessage({
                          id: 'display_order_receiver_contact'
                        })}
                        disabled={disabled}
                        name="consignee.phone"
                        inputProps={{ disabledTextColor: '#000' }}
                      />
                    </>
                  )}
                </TabContent>
              </Tabs.TabPane>
              {vehicleType?.isCarryLogisticItem && (
                <Tabs.TabPane
                  tab={intl.formatMessage({ id: 'tab_logistic_item' })}
                  key="2"
                >
                  <TabContent>
                    {Array.isArray(formValueLogisticItems)
                      ? logisticItemContent
                      : null}
                    <LogisticItemButton name="logisticItems" />
                  </TabContent>
                </Tabs.TabPane>
              )}
              <Tabs.TabPane
                tab={intl.formatMessage({ id: 'tab_order_log' })}
                key="3"
              >
                <TabContent>
                  <OrderLog
                    orderId={orderId}
                    intl={intl}
                    updateMode={updateMode}
                  />
                </TabContent>
              </Tabs.TabPane>
              {enableSignature && (
                <Tabs.TabPane
                  tab={intl.formatMessage({ id: 'tab_order_signature' })}
                  key="4"
                >
                  <TabContent>
                    <SignatureTab form={form} />
                  </TabContent>
                </Tabs.TabPane>
              )}
            </Tabs>
          </Card>
        </LeftColWrapper>
        <RightColWrapper xs={12} sm={12} md={4}>
          <Card style={{ marginTop: 0, height: '100%' }}>
            <FieldLabel style={{ marginBottom: 20 }}>
              {intl.formatMessage({
                id: 'order_detail_display'
              })}
            </FieldLabel>
            <OrderService
              name="services"
              disabled={disabled}
              intl={intl}
              form={form}
            />
            {/* <TipsSelect
              name="charge.tips"
              intl={intl}
              label={intl.formatMessage({
                id: 'display_order_tips'
              })}
            /> */}
            {/* <TunnelSelect
              name="tunnels"
              intl={intl}
              label={intl.formatMessage({
                id: 'display_order_tunnel_fav'
              })}
              form={form}
            /> */}
            <Remarks
              name="remarks"
              disabled={disabled}
              intl={intl}
              label={intl.formatMessage({
                id: 'display_order_remarks'
              })}
            />
          </Card>
        </RightColWrapper>
        <ColWrapper xs={12}>
          <AmountCard>
            <span style={{ marginRight: 10 }}>
              {intl.formatMessage({
                id: 'display_order_all_amount'
              })}
              :
            </span>
            <AllAmountText>{amountText}</AllAmountText>
          </AmountCard>
        </ColWrapper>
      </RowWrapper>
    );

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.orders' })}</Title>
          <Title.Right>
            {allowEdit && this.renderButtons()}
            {updateMode && updatePeopleInCharge && updatePeopleInChargeStatus && (
              <SelectUserModal
                control={UserModalControl.users}
                modalTitle={intl.formatMessage({
                  id: 'display_order_update_people_charge'
                })}
                placeholder={intl.formatMessage({
                  id: 'display_order_update_people_charge'
                })}
                selected={orderId}
                updateMode={updateMode}
                formValue={peopleInCharge}
                query={{
                  userTypes: [UserType.USER],
                  statuses: [UserStatus.ACTIVE]
                }}
              >
                <Button.Primary type="button" style={{ marginTop: 0 }}>
                  {intl.formatMessage({
                    id: 'display_order_update_people_charge'
                  })}
                </Button.Primary>
              </SelectUserModal>
            )}
          </Title.Right>
        </Title.Wrapper>
        {inputConent}
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(OrderForm);
