import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Label from '../../Common/Label';
import Card from '../../Common/Card';
import hasIn from 'lodash/hasIn';
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
  text-align: center;
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

export class CourierCardItem extends React.PureComponent {
  render() {
    const { item, intl } = this.props;
    const name = hasIn(item, `name.${intl.locale}`)
      ? item.name[intl.locale]
      : '';
    const isActive = item.isActive;
    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/couriers/${item._id}`}
            target="_blank"
          >
            <Item>{item.code}</Item>
            <Item>{name}</Item>
            <Item>{item.idx}</Item>
            <Item>
              {isActive
                ? intl.formatMessage({ id: 'display_available' })
                : intl.formatMessage({ id: 'display_unavailable' })}
            </Item>
          </Link>
        </Wrapper>

        <CardWrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/couriers/${item._id}`}
            target="_blank"
          >
            <Label>
              {intl.formatMessage({ id: 'display_workspace_code' })}{' '}
            </Label>
            <LabelField rows={1}>{item.code}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_name' })} </Label>
            <LabelField rows={1}>{name}</LabelField>
            <Label>{intl.formatMessage({ id: 'idx' })} </Label>
            <LabelField rows={1}>{item.idx}</LabelField>
            <Label>
              {intl.formatMessage({
                id: 'display_pushnotificationschedule_isActive'
              })}
            </Label>
            <LabelField rows={1}>
              {isActive
                ? intl.formatMessage({ id: 'display_available' })
                : intl.formatMessage({ id: 'display_unavailable' })}
            </LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default CourierCardItem;
