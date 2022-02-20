import React from 'react';
import LoadingComponent from 'react-loading';
import styled, { withTheme } from 'styled-components';

export const Loading = withTheme(({ loading, theme }) => {
  return loading ? (
    <LoadingIcon>
      <LoadingComponent
        type="spokes"
        color={theme.color.primary}
        height={15}
        width={15}
      />
    </LoadingIcon>
  ) : (
    <></>
  );
});

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LoadingIcon = styled.div`
  margin-left: 5px;
`;

export default Loading;
