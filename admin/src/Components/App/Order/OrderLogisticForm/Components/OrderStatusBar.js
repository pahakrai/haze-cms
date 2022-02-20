import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import Common from '@golpasal/common';

import StepLine from '../../../../Common/StepLine';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
// cancel
const CancelWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 79px;
`;
const CancelIcon = styled.img`
  height: 40px;
`;
const CancelText = styled.div`
  margin-left: 8px;
  font-size: 16px;
`;
const { TravelOrderStatus } = Common.status;

class OrderStatusBarComponent extends PureComponent {
  render() {
    const {
      input,
      // meta: { touched, error, warning },
      intl
    } = this.props;

    const statusOptions = [
      [
        0,
        intl.formatMessage({
          id: 'display_order_logistic_status_place'
        })
      ],
      [
        TravelOrderStatus.AWAITING,
        Common.locales[intl.locale].status.TravelOrderStatus.AWAITING
      ], //1
      [
        TravelOrderStatus.DRIVER_ACCEPTED,
        Common.locales[intl.locale].status.TravelOrderStatus.DRIVER_ACCEPTED
      ], //10
      [
        TravelOrderStatus.ARRIVE_DESTINATION,
        Common.locales[intl.locale].status.TravelOrderStatus.ARRIVE_DESTINATION
      ] //100
    ].map(v => ({ label: v[1], value: v[0] }));

    return (
      <Wrapper>
        {input.value === Common.status.TravelOrderStatus.CANCELLED ? (
          <CancelWrapper>
            <CancelIcon src="/images/icons/exclamation_mark.png" alt="" />
            <CancelText>
              {intl.formatMessage({ id: 'display_order_canceled' })}
            </CancelText>
          </CancelWrapper>
        ) : (
          <StepLine stepOptions={statusOptions} value={input.value} />
        )}
      </Wrapper>
    );
  }
}

export const OrderStatusBar = props => {
  return <Field {...props} component={OrderStatusBarComponent} />;
};

export default OrderStatusBar;
