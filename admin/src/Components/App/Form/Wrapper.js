import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';

import Card from '../../Common/Card';

export const RowWrapper = props => <Row gutter={0} {...props} />;
export const ColWrapper = styled(Col)`
  @media (min-width: 0px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;
export const LeftColWrapper = styled(ColWrapper)`
  @media (min-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    padding-right: 7px;
  }
`;
export const RightColWrapper = styled(ColWrapper)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    padding-top: 7px;
  }
`;
export const FormCard = styled(Card)`
  margin-top: 0px;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
`;
