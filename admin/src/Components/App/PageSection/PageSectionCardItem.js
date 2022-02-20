import React from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

import Label from '../../Common/Label';
import Card from '../../Common/Card';

import { isLayoutType } from './Utils';

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
export class PageCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl, isSection } = this.props;
    if (!item) {
      return null;
    }
    const createdAt = moment(item.createdAt).format('YYYY-MM-DD');
    const isActive = item.isActive;
    const path = item.path;
    const title = item.title[intl.locale];
    const isHideSomeField = isLayoutType(item);
    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={
              isSection ? `/page-section/${item._id}` : `/page-seo/${item._id}`
            }
            target="_blank"
          >
            {!isHideSomeField && <Item>{path}</Item>}
            <Item>{title}</Item>
            <Item>
              {isActive
                ? intl.formatMessage({ id: 'display_page_active' })
                : intl.formatMessage({ id: 'display_page_inactive' })}
            </Item>
            <Item>{createdAt}</Item>
          </Link>
        </Wrapper>
        <CardWrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/page-section/${item._id}`}
            target="_blank"
          >
            {!isHideSomeField && (
              <React.Fragment>
                <Label>{intl.formatMessage({ id: 'display_page_path' })}</Label>
                <LabelField rows={1}>{path}</LabelField>
              </React.Fragment>
            )}
            <Label>{intl.formatMessage({ id: 'display_page_title' })}</Label>
            <LabelField rows={1}>{title}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_page_status' })}</Label>
            <LabelField rows={1}>
              {isActive
                ? intl.formatMessage({ id: 'display_page_active' })
                : intl.formatMessage({ id: 'display_page_inactive' })}
            </LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_page_created_at' })}
            </Label>
            <LabelField rows={1}>{createdAt}</LabelField>
            <Label>
              {intl.formatMessage({ id: 'display_page_created_at' })}
            </Label>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default PageCardItem;
