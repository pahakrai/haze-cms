import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Title from '../../Components/Common/H5';
import Spacer from '../../Components/Common/Spacer';
import Button from '../../Components/Common/Button';

const BottomTableLayoutCardWrapper = styled(Col)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  padding: 8px 16px;
  margin: 0px !important;
  border-radius: 4px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
`;
const TopControlLayoutCardWrapper = styled(Row)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  padding: 8px 16px;
  border-radius: 4px;
  margin: 0px !important;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
`;

export class FilterLayout extends PureComponent {
  constructor() {
    super();
    this.state = {
      showTrigger: null,
      hideSider: false
    };
  }
  _handleChangeSearchSiderDisplay = () => {
    this.setState({
      hideSider: !this.state.hideSider
    });
  };

  render() {
    const {
      children: _children,
      gutter,
      bp: { xs, sm, md, lg, xl } = {},
      noSearch = false,
      barRef,
      renderSpace,
      barClassName,
      bottomLayoutStyle
    } = this.props;
    const isArray = Array.isArray(_children);
    const children = isArray ? _children.filter(v => v) : _children;
    const bottomLayout = isArray ? children[children.length - 1] : <Fragment />;
    const _gutter = gutter || 32;
    return (
      <React.Fragment>
        {!noSearch && (
          <TopControlLayoutCardWrapper
            type="flex"
            align="middle"
            gutter={[_gutter, _gutter]}
            ref={barRef}
            className={barClassName}
          >
            {React.Children.map(children, (child, index) => {
              if (index === children.length - 1) return <Fragment />;
              return (
                <Col
                  xs={xs || 24}
                  sm={sm || 24}
                  md={md || 12}
                  lg={lg || 8}
                  xl={xl || 6}
                >
                  {child}
                </Col>
              );
            })}
          </TopControlLayoutCardWrapper>
        )}
        {!renderSpace ? (
          <Spacer height={Math.min(16, _gutter)} />
        ) : (
          renderSpace()
        )}
        <BottomTableLayoutCardWrapper
          gutter={[_gutter, _gutter]}
          style={bottomLayoutStyle}
        >
          {bottomLayout}
        </BottomTableLayoutCardWrapper>
      </React.Fragment>
    );
  }
}

// for filter input label
FilterLayout.FilterLabel = styled(Title)`
  display: block;
  margin-right: 1em;
  min-width: 32px;
`;
// for filter input
FilterLayout.FilterInput = styled.div`
  flex: 1;
`;
// for filter contanier (input and lable)
FilterLayout.FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
// for filter search button group
FilterLayout.ButtonFloatLayout = styled.div`
  margin-right: ${props => props.marginRight}px;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: flex-end;
`;
// for filter search button
FilterLayout.SearchButton = styled(Button.Primary)`
  margin: 0px 8px 0px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// for filter layout create button
FilterLayout.CreateButton = styled(Button.Primary)`
  margin: 0px 8px 10px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreateButton = FilterLayout.CreateButton;
export const SearchButton = FilterLayout.SearchButton;

export default FilterLayout;
