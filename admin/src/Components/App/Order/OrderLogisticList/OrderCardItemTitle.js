import React from 'react';
import Common from '@golpasal/common';
import styled from 'styled-components';

import { Wrapper, Item, CheckboxItem, ActionsItem } from '../../ListCard/title';
import Checkbox from '../../../Common/Checkbox';

export const CardWrapper = styled('div')`
  margin: 20px 0 0 20px;
  @media (min-width: 700px) {
    display: none;
  }
`;

const { OrderLogisticLocationType } = Common.type;
export default ({
  intl,
  currentWorkspace,
  selected,
  checkAll,
  handleCheckAll
}) => {
  const hasInvoice = currentWorkspace?.preferences?.order?.hasInvoice;
  const locationType = currentWorkspace?.preferences?.order?.locationType;

  return (
    <div>
      <Wrapper>
        <CheckboxItem>
          <Checkbox
            checked={checkAll}
            onChange={handleCheckAll}
            containerStyle={{ display: 'inline-block' }}
          />
        </CheckboxItem>
        <Item>{intl.formatMessage({ id: 'order_no_display' })}</Item>
        <Item>{intl.formatMessage({ id: 'display_order_date' })}</Item>
        <Item>{intl.formatMessage({ id: 'display_order_type' })}</Item>
        <Item>{intl.formatMessage({ id: 'display_vehicle_type' })}</Item>
        <Item>
          {intl.formatMessage({ id: 'display_order_location_start' })}
        </Item>
        <Item>
          {intl.formatMessage({
            id:
              locationType === OrderLogisticLocationType.STORE
                ? 'display_order_store_to'
                : 'display_order_location_end'
          })}
        </Item>
        <Item>{intl.formatMessage({ id: 'status' })}</Item>
        <Item>
          {intl.formatMessage({ id: 'display_logistic_order_amount' })}
        </Item>
        <Item style={{ width: 180 }}>
          {intl.formatMessage({ id: 'display_order_schedule_time' })}
        </Item>
        {hasInvoice && (
          <ActionsItem>
            {intl.formatMessage({
              id: 'actions'
            })}
          </ActionsItem>
        )}
      </Wrapper>

      <CardWrapper>
        <Checkbox
          checked={checkAll}
          onChange={handleCheckAll}
          containerStyle={{ display: 'inline-block' }}
        />
      </CardWrapper>
    </div>
  );
};
