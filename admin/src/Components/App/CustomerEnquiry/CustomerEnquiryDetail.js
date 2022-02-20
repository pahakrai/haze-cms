import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';
import moment from 'moment';

import Label from '../../Common/Label';
import TextInput from '../../Common/TextInput';
import { formatUserName } from '../../../Lib/util';

const LabelField = styled(Label.Field)``;

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

class DetailList extends React.PureComponent {
  static defaultProps = {};

  render() {
    const { item, intl } = this.props;
    return (
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_phone' })}
          </Label>
          <LabelField>
            {item.phoneRegion
              ? `${item.phoneRegion} ${item.phone}`
              : item.phone}
          </LabelField>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>{intl.formatMessage({ id: 'status' })} </Label>
          <LabelField rows={2}>
            {intl.formatMessage({
              id: item.isFollow
                ? 'display_customer_enquiry_follow'
                : 'display_customer_enquiry_not_follow'
            })}
          </LabelField>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_email' })}
          </Label>
          <LabelField>{item.email}</LabelField>
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            {intl.formatMessage({
              id: 'display_customer_enquiry_search_time'
            })}
          </Label>
          <LabelField>
            {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
          </LabelField>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_subject' })}
          </Label>
          <LabelField>{item.subject}</LabelField>
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            {intl.formatMessage({
              id: 'display_customer_enquiry_who_follow'
            })}
          </Label>
          <LabelField>
            {item.whoFollow ? formatUserName(item.whoFollow) : ''}
          </LabelField>
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            {intl.formatMessage({
              id: 'display_customer_enquiry_follow_time'
            })}
          </Label>
          <LabelField>
            {item.followTime
              ? moment(item.followTime).format('YYYY-MM-DD HH:mm')
              : ''}
          </LabelField>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12}>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_message' })}
          </Label>
          <TextInput disabled rows={5} value={item.message} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Label>{intl.formatMessage({ id: 'display_remarks' })} </Label>
          <LabelField>{item.remarks}</LabelField>
        </Col>
      </Row>
    );
  }
}

export default DetailList;
