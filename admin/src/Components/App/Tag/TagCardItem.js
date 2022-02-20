import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

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

export class OrderCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl } = this.props;

    if (!item) {
      return null;
    }
    let image = 0;

    if (item.file && item.file[0]) {
      if (item.file[0].thumbnailUri) {
        image = item.file[0].thumbnailUri;
      } else {
        image =
          'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782';
      }
    }

    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/tag/${item.text}`}
            target="_blank"
          >
            <Item>{item.text}</Item>
            <Item>{item.count}</Item>
            <Item style={{ textAlign: 'center' }}>
              <img src={image} alt="" style={{ height: 80 }} />
            </Item>
            <Item>
              <Button
                onClick={() => {
                  window.location.href = `/tag/${item.text}/image`;
                }}
              >
                {intl.formatMessage({ id: 'display_tag_action' })}
              </Button>
            </Item>
          </Link>
        </Wrapper>
        <CardWrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/tag/${item.text}`}
            target="_blank"
          >
            <Label>{intl.formatMessage({ id: 'display_tag_text' })}</Label>
            <LabelField rows={1}>{item.text}</LabelField>
            <Label>{intl.formatMessage({ id: 'display_tag_count' })}</Label>
            <LabelField rows={1}>{item.text}</LabelField>
            <Label>{intl.formatMessage({ id: 'label_images' })}</Label>
            <LabelField rows={1} style={{ height: 70 }}>
              <img src={image} alt="" style={{ height: 60 }} />
            </LabelField>
            <Label>{intl.formatMessage({ id: 'display_tag_action' })}</Label>
            <LabelField rows={1}>
              <Button
                onClick={() => {
                  window.location.href = `/tag/${item.text}/image`;
                }}
              >
                {intl.formatMessage({ id: 'display_tag_action' })}
              </Button>
            </LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default OrderCardItem;
