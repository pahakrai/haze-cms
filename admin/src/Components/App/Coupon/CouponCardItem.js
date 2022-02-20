import React from 'react';
import { hasIn } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Label from '../../Common/Label';
import { LabelField, Wrapper, CardWrapper, Item } from '../ListCard';
import { formatTitleI18nText } from './CouponCardItemTitle';

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export class CouponCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl } = this.props;
    if (!item) {
      return null;
    }

    const title = item.title;

    const applicationTime = hasIn(item, 'startAt')
      ? moment(item.startAt).format('YYYY-MM-DD hh:mm')
      : 0;
    const deadline = hasIn(item, 'expireAt')
      ? moment(item.expireAt).format('YYYY-MM-DD hh:mm')
      : 0;
    const icon =
      item && item.images && item.images[0] ? item.images[0].thumbnailUri : 0;
    // render
    const texts = formatTitleI18nText({ intl });

    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/coupons/${item._id}`}
            target="_blank"
          >
            <Item>{item.code}</Item>
            <Item>{title}</Item>
            <Item>
              <img src={icon} alt="" style={{ height: 40 }} />
            </Item>
            <Item>{item.noOfCoupon}</Item>
            <Item>{applicationTime}</Item>
            <Item>{deadline}</Item>
          </Link>
        </Wrapper>

        <CardWrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/coupons/${item._id}`}
            target="_blank"
          >
            <Label>{texts.code} </Label>
            <LabelField rows={1}>{item.code}</LabelField>
            <Label>{texts.name} </Label>
            <LabelField rows={1}>{title}</LabelField>

            <Label>{texts.icon} </Label>
            <LabelField rows={1}>
              <img src={icon} alt="" style={{ height: 40 }} />
            </LabelField>

            <Label>{texts.count} </Label>
            <LabelField rows={1}>{item.noOfCoupon}</LabelField>

            <Label>{texts.applicationTime}</Label>
            <LabelField rows={1}>{applicationTime}</LabelField>
            <Label>{texts.deadline}</Label>
            <LabelField rows={1}>{deadline}</LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default CouponCardItem;
