import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import { getCategoriesForParent } from '../../Redux/selectors';
import { CategoryActions } from '../../Redux/Category/actions';

import Checkbox from '../../Components/Common/Checkbox';

const CategoryItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

class CategorySelectContainer extends React.PureComponent {
  static defaultProps = {
    indent: 0
  };
  componentDidMount() {
    const { getCategories, parent } = this.props;
    getCategories({ parent, aggregate: !parent });
  }

  onCategoryClick = (item, checked) => {
    const { selected, onChange } = this.props;
    if (checked) {
      onChange(selected.filter(o => o !== item._id));
    } else {
      onChange(selected.concat([item._id]));
    }
  };
  render() {
    const {
      categories,
      selected,
      onChange,
      indent,
      expanded,
      setExpanded,
      intl
    } = this.props;
    const { onCategoryClick } = this;
    return (
      <div style={{ marginLeft: `${indent * 20}px` }}>
        {categories.map(cat => (
          <div key={cat._id}>
            <CategoryItem>
              <Checkbox
                checked={selected.some(o => o === cat._id)}
                label={cat.name[intl.locale]}
                style={{ margin: '3px 0', flex: 1 }}
                onChange={onCategoryClick.bind(
                  this,
                  cat,
                  selected.some(o => o === cat._id)
                )}
              />
              {!cat.isTail && (
                <a
                  href="javacript:void(0);"
                  onClick={() => {
                    setExpanded(cat._id, !expanded[cat._id]);
                  }}
                >
                  {expanded[cat._id] ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </a>
              )}
            </CategoryItem>
            {expanded[cat._id] && (
              <CategorySelectConnected
                intl={intl}
                key={cat._id}
                parent={cat._id}
                selected={selected}
                indent={indent + 1}
                onChange={onChange}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.parent) {
    getCategoriesForParent(state, ownProps.parent);
  }
  return {
    expanded: state.category.expanded,
    categories: getCategoriesForParent(state, ownProps.parent) || []
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setExpanded: CategoryActions.setExpanded,
      getCategories: CategoryActions.getCategories
    },
    dispatch
  );
const CategorySelectConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelectContainer);

export default props => (
  <CategorySelectConnected {...props} parent={props.parent || null} />
);
