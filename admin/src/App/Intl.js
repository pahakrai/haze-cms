import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import Languages from '../Locales';
const Intl = ({ intl, children }) => {
  return (
    <IntlProvider key={intl.locale} textComponent="span" {...intl}>
      {children}
    </IntlProvider>
  );
};

export default connect(state => {
  return {
    intl: {
      ...state.intl,
      messages: Languages[state.intl.locale.replace('-', '_')],
      onError: () => {}
    }
  };
})(Intl);
