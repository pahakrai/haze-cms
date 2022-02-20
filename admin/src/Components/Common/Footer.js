import React from 'react';
import styled from 'styled-components';
import Measure from 'react-measure';

const FloatFooterContainer = styled.div`
  position: ${props => (props.fixed ? 'fixed' : 'absolute')};
  left: 0;
  right: 0;
  bottom: 0;
`;

const FooterContainer = styled.div`
  height: ${props => props.height}px;
`;

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }
  render() {
    const { children, fixed, ...rest } = this.props;
    const { height } = this.state;
    return (
      <FooterContainer height={height}>
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ height: contentRect.bounds.height });
          }}
        >
          {({ measureRef }) => {
            return (
              <FloatFooterContainer fixed={fixed}>
                <div ref={measureRef} {...rest}>
                  {children}
                </div>
              </FloatFooterContainer>
            );
          }}
        </Measure>
      </FooterContainer>
    );
  }
}

export default styled(Footer)``;
