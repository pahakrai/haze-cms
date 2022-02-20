import React from 'react';
import styled from 'styled-components';

import { Table, Tooltip, Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import Modal from '../../Modal';
import PricingTransactionForm from './PricingTransactionForm';

const ListFooterWarp = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
class PricingList extends React.PureComponent {
  static defaultProps = {
    expenseTypes: [],
    isNextPageLoading: false,
    onSubmitSuccess: () => true
  };
  state = {
    initialValues: '',
    formModalOpen: false
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onItemClick = initialValues => {
    this.setState({
      initialValues: initialValues,
      formModalOpen: true
    });
  };
  _onSubmit = value => {
    const { updatePricingsById } = this.props;
    updatePricingsById(value.pricing._id, { amount: value.pricing.amount });
  };
  _onUpdateSubmitSuccess = () => {
    const { getPricingsList, vehicleType, locTo, locFr } = this.props;
    getPricingsList({
      refresh: true,
      filterValues: {
        populates: ['pricing', 'vehicleType', 'regionA', 'regionB'],
        vehicleType: vehicleType,
        locTo: locTo,
        locFr: locFr
      }
    });
  };
  render() {
    const { intl, pricings, locale, pagination } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: ['pricing', '_id'],
        key: '_id',
        ellipsis: true,
        render: v => (
          <Tooltip placement="top" title={v}>
            {(v || '').slice(0, 4)}
          </Tooltip>
        )
      },
      {
        title: intl.formatMessage({ id: 'display_vehicle_category' }),
        // dataIndex: 'isResolved',
        key: 'display_vehicle_type',
        ellipsis: true,
        render: (a, value) => {
          return value.vehicleType.name[locale];
        }
      },
      {
        title: intl.formatMessage({ id: 'display_Fr' }),
        dataIndex: 'regionA',
        key: 'Fr_id',
        ellipsis: true,
        render: (e, value) => {
          return value.regionA ? value.regionA.name[locale] : '';
        }
      },
      {
        title: intl.formatMessage({ id: 'display_To' }),
        dataIndex: 'regionB',
        key: 'Told',
        ellipsis: true,
        render: (e, value) => {
          return value.regionB ? value.regionB.name[locale] : '';
        }
      },
      {
        title: intl.formatMessage({ id: 'product_price_display' }),
        dataIndex: ['pricing', 'amount'],
        key: 'product_price_display',
        ellipsis: true
      },
      {
        title: intl.formatMessage({ id: 'display_subscription_unit' }),
        dataIndex: ['pricing', 'currency'],
        key: 'display_subscription_unit',
        ellipsis: true
      },
      {
        title: intl.formatMessage({ id: 'nav.edit' }),
        ellipsis: true,
        render: value => {
          return (
            <EditOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this._onItemClick(value);
              }}
            />
          );
        }
      }
    ];
    const { initialValues, formModalOpen } = this.state;
    return (
      <div>
        <Modal.Default
          shouldOpenModal={formModalOpen}
          title={intl.formatMessage({ id: 'nav.update' })}
          onModalClose={() => this.setState({ formModalOpen: false })}
          content={closeModal =>
            initialValues && (
              <PricingTransactionForm
                intl={intl}
                initialValues={initialValues}
                form="pricings_update"
                onSubmit={this._onSubmit}
                onSubmitSuccess={() => {
                  closeModal && closeModal();
                  this._onUpdateSubmitSuccess();
                }}
              />
            )
          }
        />
        {pricings && (
          <Table dataSource={pricings} columns={columns} pagination={false} />
        )}
        <ListFooterWarp>
          <Pagination {...pagination} />
          <span style={{ marginLeft: 10 }}>
            {intl.formatMessage(
              { id: 'display_page.total_record' },
              { n: pagination.total }
            )}
          </span>
        </ListFooterWarp>
      </div>
    );
  }
}

export default PricingList;
