import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { injectIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import Loading from 'react-loading';

import { productSkuTextFormat } from '../../Lib/util';

// redux
import {
  getSearchProductSkus,
  getResAllProductSku,
  getProductSkuById
} from '../../Redux/selectors';
import { ProductSkuActions } from '../../Redux/ProductSku/actions';

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

class _SelectProductSkuSku extends PureComponent {
  constructor(props) {
    super(props);
    const {
      defaultValue,
      input,
      findProductSkuById,
      setSearchResults
    } = this.props;

    setSearchResults([]);
    // default
    if (!defaultValue && input.value) {
      findProductSkuById(input.value);
    }

    this.state = {
      productSkuOptions: [],
      displayValue: '' //defaultValue || ''
    };
    this._onSearchProductSku = debounce(this._onSearchProductSku, 700);
  }

  // lose focus
  _onBlur = () => {
    const { input, allProductSku } = this.props;
    const currentSelectProductSkuSku = allProductSku.find(
      productSku => productSku && productSku._id === input.value
    );

    if (currentSelectProductSkuSku) {
      this.setState({
        displayValue: this.productSkuTextFormat(currentSelectProductSkuSku)
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
    const { input } = this.props;
    input.onChange(value ? value : '');
  };

  // search
  _onSearchProductSku = (keywordForProductSku = '') => {
    const { productSkuOptions } = this.state;
    const { productId } = this.props;

    if (productId) {
      this.setState({
        keywordForProductSku
      });

      if (keywordForProductSku.length > 1) {
        this.props.searchProductSkus(
          { product: productId },
          keywordForProductSku
        );
      } else if (productSkuOptions.length === 0) {
        this.props.searchProductSkus({ product: productId }, '');
      }
    }
  };

  _onFocus = () => {
    this._onSearchProductSku();
  };
  productSkuTextFormat = productSku => {
    const { intl } = this.props;
    return productSkuTextFormat(productSku, intl.locale);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      defaultValue,
      defaultProductSku,
      input,
      findProductSkuById,
      productId
    } = this.props;
    const { displayValue } = this.state;
    // const prevValue = prevProps.input ? prevProps.input.value : '';
    // const currValue = input ? input.value : '';
    const state = {};

    // update productSkuOptions
    if (
      prevProps.productSkuSearchResults !== this.props.productSkuSearchResults
    ) {
      state.productSkuOptions = this.props.productSkuSearchResults.map(
        productSku => ({
          value: productSku._id,
          label: this.productSkuTextFormat(productSku)
        })
      );
    }

    // !props.defaultValue No default
    // !props.defaultProductSku No default user
    // Initial input.value update
    //    !prevProps.input.value No value before
    //    input.value Now has value
    if (
      !defaultValue &&
      !defaultProductSku &&
      (!prevProps.input || !prevProps.input.value) &&
      input &&
      input.value
      // prevValue !== currValue
    ) {
      // Re-request api to get user
      findProductSkuById(input.value);
    }

    // !props.defaultValue No default
    // !state.displayValue No choice
    // Update displayValue when defaultProductSku is updated
    if (
      !defaultValue &&
      !displayValue &&
      defaultProductSku !== prevProps.defaultProductSku
    ) {
      if (defaultProductSku) {
        state.displayValue = this.productSkuTextFormat(defaultProductSku);
      }
    }

    if (productId !== prevProps.productId) {
      state.displayValue = '';
      state.productSkuOptions = [];
      this.props.searchProductSkus({ product: productId }, '');
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
      defaultProductSku,
      updateMode,
      placeholder,
      searchProductSkusLoading,
      theme,
      full,
      containerStyle
    } = this.props;

    const { productSkuOptions, displayValue } = this.state;
    const loading = updateMode ? !defaultProductSku && !defaultValue : false;
    const fullStyle = full ? { width: '100%' } : { width: 350 };

    return loading ? (
      <FieldContainer style={Object.assign(fullStyle, containerStyle)}>
        <FieldLabel>{label}</FieldLabel>
        <ContentLoader.Input />
      </FieldContainer>
    ) : (
      <FieldContainer style={Object.assign(fullStyle, containerStyle)}>
        <FieldLabel>{label}</FieldLabel>
        <LoadingContent>
          <AutoComplete
            autoClearSearchValue
            options={productSkuOptions}
            onSelect={this._onSelect}
            onBlur={this._onBlur}
            value={displayValue}
            onSearch={this._onSearchProductSku}
            onFocus={this._onFocus}
            onChange={this._onChange}
            defaultValue={defaultValue}
            placeholder={placeholder || label}
            disabled={disabled}
            style={fullStyle}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            allowClear
          />
          {searchProductSkusLoading && (
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
    allProductSku: getResAllProductSku(state),
    productSkuSearchResults: getSearchProductSkus(state),
    defaultProductSku: getProductSkuById(state, input.value),
    searchProductSkusLoading: state.loading.searchProductSkus
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchProductSkus: ProductSkuActions.searchProductSkus,
      findProductSkuById: ProductSkuActions.getProductSkuById,
      setSearchResults: ProductSkuActions.setSearchResults
    },
    dispatch
  );

export const SelectProductSkuSku = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withTheme(_SelectProductSkuSku)));

export default props => {
  return <Field {...props} component={SelectProductSkuSku} />;
};
