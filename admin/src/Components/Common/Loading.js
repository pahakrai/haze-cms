import React from 'react';
import Loading from 'react-loading';
import styled, { withTheme } from 'styled-components';

const FullScreenWrapper = styled.div`
  ${props =>
    props.isLoading
      ? props.fill === 'true'
        ? `
    position: fixed;
    left: 0;
    top: 0;
    padding-top:40vh;
    width: 100vw;
    height: 100vh;
    transform: translateY(-${props.height / 2}px);
    z-index: 10000;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(${props.height / 2}px);
      width: 100%;
      height: 100%;
      background-color: ${
        props.dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(256, 256, 256, 0.6)'
      };
      z-index: 1000;
    }
  `
        : ''
      : `display: none;`};
`;

const LoadingContainer = styled.div`
  margin: 0 auto;
  width: ${props => props.width}px;
  position: relative;
  z-index: 1001;
`;

export default withTheme(
  ({
    dark = false,
    isLoading,
    fill = true,
    width,
    height,
    type = 'bars',
    theme,
    style
  }) => {
    const loadingHeight = height || theme.measurements.loading.height;
    const loadingWidth = width || theme.measurements.loading.width;
    return (
      <FullScreenWrapper
        style={style}
        isLoading={isLoading}
        dark={dark}
        fill={fill ? 'true' : 'false'}
        width={loadingWidth}
        height={loadingHeight}
      >
        <LoadingContainer width={loadingWidth}>
          <Loading
            type={type}
            color={theme.color.primary}
            height={loadingHeight}
            width={loadingWidth}
          />
        </LoadingContainer>
      </FullScreenWrapper>
    );
  }
);
