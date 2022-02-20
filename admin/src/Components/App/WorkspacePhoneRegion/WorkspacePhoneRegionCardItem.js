import React from 'react';
import styled from 'styled-components';
import { Popconfirm } from 'antd';

import Label from '../../Common/Label';
import Card from '../../Common/Card';
import Button from '../../Common/Button';
// import Modal from '../../../Components/Modal';
// import WorkspacePhoneRegionForm from '../../../Containers/WorkspacePhoneRegion/WorkspacePhoneRegionForm';

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

export class WorkspacePhoneRegionCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl, onItemDelete } = this.props;
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

    return (
      <React.Fragment>
        <Wrapper>
          <Item>{item.idx}</Item>
          <Item>{item.phoneRegion.code}</Item>
          <Item>
            {/* <Modal.Button
              modalStyle={{
                content: { width: '90%', minWidth: 50, margin: ' 0 auto' }
              }}
              text={intl.formatMessage({ id: 'nav.edit' })}
              content={closeModal => (
                <WorkspacePhoneRegionForm
                  closeModal={closeModal}
                  workspacePhoneRegionId={item._id}
                  intl={intl}
                />
              )}
            /> */}
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
          </Item>
        </Wrapper>

        <CardWrapper>
          <Label>
            <Item>{intl.formatMessage({ id: 'idx' })} </Item>
          </Label>
          <LabelField rows={1}>{item.idx}</LabelField>

          <Label>
            {intl.formatMessage({ id: 'display_user_phone_region_code' })}
          </Label>
          <LabelField rows={1}>{item.phoneRegion.code}</LabelField>

          <Label>{intl.formatMessage({ id: 'actions' })}</Label>
          <LabelField rows={1}>
            <Popconfirm
              title={intl.formatMessage({ id: 'msg.confirm_approve' })}
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button.Danger
                style={{
                  height: 42,
                  minWidth: 50,
                  margin: 0,
                  padding: 0
                }}
                type="button"
              >
                x
              </Button.Danger>
            </Popconfirm>
          </LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default WorkspacePhoneRegionCardItem;
