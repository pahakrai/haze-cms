import React from 'react';
import styled from 'styled-components';
import { List, Pagination } from 'antd';
import Common from '@golpasal/common';
import OrderCardItem from './OrderCardItem';
import OrderCardItemTitle from './OrderCardItemTitle';
import SelectUserModal from './SelectUserModal/SelectUserModal';
import Button from '../../../Common/Button';
import { formatUserName } from '../../../../Lib/util';
import OrderCreateButton from '../../../../Containers/Order/OrderCreateButton';
import OrderImportForm from './OrderImportForm';
import Modal from '../../../Modal';
import FormName from '../../../../Constants/Form';

const { TravelOrderStatus, UserStatus } = Common.status;
const { UserType } = Common.type;

const ListFooterWarp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const ButtonWarp = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;
const PrimaryButton = styled(Button.Primary)`
  margin: 0px 8px 10px 8px !important;
`;

export const UserModalControl = {
  users: {
    get: v => (v.user._id ? v.user?._id : v.user),
    set: (user, data) => ({
      ...data,
      user: user._id ? user._id : user,
      name: formatUserName(user) || '-'
    })
  }
};
class OrderList extends React.PureComponent {
  static defaultProps = {
    orders: [],
    isNextPageLoading: false,
    isEnd: true,
    onLoadMore: () => true,
    header: true
  };

  constructor(props) {
    super(props);
    this.state = { selected: [] };
  }

  handleCheckAll = v => {
    const { orders } = this.props;
    const { selected } = this.state;
    let newSelected = [];
    const ordersBystauts = orders.filter(
      o => o.status <= TravelOrderStatus.DRIVER_ACCEPTED
    );
    if (selected.length !== ordersBystauts.length) {
      newSelected = ordersBystauts.map(v => v._id);
    }
    this.setState({
      selected: newSelected
    });
  };

  handleChangeSelected = id => {
    const { selected } = this.state;
    const index = selected.indexOf(id);
    let newSelected = [...selected];

    index === -1 ? newSelected.push(id) : newSelected.splice(index, 1);

    this.setState({
      selected: newSelected
    });
  };

  _renderItem = item => {
    const {
      intl,
      onItemPdfBtnClick,
      onItemEyeBtnClick,
      currentWorkspace,
      orders
    } = this.props;
    const { selected } = this.state;
    const ordersBystauts = orders?.filter(
      o => o.status <= TravelOrderStatus.DRIVER_ACCEPTED
    );
    const checkAll =
      selected.length === ordersBystauts?.length && selected.length !== 0;

    return item === 'header' ? (
      <OrderCardItemTitle
        intl={intl}
        key={item}
        handleCheckAll={this.handleCheckAll}
        checkAll={checkAll}
        selected={selected}
        currentWorkspace={currentWorkspace}
      />
    ) : (
      <OrderCardItem
        key={item._id}
        intl={intl}
        item={item}
        selected={selected}
        changeSelected={this.handleChangeSelected}
        currentWorkspace={currentWorkspace}
        onEyeBtnClick={onItemEyeBtnClick}
        onPdfBtnClick={onItemPdfBtnClick}
      />
    );
  };

  _renderFooter = () => {
    const { pagination, intl } = this.props;

    // return renderFooter ? (
    //   renderFooter()
    // ) : (
    //   <ListFooterWarp>
    //     {isEnd ? (
    //       <span>{intl.formatMessage({ id: 'msg.no_more_data' })}</span>
    //     ) : (
    //       <Button onClick={onLoadMore}>
    //         {isNextPageLoading
    //           ? intl.formatMessage({ id: 'loading' })
    //           : intl.formatMessage({ id: 'load_more' })}
    //       </Button>
    //     )}
    //   </ListFooterWarp>
    // );
    return (
      <ListFooterWarp>
        <Pagination {...pagination} />
        <span style={{ marginLeft: 10 }}>
          {intl.formatMessage(
            { id: 'display_page.total_record' },
            { n: pagination.total }
          )}
        </span>
      </ListFooterWarp>
    );
  };

  render() {
    const {
      orders,
      header,
      gutter,
      loading,
      intl,
      currentWorkspace,
      workspaceType,
      _onSubmit,
      _onSubmitSuccess,
      _onSubmitFail
    } = this.props;
    const { selected } = this.state;
    const allowEdit = currentWorkspace?.preferences?.order?.allowEdit;
    const updatePeopleInCharge =
      currentWorkspace?.preferences?.order?.updatePeopleInCharge;
    return (
      <div>
        <ButtonWarp>
          {allowEdit && (
            <OrderCreateButton intl={intl} workspaceType={workspaceType} />
          )}
          {updatePeopleInCharge && (
            // <SelectUsers intl={intl} selected={selected} />
            <SelectUserModal
              control={UserModalControl.users}
              modalTitle={intl.formatMessage({
                id: 'display_order_update_people_charge'
              })}
              placeholder={intl.formatMessage({
                id: 'display_order_update_people_charge'
              })}
              isOrderIds={true}
              selected={selected}
              query={{
                userTypes: [UserType.USER],
                statuses: [UserStatus.ACTIVE]
              }}
            >
              <Button.Primary style={{ marginTop: 0 }}>
                {intl.formatMessage({
                  id: 'display_order_update_people_charge'
                })}
              </Button.Primary>
            </SelectUserModal>
          )}
          {allowEdit && (
            <div>
              <Modal.Button
                modalStyle={{
                  content: { width: '90%', minWidth: 50, margin: ' 0 auto' }
                }}
                title={intl.formatMessage({ id: 'display_import_order' })}
                text={intl.formatMessage({ id: 'display_import_order' })}
                button={openModal => (
                  <PrimaryButton onClick={openModal}>
                    {intl.formatMessage({ id: 'display_import_order' })}
                  </PrimaryButton>
                )}
                content={closeModal => (
                  <OrderImportForm
                    closeModal={closeModal}
                    form={FormName.IMPORT_ORDER}
                    onSubmit={_onSubmit}
                    onSubmitSuccess={_onSubmitSuccess}
                    onSubmitFail={_onSubmitFail}
                    intl={intl}
                  />
                )}
              />
            </div>
          )}
        </ButtonWarp>

        <List
          loading={loading}
          grid={{ gutter: gutter || 16, sm: 1, md: 1 }}
          dataSource={header ? ['header', ...orders] : orders}
          renderItem={this._renderItem}
          footer={this._renderFooter()}
        />
      </div>
    );
  }
}

export default OrderList;
