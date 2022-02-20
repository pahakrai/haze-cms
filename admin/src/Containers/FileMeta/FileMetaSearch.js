import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

import { FileMetaActions } from '../../Redux/FileMeta/actions';

import TextInput from '../../Components/Common/TextInput';

class FileMetaSearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSearchTermChanged = debounce(this.onSearchTermChanged, 500);
  }

  onSearchTermChanged(searchTerm) {
    const { setSearchTerm } = this.props;
    setSearchTerm(searchTerm);
  }

  render() {
    const { searchTerm, intl } = this.props;
    return (
      <TextInput
        value={searchTerm}
        placeholder={intl.formatMessage({ id: 'search_placeholder' })}
        onChange={this.onSearchTermChanged.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => ({ searchTerm: state.fileMeta.searchTerm });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSearchTerm: FileMetaActions.setSearchTerm
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileMetaSearchContainer);
