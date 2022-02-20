import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { injectIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import Loading from 'react-loading';

// redux
import {
  getSearchProducts,
  getResAllProduct,
  getProductById
} from '../../Redux/selectors';
import { ProductActions } from '../../Redux/Product/actions';

import { FieldLabel } from '../../Components/Form/form.styled';
import { ErrorMessage } from '../../Components/Form/Errors';
import _FieldContainer from '../../Components/Form/FieldContainer';
import ContentLoader from '../../Components/Common/ContentLoader';

import { debounce } from './util';

const FieldContainer = styled(_FieldContainer)`
  position: relative;
  z-index: 0;
`;
const LoadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LoadingIcon = styled.div`
  margin-left: 5px;
`;

class _SelectProduct extends PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultValue,
      input,
      findProductById,
      setSearchResults
    } = this.props;
    setSearchResults([]);
    // default
    if (!defaultValue && input.value) {
      findProductById(input.value);
    }

    this.state = {
      productOptions: [],
      displayValue: '' //defaultValue || ''
    };

    this._onSearchProduct = debounce(this._onSearchProduct, 700);
  }

  // lose focus
  _onBlur = () => {
    const { input, allProduct, intl } = this.props;
    const currentSelectProduct = allProduct.find(
      product => product && product._id === input.value
    );

    if (currentSelectProduct) {
      this.setState({
        displayValue: this.productTextFormat(currentSelectProduct, intl)
      }); //make
      input.onBlur(input.value);
    } else {
      input.onBlur('');
    }
  };

  // When typing in the input box keyboard
  _onChange = (value, option) => {
    if (value === undefined) {
      // clear
      this._onSelect();
    }

    this.setState({ displayValue: value ? option.label : '' });
  };

  // Selected
  _onSelect = value => {
    const { input, allProduct } = this.props;
    const product = allProduct.find(v => v._id === value);
    input.onChange(value ? value : '', product);
  };

  // search
  _onSearchProduct = (keywordForProduct = '') => {
    const { query } = this.props;
    const { productOptions } = this.state;
    this.setState({
      keywordForProduct
    });
    if (keywordForProduct.length > 1) {
      this.props.searchProducts(query, keywordForProduct);
    } else if (productOptions.length === 0) {
      this.props.searchProducts(query, '');
    }
  };
  _onFocus = () => {
    this._onSearchProduct();
  };

  productTextFormat = (product, intl) =>
    product && product.name && product.name[intl.locale]; //make

  componentDidUpdate = (prevProps, prevState) => {
    const {
      defaultValue,
      defaultProduct,
      input,
      findProductById,
      intl
    } = this.props;
    const { displayValue } = this.state;
    // const prevValue = prevProps.input ? prevProps.input.value : '';
    // const currValue = input ? input.value : '';
    const state = {};

    // update productOptions
    if (prevProps.productSearchResults !== this.props.productSearchResults) {
      state.productOptions = this.props.productSearchResults.map(product => ({
        value: product._id,
        label: this.productTextFormat(product, intl)
      }));
    }

    // !props.defaultValue No default
    // !props.defaultProduct No default user
    // Initial input.value update
    //    !prevProps.input.value No value before
    //    input.value Now has value
    if (
      !defaultValue &&
      !defaultProduct &&
      (!prevProps.input || !prevProps.input.value) &&
      input &&
      input.value
      // prevValue !== currValue
    ) {
      // Re-request api to get user
      findProductById(input.value);
    }

    // !props.defaultValue No default
    // !state.displayValue No choice
    // Update displayValue when defaultProduct is updated
    if (
      !defaultValue &&
      !displayValue &&
      defaultProduct !== prevProps.defaultProduct
    ) {
      if (defaultProduct) {
        state.displayValue = this.productTextFormat(defaultProduct, intl);
      }
    }

    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  };

  render() {
    const {
      label,
      disabled,
      meta: { touched, error, warning },
      defaultValue,
      defaultProduct,
      updateMode,
      placeholder,
      inputProps = {},
      containerStyle,
      searchProductsLoading,
      theme,
      noLabel,
      full
    } = this.props;

    const { productOptions, displayValue } = this.state;
    const loading = updateMode ? !defaultProduct && !defaultValue : false;
    const fullStyle = full ? { width: '100%' } : { width: 350 };

    return loading ? (
      <FieldContainer style={Object.assign(fullStyle, containerStyle)}>
        {!noLabel && <FieldLabel>{label}</FieldLabel>}
        <ContentLoader.Input />
      </FieldContainer>
    ) : (
      <FieldContainer style={Object.assign(fullStyle, containerStyle)}>
        {!noLabel && <FieldLabel>{label}</FieldLabel>}
        <LoadingContent>
          <AutoComplete
            options={productOptions}
            onSelect={this._onSelect}
            onBlur={this._onBlur}
            value={displayValue}
            onSearch={this._onSearchProduct}
            onChange={this._onChange}
            onFocus={this._onFocus}
            defaultValue={defaultValue}
            placeholder={placeholder || label}
            disabled={disabled}
            style={fullStyle}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            allowClear
            {...inputProps}
          />
          {searchProductsLoading && (
            <LoadingIcon>
              <Loading
                type="spokes"
                color={theme.color.primary}
                height={15}
                width={15}
              />
            </LoadingIcon>
          )}
        </LoadingContent>
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    );
  }
}

const mapStateToProps = (state, { input }) => {
  return {
    allProduct: getResAllProduct(state),
    productSearchResults: getSearchProducts(state),
    defaultProduct: getProductById(state, input.value),
    searchProductsLoading: state.loading.searchProducts
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchProducts: ProductActions.searchProducts,
      setSearchResults: ProductActions.setSearchResults,
      findProductById: ProductActions.getProductById
    },
    dispatch
  );

export const SelectProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withTheme(_SelectProduct)));

export default props => {
  return <Field {...props} component={SelectProduct} />;
};
