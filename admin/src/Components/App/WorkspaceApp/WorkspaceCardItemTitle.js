import React from 'react';
import styled from 'styled-components';

import { Wrapper, Item } from '../ListCard/title';

export const WrapperTitle = styled(Wrapper)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

export default ({ intl }) => {
  return (
    <WrapperTitle>
      <Item>{intl.formatMessage({ id: 'display_workspace_app_name' })} </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_workspace_app_ios_latestVersionNo'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_workspace_app_ios_releaseDate'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_workspace_app_android_latestVersionNo'
        })}
      </Item>
      <Item>
        {intl.formatMessage({
          id: 'display_workspace_app_android_releaseDate'
        })}
      </Item>
    </WrapperTitle>
  );
};
