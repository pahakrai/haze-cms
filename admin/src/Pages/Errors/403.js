import React from 'react';
// style
import styled from 'styled-components';

const Content = styled.div`
  text-align: center;
  padding-top: 15%;
  display: block;
`;
const ErrorImg = styled.img`
  margin-top: -100px;
`;

const Title = styled.div`
  font-size: 90pt;
  font-family: HanWangKaiBold-Gb5;
  font-weight: normal;
  color: rgba(0, 0, 0, 1);
  display: inline-block;
`;

export default () => (
  <Content>
    <Title>403</Title>
    <ErrorImg src="/images/error_img.png" width="280px" />
  </Content>
);
