import React from 'react';
import { Tabs as AntTabs } from 'antd';

const TabPane = AntTabs.TabPane;

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderTabs = () =>
      props.tabsList
        ? props.tabsList.map((tab, index) => {
            const Tab = tab.component;
            return (
              <TabPane tab={tab.name} key={index}>
                <Tab />
              </TabPane>
            );
          })
        : [];
  }
  static defaultProps = {
    tabsList: [],
    defaultActiveKey: '0'
  };

  render() {
    const { defaultActiveKey } = this.props;

    return (
      <AntTabs defaultActiveKey={defaultActiveKey}>{this.renderTabs()}</AntTabs>
    );
  }
}

export default Tabs;
