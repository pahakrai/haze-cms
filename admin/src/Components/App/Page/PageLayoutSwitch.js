import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Switch from '../../Common/Switch';

const Row = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageLayoutSwitch = ({ value, onToggle }) => (
  <Row>
    <FormattedMessage id={'nav.layouts'} style={{ marginLeft: 10 }} />
    {`：`}
    <Switch value={value} onToggle={onToggle} />
  </Row>
);

export default PageLayoutSwitch;
