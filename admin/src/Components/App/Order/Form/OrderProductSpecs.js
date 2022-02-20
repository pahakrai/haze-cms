import React, { useMemo } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { ErrorMessage } from '../../../Form/Errors';

import { useProduct } from '../../../../Containers/Hooks';

const SpecContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  user-select: none;
`;
const SpecName = styled.div`
  font-weight: 500;
`;
const SpecValue = styled.div`
  margin-bottom: 5px;
  margin-right: 7px;
  display: inline-block;
  padding: 2px 10px;
  cursor: pointer;
  border: 1px solid
    ${({ active, theme }) => (active ? theme.color.primary : '#eee')};
  border-radius: 3px;
`;
const SpecValueContent = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;

const OrderProductSpecs = ({
  input,
  meta: { touched, error },
  intl,
  product,
  onChangeData,
  disabled,
  isQuotation
}) => {
  const { data: productData } = useProduct(product);
  const specs =
    productData && productData.specs && productData.specs.length
      ? [...productData.specs]
      : [];

  const specsFormat = useMemo(() => {
    const productSpecs = {};
    if (
      input.value &&
      productData &&
      productData.skus &&
      productData.skus.length
    ) {
      const productSKUData = productData.skus.find(v => v._id === input.value);

      if (
        productSKUData &&
        productSKUData.specs &&
        productSKUData.specs.length > 0
      ) {
        productSKUData.specs.forEach(v => {
          productSpecs[v.spec] = v.value;
        });
      }
    }
    return productSpecs;
  }, [input.value, productData]);

  const onSpecClick = (specId, valueId) => {
    const newProductSpecs = { ...specsFormat };
    if (newProductSpecs[specId] !== valueId) {
      newProductSpecs[specId] = valueId;
    } else {
      return;
    }

    if (productData && productData.skus.length) {
      const skus = [...productData.skus];
      skus.some(sku => {
        let bool = false;
        if (sku.specs && sku.specs.length > 0) {
          bool = sku.specs.every(v => newProductSpecs[v.spec] === v.value);
          if (bool) {
            const newData = {
              allQty: sku.qty,
              validateInventory: sku.validateInventory || false,
              productSKU: sku._id,
              amount: sku.discountAmount ? sku.discountAmount : sku.amount || 0
            };
            if (isQuotation) {
              delete newData.amount;
            }
            onChangeData(newData);
          }
        }
        return bool;
      });
    }
  };
  return (
    <>
      {specs && specs.length > 0
        ? specs.map((v, index) => {
            const values =
              v && v.values && v.values.length ? [...v.values] : undefined;
            return values ? (
              <SpecContent key={index}>
                <SpecName>{v && v.name ? v.name[intl.locale] : '-'}</SpecName>
                <SpecValueContent>
                  <div style={{ width: 20 }} />
                  {v.values.map((_v, _index) => (
                    <SpecValue
                      key={_index}
                      onClick={
                        !disabled ? () => onSpecClick(v._id, _v._id) : undefined
                      }
                      active={specsFormat[v._id] === _v._id}
                    >
                      {_v.name && _v.name[intl.locale]
                        ? _v.name[intl.locale]
                        : '-'}
                    </SpecValue>
                  ))}
                </SpecValueContent>
              </SpecContent>
            ) : null;
          })
        : null}
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default props => {
  return <Field {...props} component={OrderProductSpecs} />;
};
