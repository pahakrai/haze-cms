import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center center; */
`;

export default class ErrorLayout extends React.PureComponent {
  static propTypes = {};

  render() {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}
