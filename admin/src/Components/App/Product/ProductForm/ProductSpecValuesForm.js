import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import ObjectID from 'bson-objectid';

import { FieldLabel } from '../../../Form/form.styled';
import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
} from '../../Form/Wrapper';

import Dropdown from '../../../Common/Dropdown';

import MultiLanguageTags, {
  ProductSpecValuesEditModal
} from './MultiLanguageTags';

const productSpecValueControl = {
  set: (v, prevValue) => ({
    ...(prevValue || {}),
    _id:
      prevValue && prevValue._id ? prevValue._id : new ObjectID().toHexString(),
    name: v
  }),
  get: v => (v && v.name ? v.name : {})
};
export class ProductSpecValuesForm extends PureComponent {
  valueFormat = () => {
    const {
      input: { value: items }
    } = this.props;
    return Array.isArray(items) ? items : [];
  };
  render() {
    const { intl, valueControl } = this.props;
    const items = this.valueFormat();

    const options = items
      .filter(v => valueControl.get(v) && valueControl.get(v)[intl.locale])
      .map(v => ({
        label: valueControl.get(v)[intl.locale],
        value: valueControl.get(v)[intl.locale]
      }));

    return items && items.length > 0 ? (
      <React.Fragment>
        <FieldLabel>
          {intl.formatMessage({
            id: 'product_spec_name'
          })}
        </FieldLabel>
        {items.map((v, index) => {
          const _v = valueControl.get(v)[intl.locale];
          return (
            <RowWrapper key={index}>
              <LeftColWrapper xs={12} md={4}>
                <Dropdown
                  options={options}
                  intl={intl}
                  disabled
                  value={options.find(v => v.value === _v)}
                />
              </LeftColWrapper>
              <RightColWrapper xs={12} md={8} style={{ paddingRight: 0 }}>
                <MultiLanguageTags
                  name={`spec[${index}].values`}
                  placeholder={intl.formatMessage({
                    id: 'product_add_option_placeholder'
                  })}
                  modal={p => (
                    <ProductSpecValuesEditModal
                      productSpecNnames={valueControl.get(v)}
                      {...p}
                    />
                  )}
                  valueControl={productSpecValueControl}
                />
              </RightColWrapper>
            </RowWrapper>
          );
        })}
      </React.Fragment>
    ) : null;
  }
}

export default injectIntl(props => {
  return <Field component={ProductSpecValuesForm} {...props} />;
});
