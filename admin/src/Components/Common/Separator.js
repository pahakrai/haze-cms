import React from 'react';
import styled from 'styled-components';

const VerticalSeparator = styled.div`
  border-left: 1px solid #bdbdbd;
  margin: 0 8px;
  padding: 2px 0;
  display: inline-block;
  height: 100%;
  box-sizing: border-box;
`;

const HorizontalSeparator = styled.div`
  border-top: 1px solid #bdbdbd;
  margin: 2px;
  width: 100%;
  box-sizing: border-box;
`;

export default props => {
  return props.vertical ? (
    <VerticalSeparator {...props} />
  ) : (
    <HorizontalSeparator {...props} />
  );
};
