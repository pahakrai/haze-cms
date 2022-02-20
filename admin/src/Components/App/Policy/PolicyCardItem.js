import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Label from '../../Common/Label';
import Card from '../../Common/Card';

const LabelField = styled(Label.Field)`
  height: 30px;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`;
export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export class PolicyCardItem extends React.PureComponent {
  render() {
    const { item, intl } = this.props;

    return (
      <React.Fragment>
        <Link
          style={{ ...LinkStyles }}
          to={`/policies/${item._id}`}
          target="_blank"
        >
          <Wrapper>
            <Item style={{ textAlign: 'center' }}>
              {item._id ? item._id.slice(0, 4) : ''}
            </Item>
            <Item>{item.name}</Item>
          </Wrapper>
        </Link>

        <CardWrapper>
          <Label>{intl.formatMessage({ id: 'display_id' })} </Label>
          <LabelField rows={1}>{item._id.slice(0, 4)}</LabelField>

          <Label>{intl.formatMessage({ id: 'display_name' })} </Label>
          <LabelField rows={1}>{item.name}</LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default PolicyCardItem;
