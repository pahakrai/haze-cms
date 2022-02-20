import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';

// common component
import Card from '../../Common/Card';
import AddButton from './AddButton';
import FormError from '../Error';
import Button from '../../Common/Button';

import RowItem from './RowItem';
import DragDropItems from './DragDropItems';

export const CardContent = styled(Card.Content)`
  overflow-y: unset;
  padding-bottom: 0px;
`;
const AddButtonComponent = ({ onClick, disabled }) => {
  return (
    <Button.Right>
      <AddButton full type="button" onClick={onClick} disabled={disabled}>
        +
      </AddButton>
    </Button.Right>
  );
};

const HorizontalCenterError = styled(FormError)`
  text-align: center;
`;
export class InvoiceItemsForm extends PureComponent {
  _deleteItem = index => {
    const {
      input: { onChange, value: items }
    } = this.props;
    const newItem = [...items];
    newItem.splice(index, 1);

    onChange(newItem);
  };

  _onAddClick = () => {
    const {
      input: { onChange, value: items },
      defaultItemValue = {},
      notObject
    } = this.props;

    const defaultValue = notObject ? '' : { ...defaultItemValue };

    onChange([...items, defaultValue]);
  };

  _onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    const startIndex = source.index;
    const endIndex = destination.index;
    const {
      input: { onChange, value: list }
    } = this.props;
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    onChange(result);
  };

  render() {
    const {
      intl,
      label,
      noLabel,
      contentStyle,
      marginTop,
      input: { value: items, name: rootName },
      childFields,
      disabled,
      dropDisabled,
      hideAdd,
      notObject
    } = this.props;
    return (
      <React.Fragment>
        {!noLabel && <Card.Title style={{ margin: 0 }}>{label}</Card.Title>}
        <CardContent style={contentStyle}>
          <HorizontalCenterError name="items" />
          <DragDropItems
            onDragEnd={this._onDragEnd}
            isDropDisabled={dropDisabled}
          >
            {items && items.length
              ? items.map((item, index) => {
                  return (
                    <RowItem
                      key={index}
                      data={item}
                      index={index}
                      intl={intl}
                      notObject={notObject}
                      marginTop={marginTop}
                      disabled={disabled}
                      rootName={rootName}
                      deleteItem={this._deleteItem}
                      childFields={childFields}
                    />
                  );
                })
              : null}
          </DragDropItems>
          {!hideAdd && (
            <AddButtonComponent
              disabled={disabled}
              onClick={this._onAddClick}
            />
          )}
        </CardContent>
      </React.Fragment>
    );
  }
}
export default props => {
  return <Field component={InvoiceItemsForm} {...props} />;
};
