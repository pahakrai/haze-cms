import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CurrencyActions } from '../../Redux/Currency/actions';
import { getCurrencies } from '../../Redux/selectors';

import Dropdown from '../../Components/Form/Dropdown';

export class CategoryDropdown extends PureComponent {
  componentDidMount() {
    const { currencies, getCurrencies } = this.props;
    (!currencies || currencies.length === 0) && getCurrencies();
  }
  render() {
    const { intl, currencies, codeMode = true, ...props } = this.props;
    const currencyOptions = [];
    if (currencies) {
      currencies.forEach(currency => {
        currencyOptions.push({
          label: currency.code,
          value: codeMode ? currency.code : currency._id
        });
      });
    }
    return (
      <Dropdown
        label={intl.formatMessage({
          id: 'currency'
        })}
        options={currencyOptions}
        {...props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currencies: getCurrencies(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCurrencies: CurrencyActions.getCurrencies
    },
    dispatch
  );
export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)
);
