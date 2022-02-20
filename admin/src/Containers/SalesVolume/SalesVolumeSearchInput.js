import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SalesVolumeActions } from '../../Redux/SalesVolume/actions';
import FilterLayout from '../../Components/Common/FilterLayout';
import TextInput from '../../Components/Common/TextInput';

class SalesVolumeSearchContainer extends React.PureComponent {
  onSearch = () => {
    const { getSalesVolumes, query } = this.props;
    getSalesVolumes({
      query
    });
  };

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
      getSalesVolumes: SalesVolumeActions.getSalesVolumes
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesVolumeSearchContainer);
