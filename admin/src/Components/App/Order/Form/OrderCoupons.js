import React, { useState, useCallback, useMemo } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Button as AntdButton } from 'antd';
import { FormattedMessage } from 'react-intl';
import { DeleteOutlined } from '@ant-design/icons';

import CouponService from '../../../../Services/APIServices/CouponService';
import Button from '../../../Common/Button';
import { TextInputNoField } from '../../../Form/TextInput';

import { Label as _Label, Value } from './OrderChargeUtils';

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
// const ButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;
const Label = styled(_Label)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrderCoupons = ({
  coupons,
  productItems,
  input,
  intl,
  label,
  updateMode,
  amount,
  onDeductPriceChange
}) => {
  const [couponData, setCouponData] = useState(null);
  const [newCouponText, setNewCouponText] = useState('');
  const [newCouponError, setNewCouponError] = useState(null);
  const [submitCouponLoading, setSubmitCouponLoading] = useState(false);
  const items = coupons || [];

  const products = (productItems || []).map(v => ({
    product: v.product,
    amount: v.amount
  }));
  const submitCoupon = useCallback(async () => {
    if (!newCouponText) {
      // setNewCouponError(<FormattedMessage id="error.required" />);
      return;
    }
    try {
      setNewCouponError('');
      setSubmitCouponLoading(true);
      const result = await CouponService.codeExist(newCouponText);
      if (result.data === true) {
        input.onChange(newCouponText);
        setNewCouponText('');
      } else {
        throw new Error();
      }
    } catch (e) {
      setNewCouponError(<FormattedMessage id="error.coupon_no_exist" />);
    } finally {
      setSubmitCouponLoading(false);
    }
  }, [newCouponText, input]);

  const couponInputProps = useMemo(
    () => ({
      onKeyDown: e => {
        if ((e.which || e.keyCode) === 13) {
          if (e && e.preventDefault) {
            e.stopPropagation();
            e.preventDefault && e.preventDefault();
            submitCoupon();
          } else {
            e.cancelBubble = true;
          }
          return false;
        }
      }
    }),
    [submitCoupon]
  );

  return (
    <>
      <CouponLauncher
        {...{
          coupon: input.value,
          amount,
          products,
          onDeductPriceChange,
          setCouponData
        }}
      />
      <Label>{label}</Label>
      {!updateMode && !input.value && (
        <InputWrapper>
          <TextInputNoField
            noLabel
            containerStyle={{ margin: 0, flex: 1, marginRight: 10 }}
            value={newCouponText}
            input={{ onChange: setNewCouponText }}
            meta={{ error: newCouponError, touched: true }}
            placeholder=" "
            inputProps={couponInputProps}
            disabled={submitCouponLoading}
          />
          <Button.Primary
            type="button"
            style={{ margin: 0 }}
            onClick={submitCoupon}
            disabled={submitCouponLoading}
          >
            <FormattedMessage id="redeem" />
          </Button.Primary>
        </InputWrapper>
      )}
      <Value style={{ marginTop: 10 }}>
        {updateMode &&
          (items && items.length
            ? items.map((v, index) => {
                const name = v.code ? v.code : '-';
                const amount = `$${v.amount ? v.amount : 0}`;
                return (
                  <ItemWrapper key={index}>
                    <div>{name}</div>
                    <div>{amount}</div>
                  </ItemWrapper>
                );
              })
            : '-')}
        {!updateMode && couponData && (
          <ItemWrapper>
            <div>{input.value}</div>
            <div>
              ${couponData.amount || 0}
              <AntdButton
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                size="small"
                htmlType="button"
                onClick={() => {
                  setCouponData(null);
                  input.onChange(null);
                }}
                style={{
                  marginLeft: 5
                }}
              />
            </div>
          </ItemWrapper>
        )}
      </Value>
    </>
  );
};

class CouponLauncher extends React.PureComponent {
  getAmount = async () => {
    const {
      products,
      setCouponData,
      onDeductPriceChange,
      coupon,
      amount
    } = this.props;
    try {
      const result = await CouponService.redeemCouponByCode(coupon, {
        products,
        productTotAmount: amount || 0
      });
      setCouponData(result.data);
      onDeductPriceChange(result.data.amount);
    } catch (e) {}
  };
  componentDidMount() {
    const { coupon } = this.props;
    if (coupon) {
      this.getAmount();
    }
  }
  componentDidUpdate(prevProps) {
    const { coupon, amount } = this.props;
    if (coupon !== prevProps.coupon || amount !== prevProps.amount) {
      if (coupon) {
        this.getAmount();
      }
    }
  }
  render = () => null;
}

export default props => {
  return <Field {...props} component={OrderCoupons} />;
};
