import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexa';
import styled from 'styled-components';

import DeleteButton from './DeleteButton';

import { ITEMS_COL_GUTTER, ITEMS_ROW_GUTTER } from './common';

export default class RowItem extends PureComponent {
  deleteItem = () => {
    const { index, deleteItem } = this.props;
    deleteItem(index);
  };
  render() {
    const {
      childFields,
      index,
      intl,
      data,
      rootName,
      disabled,
      marginTop,
      notObject
    } = this.props;

    return (
      <Container>
        <Row
          style={{ flex: 1 }}
          gutter={ITEMS_ROW_GUTTER}
          justifyContent={{ xs: 'flex-end', md: 'flex-end' }}
        >
          {Array.isArray(childFields)
            ? childFields.map(({ component: Comp, name, others, colProps }) => {
                const itemName = notObject
                  ? `${rootName}[${index}]`
                  : `${rootName}[${index}].${name}`;

                return (
                  <Col key={itemName} {...colProps} gutter={ITEMS_COL_GUTTER}>
                    <Comp
                      name={itemName}
                      intl={intl}
                      disabled={disabled}
                      {...others}
                    />
                  </Col>
                );
              })
            : typeof childFields === 'function'
            ? childFields({ index, data })
            : false}
        </Row>
        <DeleteButton
          style={{
            marginBottom: 20,
            marginTop: marginTop ? marginTop : 0,
            marginLeft: 10
          }}
          full
          type="button"
          onClick={this.deleteItem}
          disabled={disabled}
        >
          x
        </DeleteButton>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
