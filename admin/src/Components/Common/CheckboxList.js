import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Checkbox from './Checkbox';
import Button from './Button';
import H4 from './H4';

const ActionButton = styled(Button)`
  min-width: auto;
  box-shadow: 0 1px 15px 1px rgba(69, 65, 78, 0.08);
  margin-right: 5px;
`;
const CheckboxContainer = styled.div`
  cursor: pointer;
  padding: 2px 0;
`;

export default class CheckboxList extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    ),
    selectedItems: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    title: PropTypes.string,
    onSelectedItemsChange: PropTypes.func,
    multiple: PropTypes.bool
  };

  static defaultProps = {
    onSelectedItemsChange: () => true
  };

  onItemClick = val => {
    const { selectedItems, onSelectedItemsChange, multiple } = this.props;
    if (multiple) {
      const selectedItemIndex = selectedItems.indexOf(val);
      const newSelectedItems = selectedItems.slice(0);
      if (selectedItemIndex !== -1) {
        // it is inside, take it out
        newSelectedItems.splice(selectedItemIndex, 1);
      } else {
        newSelectedItems.push(val);
      }
      onSelectedItemsChange(newSelectedItems);
    } else {
      onSelectedItemsChange([val]);
    }
  };

  onSelectAll = () => {
    const { items, onSelectedItemsChange } = this.props;
    onSelectedItemsChange(items.map(item => item.value));
  };

  onDeselectAll = () => {
    const { onSelectedItemsChange } = this.props;
    onSelectedItemsChange([]);
  };
  render() {
    const { onItemClick, onSelectAll, onDeselectAll } = this;
    const {
      items,
      title,
      selectedItems,
      selectAll,
      deselectAll,
      disabled
    } = this.props;

    return (
      <div>
        {title && <H4>{title}</H4>}
        {selectAll && (
          <ActionButton disabled={disabled} onClick={onSelectAll}>
            All
          </ActionButton>
        )}
        {deselectAll && (
          <ActionButton disabled={disabled} onClick={onDeselectAll}>
            None
          </ActionButton>
        )}
        {items.map(item => (
          <CheckboxContainer key={item.value}>
            <Checkbox
              disabled={disabled || items.disabled}
              label={item.text}
              checked={selectedItems.indexOf(item.value) !== -1}
              onChange={onItemClick.bind(this, item.value)}
            />
          </CheckboxContainer>
        ))}
      </div>
    );
  }
}
