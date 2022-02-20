import React from 'react';
import { Tabs as AntTabs } from 'antd';

const TabPane = AntTabs.TabPane;

class TabInputs extends React.PureComponent {
  static defaultProps = {
    children: [],
    keys: [],
    defaultActiveKey: '0'
  };

  render() {
    const { defaultKey, keys, children } = this.props;

    return (
      <AntTabs
        defaultActiveKey={defaultKey}
        tabBarStyle={{ zIndex: 0 }}
        style={{ zIndex: 0 }}
      >
        {keys.map((key, index) => (
          <TabPane tab={key} key={index}>
            {children[index]}
          </TabPane>
        ))}
      </AntTabs>
    );
  }
}

export default TabInputs;
