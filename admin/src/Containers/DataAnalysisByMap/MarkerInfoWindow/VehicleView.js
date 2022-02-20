import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Label from '../../../Components/Common/Label';

import { formatUserName } from '../../../Lib/util';

export const VehicleView = ({ vehicle }) => {
  const plateNo = vehicle?.plateNo;

  return (
    <div style={{ minWidth: 140, maxWidth: 320 }}>
      <Label>
        <FormattedMessage id="display_vehicle_plateNo" />
      </Label>
      <LabelField>{plateNo || ''}</LabelField>
      <Label>
        <FormattedMessage id="display_user_username" />
      </Label>
      <LabelField>
        {formatUserName(vehicle) || vehicle?.username || ''}
      </LabelField>
      <Label>
        <FormattedMessage id="display_user_phone" />
      </Label>
      <LabelField>{vehicle?.phone || ''}</LabelField>
    </div>
  );
};

const LabelField = styled(Label.Field)`
  margin: 5px;
`;

export default VehicleView;
