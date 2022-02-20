import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderActions } from '../../Redux/Order/actions';
import FilterLayout from '../../Components/Common/FilterLayout';
import TextInput from '../../Components/Common/TextInput';

class OrderSearchContainer extends React.PureComponent {
  render() {
    const { onChanged, intl } = this.props;
    return (
      <FilterLayout.FilterRow>
        <FilterLayout.FilterLabel>
          {intl.formatMessage({ id: 'search' })}:{' '}
        </FilterLayout.FilterLabel>
        <FilterLayout.FilterInput>
          <TextInput
            placeholder={intl.formatMessage({ id: 'search_placeholder' })}
            onChange={onChanged}
          />
        </FilterLayout.FilterInput>
      </FilterLayout.FilterRow>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrders: OrderActions.getOrders
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSearchContainer);
