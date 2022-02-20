import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Layout, Row } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const SearchButtonWrap = styled.div`
  margin-bottom: 10px;
`;
const RightLayoutWrapper = styled.div`
  padding-left: ${({ haveMargin, theme }) =>
    haveMargin ? theme.measurements.contentPadding / 2 : 0}px;
`;
const RightLayoutCardWrapper = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  padding: 24px 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
`;
const LeftLayoutCardWrapper = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  padding: 0px 20px;
  padding-bottom: 24px;
  padding-top: 24px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
`;
export class SiderLayout extends PureComponent {
  static propTypes = {
    silderWidth: PropTypes.number
  };

  static defaultProps = {
    silderWidth: 300
  };

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

  _onSiderBreakpoint = broken => {
    this.setState({
      showTrigger: broken ? true : null
    });
  };

  render() {
    const { silderWidth, children } = this.props;
    const { hideSider, showTrigger } = this.state;
    const siderTrigger = !hideSider ? showTrigger : null;
    const { _handleChangeSearchSiderDisplay, _onSiderBreakpoint } = this;
    const childrenIsArray = Array.isArray(children);
    const siderLayout = childrenIsArray ? children[0] : children;
    const rightLayout = childrenIsArray ? children[1] : <Row />;

    return (
      <Layout>
        <Layout.Sider
          breakpoint="xs"
          collapsedWidth="0"
          theme="light"
          width={silderWidth}
          trigger={siderTrigger}
          collapsible
          collapsed={hideSider}
          onCollapse={_handleChangeSearchSiderDisplay}
          onBreakpoint={_onSiderBreakpoint}
        >
          <LeftLayoutCardWrapper bordered={false}>
            {siderLayout}
          </LeftLayoutCardWrapper>
        </Layout.Sider>
        <Layout style={{ display: siderTrigger === null ? 'block' : 'none' }}>
          <RightLayoutWrapper haveMargin={!hideSider}>
            <RightLayoutCardWrapper>
              <SearchButtonWrap>
                <Button
                  icon={
                    hideSider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={_handleChangeSearchSiderDisplay}
                />
              </SearchButtonWrap>
              {rightLayout}
            </RightLayoutCardWrapper>
          </RightLayoutWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default SiderLayout;
