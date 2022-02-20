import React from 'react';
import moment from 'moment';
import { hasIn } from 'lodash';
import { helpers } from '@golpasal/common';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Link } from 'react-router-dom';

import Label from '../../Common/Label';
import { LabelField, Wrapper, CardWrapper, Item } from '../ListCard';

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export class QuotationCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl } = this.props;
    if (!item) {
      return null;
    }

    const quotationNo = item.quotationNo;

    const totalAmount = item.charge
      ? getSymbolFromCurrency(item.charge.currency || 'HKD') +
        item.charge.totalAmount
      : '';

    const status = helpers.getConstantByValue(
      'status',
      'QuotationStatus',
      item.status,
      intl.locale
    );

    const quotationDate = hasIn(item, 'quotationDate')
      ? moment(item.quotationDate).format('YYYY-MM-DD hh:mm')
      : 0;

    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/quotation/${item._id}`}
            target="_blank"
          >
            <Item>{quotationNo}</Item>
            <Item>{quotationDate}</Item>
            <Item>{totalAmount}</Item>
            <Item>{status ? status.text : ''}</Item>
          </Link>
        </Wrapper>

        <CardWrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/quotation/${item._id}`}
            target="_blank"
          >
            <Label>{intl.formatMessage({ id: 'display_quotationNo' })} </Label>
            <LabelField rows={1}>{quotationNo}</LabelField>
            <Label>{intl.formatMessage({ id: 'date' })} </Label>
            <LabelField rows={1}>{quotationDate}</LabelField>
            <Label>{intl.formatMessage({ id: 'amount' })}</Label>
            <LabelField rows={1}>{totalAmount}</LabelField>
            <Label>{intl.formatMessage({ id: 'status' })} </Label>
            <LabelField rows={1}>{status ? status.text : ''}</LabelField>
          </Link>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default QuotationCardItem;
