import React from 'react';
import styled from 'styled-components';
import EcommCommonType, {
  helpers as EcommCommonHelpers
} from '@golpasal/common';
// Time
import moment from 'moment';
// antd ui
import { Switch } from 'antd';

import { formatUserName } from '../../../Lib/util';

export const Wrapper = styled.div`
  width: 100%;
  padding: 15px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`;

export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

export default ({
  data,
  intl,
  onCancel,
  onToggle,
  userScheduleStatusLoading
}) => {
  let userScheduleStatus = EcommCommonHelpers.getConstantByValue(
    'status',
    'UserScheduleStatus',
    data.status,
    intl.locale
  );
  return (
    <Wrapper>
      <Item>{formatUserName(data && data.user)}</Item>
      <Item>{moment(data.from).format('YYYY-MM-DD')}</Item>
      <Item>{moment(data.to).format('YYYY-MM-DD')}</Item>
      <Item>{userScheduleStatus && userScheduleStatus.text}</Item>
      <Item>
        <Switch
          loading={userScheduleStatusLoading}
          disabled={userScheduleStatusLoading}
          onChange={() =>
            onToggle({
              id: data._id,
              status:
                data.status === EcommCommonType.status.UserScheduleStatus.DRAFT
                  ? EcommCommonType.status.UserScheduleStatus.CONFIRMED
                  : EcommCommonType.status.UserScheduleStatus.DRAFT
            })
          }
          defaultChecked={
            data.status === EcommCommonType.status.UserScheduleStatus.CONFIRMED
          }
          type="number"
        />
      </Item>
    </Wrapper>
  );
};
