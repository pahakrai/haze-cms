import React from 'react';
import styled from 'styled-components';
import { Popconfirm } from 'antd';
import { Button as AndButton } from 'antd';
import { helpers } from '@golpasal/common';

import Modal from '../../../Components/Modal';
import Label from '../../Common/Label';
import Card from '../../Common/Card';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import WorkspacePaymentMethodForm from '../../../Containers/WorkspacePaymentMethod/WorkspacePaymentMethodForm';

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
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 1000px) {
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

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

export class WorkspacePaymentMethodCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl, onItemToggle, onItemDelete } = this.props;
    let platforms = [];
    if (!item) {
      return null;
    }

    function cancel(e) {
      e.stopPropagation();
    }
    function confirm(e) {
      e.stopPropagation();
      onItemDelete(item._id);
    }

    if (item.platforms) {
      platforms = item.platforms.map(
        v =>
          helpers.getConstantByValue(
            'type',
            'PlatformType',
            v,
            helpers.getLocale(intl.locale)
          ).text
      );
    }

    return (
      <React.Fragment>
        <Wrapper>
          <Item>{item.url}</Item>
          <Item>
            {item &&
              item.paymentMethod &&
              item.paymentMethod.name &&
              item.paymentMethod.name[intl.locale]}
          </Item>
          <Item>{platforms.length && platforms.toString()}</Item>
          <ActionsItem>
            <AndButton.Group>
              <div style={{ display: 'flex' }}>
                <Switch
                  onToggle={value => {
                    onItemToggle(item._id, value);
                  }}
                  value={item.isActive}
                />{' '}
                &nbsp;
                <Modal.Button
                  modalStyle={{
                    content: { width: '90%', minWidth: 50, margin: ' 0 auto' }
                  }}
                  text={intl.formatMessage({ id: 'nav.edit' })}
                  content={closeModal => (
                    <WorkspacePaymentMethodForm
                      closeModal={closeModal}
                      workspacePaymentMethodId={item._id}
                      intl={intl}
                    />
                  )}
                />
                &nbsp;
                {!item.isActive ? (
                  <Popconfirm
                    title={intl.formatMessage({ id: 'msg.delete' })}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button.Danger
                      style={{
                        height: 42,
                        minWidth: 50,
                        padding: 0
                      }}
                      type="button"
                    >
                      x
                    </Button.Danger>
                  </Popconfirm>
                ) : (
                  <div
                    style={{
                      height: 42,
                      minWidth: 50,
                      padding: 0
                    }}
                  ></div>
                )}
              </div>
            </AndButton.Group>
          </ActionsItem>
        </Wrapper>

        <CardWrapper>
          <Label>{intl.formatMessage({ id: 'display_url' })}</Label>
          <LabelField rows={1}>{item.url}</LabelField>
          <Label>{intl.formatMessage({ id: 'payment_method_display' })}</Label>
          <LabelField rows={1}>
            {item &&
              item.paymentMethod &&
              item.paymentMethod.name &&
              item.paymentMethod.name[intl.locale]}
          </LabelField>
          <Label>{intl.formatMessage({ id: 'display_platform' })}</Label>
          <LabelField rows={1}>
            {item.platforms && item.platforms.toString()}
          </LabelField>
          <ActionsItem>
            <AndButton.Group>
              <div style={{ display: 'flex' }}>
                <Switch
                  onToggle={value => {
                    onItemToggle(item._id, value);
                  }}
                  value={item.isActive}
                />{' '}
                &nbsp;
                <Modal.Button
                  modalStyle={{
                    content: { width: '90%', minWidth: 50, margin: ' 0 auto' }
                  }}
                  text={intl.formatMessage({ id: 'nav.edit' })}
                  content={closeModal => (
                    <WorkspacePaymentMethodForm
                      closeModal={closeModal}
                      workspacePaymentMethodId={item._id}
                      intl={intl}
                    />
                  )}
                />
                &nbsp;
                {!item.isActive ? (
                  <Popconfirm
                    title={intl.formatMessage({ id: 'msg.delete' })}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button.Danger
                      style={{
                        height: 42,
                        minWidth: 50,
                        padding: 0
                      }}
                      type="button"
                    >
                      x
                    </Button.Danger>
                  </Popconfirm>
                ) : (
                  <div
                    style={{
                      height: 42,
                      minWidth: 50,
                      padding: 0
                    }}
                  ></div>
                )}
              </div>
            </AndButton.Group>
          </ActionsItem>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default WorkspacePaymentMethodCardItem;
