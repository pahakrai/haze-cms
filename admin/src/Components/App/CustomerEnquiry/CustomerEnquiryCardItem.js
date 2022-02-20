import React from 'react';
import styled from 'styled-components';
import { Button, Modal as AntdModal } from 'antd';
import moment from 'moment';
import Modal from '../../Modal';
import { formatUserName } from '../../../Lib/util';
import Label from '../../Common/Label';
import Card from '../../Common/Card';
import CustomerEnquiryDetail from './CustomerEnquiryDetail';

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

export class CustomerEnquiryCardItem extends React.PureComponent {
  static defaultProps = { onItemClick: () => true };

  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
  }

  nClickStopPropagation = e => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  };

  onItemClick = item => {
    this.setState({ modalOpen: true });
  };
  render() {
    const { item, intl, onFollow } = this.props;
    const { modalOpen } = this.state;
    const whoFollow = item.whoFollow ? formatUserName(item.whoFollow) : '';
    return (
      <React.Fragment>
        <Wrapper>
          <Item>
            {item.phoneRegion
              ? `${item.phoneRegion} ${item.phone}`
              : item.phone}
          </Item>
          <Item>{item.email}</Item>
          <Item>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</Item>
          <Item>{item.subject}</Item>
          <Item>{whoFollow}</Item>
          <Item>
            {item.followTime
              ? moment(item.followTime).format('YYYY-MM-DD HH:mm')
              : ''}
          </Item>
          <Item>{item.remarks}</Item>
          <Item>
            <Button
              type="primary"
              disabled={item.isFollow}
              size="small"
              onClick={e => {
                // this.onClickStopPropagation(e);
                AntdModal.confirm({
                  title: intl.formatMessage({
                    id: 'msg.follow'
                  }),
                  okText: intl.formatMessage({ id: 'display_yes' }),
                  cancelText: intl.formatMessage({ id: 'cancel' }),
                  onOk: () => {
                    onFollow(item);
                    return Promise.resolve();
                  }
                });
              }}
            >
              {intl.formatMessage({
                id: item.isFollow
                  ? 'display_customer_enquiry_follow'
                  : 'display_customer_enquiry_not_follow'
              })}
            </Button>
          </Item>
          <Item>
            <Button
              type="primary"
              size="small"
              onClick={() => this.onItemClick(item)}
            >
              {intl.formatMessage({
                id: 'order_detail_display'
              })}
            </Button>
          </Item>
        </Wrapper>
        <Modal.Default
          shouldOpenModal={modalOpen}
          title={intl.formatMessage({
            id: 'nav.customer_enquiry'
          })}
          onModalClose={() => this.setState({ modalOpen: false })}
          content={closeModal => (
            <CustomerEnquiryDetail item={item} intl={intl} />
          )}
        />

        <CardWrapper>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_phone' })}
          </Label>
          <LabelField rows={1}>
            {item.phoneRegion
              ? `${item.phoneRegion} ${item.phone}`
              : item.phone}
          </LabelField>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_email' })}
          </Label>
          <LabelField rows={1}>{item.email}</LabelField>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_search_time' })}
          </Label>
          <LabelField rows={1}>
            {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
          </LabelField>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_subject' })}
          </Label>
          <LabelField rows={1}>{item.subject}</LabelField>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_who_follow' })}
          </Label>
          <LabelField rows={1}>{whoFollow}</LabelField>
          <Label>
            {intl.formatMessage({ id: 'display_customer_enquiry_follow_time' })}
          </Label>
          <LabelField rows={1}>
            {item.followTime
              ? moment(item.followTime).format('YYYY-MM-DD HH:mm')
              : ''}
          </LabelField>
          <Label>{intl.formatMessage({ id: 'display_remarks' })}</Label>
          <LabelField rows={2}>{item.remarks}</LabelField>
          <Label>{intl.formatMessage({ id: 'status' })} </Label>
          <LabelField rows={1}>
            <Button
              type="primary"
              disabled={item.isFollow}
              size="small"
              onClick={
                !item.isFollow
                  ? e => {
                      e.preventDefault && e.preventDefault();
                      if (e && e.stopPropagation) {
                        e.stopPropagation();
                      } else {
                        e.cancelBubble = true;
                      }
                      onFollow(item);
                    }
                  : undefined
              }
            >
              {intl.formatMessage({
                id: item.isFollow
                  ? 'display_customer_enquiry_follow'
                  : 'display_customer_enquiry_not_follow'
              })}
            </Button>
          </LabelField>
          <Label>{intl.formatMessage({ id: 'actions' })} </Label>
          <LabelField>
            <Button
              type="primary"
              size="small"
              onClick={() => this.onItemClick(item)}
            >
              {intl.formatMessage({
                id: 'order_detail_display'
              })}
            </Button>
          </LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default CustomerEnquiryCardItem;
