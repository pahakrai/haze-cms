import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CategoryActions } from '../../Redux/Category/actions';
import { getAllCategory } from '../../Redux/selectors';

import DropdownTree from '../../Components/Form/DropdownTree';

export class CategoryDropdown extends PureComponent {
  componentDidMount() {
    const { getAllCategory } = this.props;
    getAllCategory({ aggregate: false, isActive: true }, true);
  }
  render() {
    const { intl, getAllCategory, ...props } = this.props;
    return (
      <div className="form-category-select" style={{ paddingTop: 1 }}>
        <DropdownTree
          label={intl.formatMessage({
            id: 'categories'
          })}
          intl={intl}
          {...props}
        />
      </div>
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
