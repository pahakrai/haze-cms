import React, { useCallback } from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import { helpers } from '@golpasal/common';
import styled from 'styled-components';

import { formatUserName } from '../../../../Lib/util';
import Label from '../../../Common/Label';
import Card_base from '../../../Common/Card';
import Checkbox from '../../../Common/Checkbox';

const Card = styled(Card_base)`
  ${props => (props.checkBoxOnly ? '' : 'cursor: pointer;')}
  margin: 0;
`;

const ColWarp = styled(Col)`
  min-height: 10px !important;
  flex-direction: row;
  justify-content: flex-start;
`;

const ExpenseCard = ({
  expense,
  onSelect: onItemSelect,
  selected,
  checkBoxOnly
}) => {
  const intl = useIntl();
  const amount = `${expense.currency} ` + helpers.formatMoney(expense.amount);

  const onSelect = useCallback(() => {
    onItemSelect && onItemSelect(expense);
  }, [onItemSelect, expense]);

  return (
    <Card
      elevation={0}
      animateHover
      onClick={!checkBoxOnly ? onSelect : undefined}
      checkBoxOnly={checkBoxOnly}
    >
      <Row>
        <ColWarp xs={24} sm={24} md={2}>
          <Checkbox
            containerStyle={{ width: 'min-content' }}
            checked={selected}
            readOnly
            onClick={
              checkBoxOnly
                ? onSelect
                : e => {
                    if (e && e.stopPropagation) {
                      e.stopPropagation();
                    } else {
                      e.cancelBubble = true;
                    }
                  }
            }
          />
        </ColWarp>
        <ColWarp xs={24} sm={24} md={6}>
          <Label>
            {intl.formatMessage({
              id: 'display_expense_user'
            })}
          </Label>
          : {formatUserName(expense?.payer)}
        </ColWarp>
        <ColWarp xs={24} sm={24} md={6}>
          <Label>
            {intl.formatMessage({
              id: 'order_no_display'
            })}
          </Label>
          : {expense?.order?.orderNo}
        </ColWarp>
        <ColWarp xs={24} sm={24} md={4}>
          <Label>
            {intl.formatMessage({
              id: 'display_expense_type'
            })}
          </Label>
          : {expense?.expenseType?.name?.[intl.locale] || ''}
        </ColWarp>
        <ColWarp xs={24} sm={24} md={6}>
          <Label>
            {intl.formatMessage({
              id: 'display_expense_amount'
            })}
          </Label>
          : {amount}
        </ColWarp>
      </Row>
    </Card>
  );
};

export default ExpenseCard;
