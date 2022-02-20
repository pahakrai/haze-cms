/* @flow */

import React from 'react';
import Footer from '../../Components/Common/Footer';
import styled from 'styled-components';

const FooterStyled = styled(Footer)`
  background-color: #ececec;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding: 20px;
  min-height: 100px;
`;

export default (props: Object) => {
  return <FooterStyled>Page Content</FooterStyled>;
};
