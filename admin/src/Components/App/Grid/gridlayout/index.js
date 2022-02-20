import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { MdClose } from 'react-icons/md';

const Grid = styled.div`
  position: relative;
  background-color: #f3f2ef;
`;

const CloseButton = styled(MdClose)`
  border-radius: ${props => props.size / 2}px;
  padding: 2px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  :hover {
    background-color: #eeeeee;
  }
`;

const OpacityType = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible'
};

const OpacityBox = posed.div({
  [OpacityType.HIDDEN]: { opacity: 0 },
  [OpacityType.VISIBLE]: { opacity: 1 }
});

const OpacityLayout = styled(OpacityBox)`
  position: absolute;
  top: -${props => props.size / 2}px;
  right: -${props => props.size / 2}px;
  overflow: auto;
`;

export default class GridItem extends React.PureComponent {
  state = {
    opacityStatus: false
  };
  _onChangeOpacityStatus = opacityStatus => {
    this.setState({ opacityStatus });
  };
  render() {
    const { opacityStatus } = this.state;
    const { children, onClose, ...res } = this.props;
    const { isCloseable = false } = res['data-grid'] || {};
    return (
      <Grid
        {...res}
        onMouseEnter={() => this._onChangeOpacityStatus(true)}
        onMouseLeave={() => this._onChangeOpacityStatus(false)}
      >
        {children}
        {isCloseable && (
          <OpacityLayout
            size={25}
            pose={opacityStatus ? OpacityType.VISIBLE : OpacityType.HIDDEN}
          >
            <CloseButton size={25} onClick={onClose || (() => {})} />
          </OpacityLayout>
        )}
      </Grid>
    );
  }
}
