import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  margin-top: 10%;
  width: 90%;
  max-width: 400px;
`;

export default props => (
  <Root>
    <Content {...props} />
  </Root>
);
