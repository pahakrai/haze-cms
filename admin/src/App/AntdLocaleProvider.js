import React from 'react';
import { ConfigProvider } from 'antd';
import { connect } from 'react-redux';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import zh_TW from 'antd/lib/locale-provider/zh_TW';
import en_US from 'antd/lib/locale-provider/en_US';

const LOCALES = {
  'zh-cn': zh_CN,
  'zh-hk': zh_TW,
  en: en_US
};
const AntdLocaleProvider = ({ intl, children }) => {
  return (
    <ConfigProvider locale={LOCALES[intl.locale]}>{children}</ConfigProvider>
  );
};

export default connect(state => {
  return {
    intl: state.intl
  };
})(AntdLocaleProvider);
