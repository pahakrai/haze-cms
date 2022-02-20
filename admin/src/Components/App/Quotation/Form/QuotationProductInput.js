import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import { getProductById } from '../../../../Redux/selectors';

import SelectProductWithModal from '../../../../Containers/Form/SelectProductWithModal';
import ProductSkuItem from '../../../../Containers/Product/ProductSkuItem';
import ProductItemContainer from '../../../../Containers/Product/ProductItem';
import FileMetaImage from '../../../../Containers/FileMetaImage';
import TextInput from '../../../Form/TextInput';
import QuotationProductSpecs from './QuotationProductSpecs';
import QuotationNumberControl from './QuotationNumberControl';
import {
  ProductImage,
  ProductContent,
  ProductContentItem
} from './QuotationProducts.styled';

const ProductSelectInput = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 6px 10px;
  line-height: 30px;
  border: 1px solid rgba(224, 224, 224, 1);
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
class QuotationProductInput extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { data, onChange, productData } = this.props;
    const prevProductId = prevProps.data && prevProps.data.product;

    if (
      productData &&
      data &&
      data.product !== prevProductId &&
      productData &&
      productData.skus &&
      productData.skus[0]
    ) {
      const sku = productData.skus[0];
      onChange({
        productSKU: sku._id,
        // allQty: sku.qty,
        // validateInventory: sku.validateInventory || false,
        qty: 1,
        amount: sku.discountAmount ? sku.discountAmount : sku.amount || 0
      });
    }
  }

  render() {
    const { intl, productText, data, name, onChange, editMode } = this.props;
    return (
      <ProductSkuItem id={data && data.productSKU}>
        {({ productSku: productSKUData }) => {
          // const getAmount = () => {
          //   return strIsNumber(data && data.qty) && productSKUData
          //     ? Number(data.qty || 0) *
          //         Number(
          //           productSKUData.discountAmount > 0
          //             ? productSKUData.discountAmount || 0
          //             : productSKUData.amount || 0
          //         )
          //     : 0;
          // };
          const imageId =
            (productSKUData && productSKUData.image) ||
            (productSKUData &&
              productSKUData.product &&
              productSKUData.product.images &&
              productSKUData.product.images[0]);

          return (
            <>
              <ProductImage>
                {imageId ? (
                  <FileMetaImage
                    fileMetaId={imageId}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <p style={{ textAlign: 'center', lineHeight: '50px' }}>
                    <FormattedMessage
                      id="no_sth_image"
                      values={{ name: productText }}
                    />
                  </p>
                )}
              </ProductImage>
              <ProductContent>
                {editMode ? (
                  <SelectProductWithModal
                    name={`${name}.product`}
                    modalTitle={
                      <FormattedMessage
                        id="sth_name_display"
                        values={{ name: productText }}
                      />
                    }
                  >
                    {(formValue, { product }) => (
                      <ProductSelectInput>
                        {(product &&
                          product.name &&
                          product.name[intl.locale]) || (
                          <span style={{ color: '#777' }}>
                            <FormattedMessage
                              id="sth_name_display"
                              values={{ name: productText }}
                            />
                          </span>
                        )}
                      </ProductSelectInput>
                    )}
                  </SelectProductWithModal>
                ) : (
                  <ProductItemContainer id={data.product}>
                    {({ product }) => (
                      <ProductContentItem>
                        <FormattedMessage
                          id="sth_name_display"
                          values={{ name: productText }}
                        />
                        :{' '}
                        {product && product.name && product.name[intl.locale]
                          ? product.name[intl.locale]
                          : '-'}
                      </ProductContentItem>
                    )}
                  </ProductItemContainer>
                )}
                <ProductContentItem>
                  <QuotationProductSpecs
                    intl={intl}
                    product={data.product}
                    name={`${name}.productSKU`}
                    onChangeData={onChange}
                    disabled={!editMode}
                  />
                </ProductContentItem>
                <QuotationNumberControl
                  label={intl.formatMessage({ id: 'display_qty' })}
                  style={{ marginLeft: 10 }}
                  name={`${name}.qty`}
                  changeCondition={v => v > 0}
                  editMode={editMode}
                />
                <ProductContentItem>
                  <ProductContentItem>
                    {/* <FormattedMessage id="display_cart_price" />:{' '} */}
                    <TextInput
                      name={`${name}.amount`}
                      disabled={!editMode}
                      label={intl.formatMessage({
                        id: 'display_cart_price'
                      })}
                    />
                    <TextInput
                      name={`${name}.remark`}
                      disabled={!editMode}
                      rows={2}
                      placeholder=" "
                      label={intl.formatMessage({ id: 'display_remarks' })}
                    />
                  </ProductContentItem>
                </ProductContentItem>
              </ProductContent>
            </>
          );
        }}
      </ProductSkuItem>
    );
  }
}

const mapStateToProps = (state, { data }) => {
  return {
    productData: getProductById(state, data && data.product)
  };
};
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(QuotationProductInput));
