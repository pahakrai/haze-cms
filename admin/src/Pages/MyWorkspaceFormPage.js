import React from 'react';
import { Layout, Menu } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  DollarCircleOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  CodeOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import MyWorkspacePaymentMethodPage from '../Pages/MyWorkspacePaymentMethodPage';
import WorkspacePhoneRegionPage from '../Pages/WorkspacePhoneRegionPage';
import WorkspaceSubscriptionPage from '../Pages/WorkspaceSubscriptionPage';
import WorkspaceSubscriptionInvoicePage from '../Pages/WorkspaceSubscriptionInvoicePage';

import WorkspaceAppPage from '../Pages/WorkspaceAppPage';
import MyWorkspaceFormContainer from '../Containers/Workspace/MyWorkspaceForm';
import ContentContainer from '../Components/Common/ContentContainer';
import DocumentTitle from '../Components/Common/DocumentTitle';

import { getCurrentUser } from '../Redux/Account/selectors';

const { Header, Sider, Content } = Layout;

class Page extends React.Component {
  constructor(props) {
    super(props);
    const intl = props.intl;

    const isDisplay = action =>
      props.currentUser.actions.allows.includes(action);

    const menuItem = [
      {
        key: 1,
        url: '/my-workspace#account',
        icon: <SettingOutlined />,
        label: 'display_account_setting',
        child: (
          <ContentContainer>
            <MyWorkspaceFormContainer intl={intl} />
          </ContentContainer>
        ),
        display: isDisplay('MyWorkspace:Account')
      },
      {
        key: 2,
        url: '/my-workspace#subscription',
        icon: <CodeOutlined />,
        label: 'display_account_subscription',
        child: <WorkspaceSubscriptionPage intl={intl} onClick={this.onClick} />,
        display: isDisplay('MyWorkspace:Account:Subscription')
      },
      {
        key: 3,
        url: '/my-workspace#subscription-invoice',
        icon: <DollarOutlined />,
        label: 'display_subscription_invoice',
        child: <WorkspaceSubscriptionInvoicePage intl={intl} />,
        display: isDisplay('MyWorkspace:Account:SubscriptionInvoice')
      },
      {
        key: 4,
        url: '/my-workspace#payment-method',
        icon: <DollarCircleOutlined />,
        label: 'payment_method_display',
        child: <MyWorkspacePaymentMethodPage intl={intl} />,
        display: isDisplay('MyWorkspace:Account:PaymentMethod')
      },
      {
        key: 5,
        url: '/my-workspace#phone-region',
        icon: <PhoneOutlined />,
        label: 'display_user_phone_region_code',
        child: <WorkspacePhoneRegionPage intl={intl} />,
        display: isDisplay('MyWorkspace:Account:Region')
      },
      {
        key: 6,
        url: '/my-workspace#app',
        icon: <AppstoreOutlined />,
        label: 'display_workspace_app',
        child: <WorkspaceAppPage intl={intl} />,
        display: isDisplay('MyWorkspace:Account:App')
      }
    ];

    this.state = {
      collapsed: false,
      menuItem,
      isSelected: this.getHash(menuItem),
      defaultSelected: this.getHash(menuItem)
    };
  }

  getHash = menuItem => {
    switch (window.location.hash) {
      case '#account':
        return 1;
      case '#subscription':
        return 2;
      case '#subscription-invoice':
        return 3;
      case '#payment-method':
        return 4;
      case '#phone-region':
        return 5;
      case '#app':
        return 6;
      default:
        return (
          menuItem &&
          menuItem.filter(v => v.display).length > 0 &&
          menuItem.filter(v => v.display)[0].key
        );
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onClick = () => {
    this.setState({
      isSelected: 3,
      defaultSelected: '3'
    });
  };

  render() {
    const { intl } = this.props;
    const { isSelected, defaultSelected, menuItem } = this.state;
    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.workspace' })}>
        <Layout>
          <Sider
            style={{
              height: '100vh',
              left: 0
            }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              mode="inline"
              style={{ height: '100%' }}
              selectedKeys={[defaultSelected.toString()]}
              theme="dark"
            >
              {menuItem
                .filter(i => i.display)
                .map(v => (
                  <Menu.Item
                    key={v.key}
                    className="customclass"
                    style={{ marginTop: 0 }}
                    onClick={() => {
                      this.setState({
                        isSelected: v.key,
                        defaultSelected: v.key
                      });
                      window.location.href = v.url;
                    }}
                    icon={v.icon}
                  >
                    <FormattedMessage id={v.label} />
                  </Menu.Item>
                ))}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ paddingLeft: '2%' }}
            >
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle
                }
              )}
            </Header>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {menuItem.filter(v => v.key === isSelected)[0].child}
            </Content>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
);
