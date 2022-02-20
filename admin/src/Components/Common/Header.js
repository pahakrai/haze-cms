import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Waypoint } from 'react-waypoint';

const HeaderContainer = styled.div`
  position: ${props => (props.fixed ? 'fixed' : 'relative')};
  height: 50px;
  width: 100%;
  left: 0;
  top: 0;
`;

export default class Header extends React.PureComponent {
  static propTypes = {
    // whether header is fixed
    fixed: PropTypes.bool,
    // threshold where header becomes fixed
    toFixedThreshold: PropTypes.number,
    // classname on pass threshold
    belowThresholdClassname: PropTypes.string,
    // on traverse threshold change
    onThresholdChange: PropTypes.func
  };
  static defaultProps = {
    onThresholdChange: () => true
  };
  constructor(props) {
    super(props);
    this.state = { isPassFixedThreshold: false };
  }
  handlePositionChange(pos) {
    const { onThresholdChange } = this.props;
    onThresholdChange(pos.currentPosition !== 'inside');
    this.setState({
      isPassFixedThreshold: pos.currentPosition !== 'inside'
    });
  }
  render() {
    const {
      className,
      children,
      fixed,
      toFixedThreshold,
      belowThresholdClassname
    } = this.props;
    const { handlePositionChange } = this;
    const { isPassFixedThreshold } = this.state;
    return (
      <div>
        <HeaderContainer
          fixed={fixed || isPassFixedThreshold}
          className={
            className +
            (toFixedThreshold && isPassFixedThreshold
              ? ' ' + belowThresholdClassname
              : '')
          }
        >
          {children}
        </HeaderContainer>
        {toFixedThreshold && (
          <div style={{ position: 'absolute', top: toFixedThreshold + 'px' }}>
            <Waypoint onPositionChange={handlePositionChange.bind(this)} />
          </div>
        )}
      </div>
    );
  }
}
