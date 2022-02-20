import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoryActions } from '../../../Redux/Category/actions';
import { getAllCategory } from '../../../Redux/selectors';

import DropdownTree from '../../../Components/DropdownTree';

export class CategoryDropdown extends PureComponent {
  componentDidMount() {
    const { getAllCategory } = this.props;
    getAllCategory({ aggregate: false, isActive: true }, true);
  }
  render() {
    const { intl, onChange, ...props } = this.props;
    return (
      <DropdownTree
        intl={intl}
        input={{
          value: [],
          onChange: v => onChange(props.categories.find(_v => _v._id === v))
        }}
        {...props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: getAllCategory(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCategory: CategoryActions.getAllCategory
    },
    dispatch
  );
export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)
);
