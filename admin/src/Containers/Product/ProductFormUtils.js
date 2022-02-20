import ObjectID from 'bson-objectid';

import { productSkuCalculation } from '../../Lib/util';

export const onSubmit = (
  _product,
  { createProduct, updateProduct, formValueCategoryCode, formErrors }
) => {
  const fn = _product._id ? updateProduct : createProduct;
  const newImages = [];
  const fileMetas = [];
  const product = {
    ..._product,
    sku: [..._product.sku],
    spec: [..._product.spec]
  };
  const values = {};
  const skuFiles = {};
  const mediaList1Files = {};
  const mediaList2Files = {};
  const mediaList3Files = {};
  if (formErrors && Object.keys(formErrors).length > 0) {
    return;
  }

  if (!formValueCategoryCode) {
    return;
  } else {
    product._category = formValueCategoryCode;
  }

  // handle image
  product.images.forEach(image => {
    if (image.fileMeta) {
      if (image.fileMeta._id) {
        fileMetas.push(image.fileMeta._id);
      } else {
        fileMetas.push(image.fileMeta);
      }
    } else {
      newImages.push(image);
    }
  });
  // handle sku image
  Array.isArray(product.sku) &&
    product.sku.forEach((value, index) => {
      const image = value.image;
      if (image && image.preview) {
        skuFiles[`sku_${value._id}_file`] = image;
        delete value.image;
      }
      product.sku[index] = {
        ...value,
        qty: Number(value.qty),
        discountAmount: Number(value.discountAmount),
        amount: Number(value.amount)
      };
    });
  values.skus = product.sku;
  values.specs = product.spec;
  delete product.sku;
  delete product.spec;

  // handle mediaList1 image
  if (Array.isArray(product.mediaList1)) {
    product.mediaList1 = [...product.mediaList1];
    product.mediaList1.forEach((value, index) => {
      const _value = { ...value };
      const image = _value.image && _value.image[0];
      if (image && image.preview) {
        mediaList1Files[`mediaList1_${value._id}_file`] = image;
        delete _value.image;
      } else if (image.fileMeta) {
        _value.image = image.fileMeta;
      }
      product.mediaList1[index] = _value;
    });
  }

  // handle mediaList2 image
  if (Array.isArray(product.mediaList2)) {
    product.mediaList2 = [...product.mediaList2];
    product.mediaList2.forEach((value, index) => {
      const _value = { ...value };
      const image = _value.image && _value.image[0];
      if (image && image.preview) {
        mediaList2Files[`mediaList2_${value._id}_file`] = image;
        delete _value.image;
      } else if (image.fileMeta) {
        _value.image = image.fileMeta;
      }
      product.mediaList2[index] = _value;
    });
  }

  // handle mediaList3 image
  if (Array.isArray(product.mediaList3)) {
    product.mediaList3 = [...product.mediaList3];
    product.mediaList3.forEach((value, index) => {
      const _value = { ...value };
      const image = _value.image && _value.image[0];
      if (image && image.preview) {
        mediaList3Files[`mediaList3_${value._id}_file`] = image;
        delete _value.image;
      } else if (image?.fileMeta) {
        _value.image = image?.fileMeta;
      }
      product.mediaList3[index] = _value;
    });
  }

  values.product = { ...product, images: fileMetas };

  fn &&
    fn(
      values,
      newImages,
      skuFiles,
      mediaList1Files,
      mediaList2Files,
      mediaList3Files
    );
};

export const componentDidUpdate = (
  prevProps,
  {
    formValueChange,
    // formAnyTouched,
    form,
    formValueProductSpec,
    formValueProductSku,
    getProductErrors,
    history,
    currentWorkspace
    // updateMode,
    // product,
    // formRegisterFieldAction,
    // formRegisteredFields
  },
  { unTouchSkuField }
) => {
  const defaultCurrency = currentWorkspace
    ? currentWorkspace.defaultCurrency
    : '';
  if (getProductErrors) {
    history.push('/error');
  }

  // sepc & sku
  if (
    formValueProductSpec !== prevProps.formValueProductSpec &&
    Array.isArray(formValueProductSpec) &&
    Array.isArray(prevProps.formValueProductSpec)
  ) {
    let reduceSpec = false;
    let specDiff = false;
    if (Array.isArray(prevProps.formValueProductSpec)) {
      const count = formValueProductSpec.reduce(
        (r, v) => r + (v.values && v.values.length ? v.values.length : 0),
        0
      );
      const prevCount = prevProps.formValueProductSpec.reduce(
        (r, v) => r + (v.values && v.values.length ? v.values.length : 0),
        0
      );
      reduceSpec = prevCount > count;
      specDiff = prevCount !== count;
    }
    if (specDiff) {
      const prevProductSku = [...formValueProductSku];
      const group = formValueProductSpec.reduce(
        (r, v) => ({
          ...r,
          [v._id]: v && v.values ? v.values.map(v => v._id) : []
        }),
        {}
      );
      const values = productSkuCalculation(group).map(v => {
        let newValue = {
          _id: new ObjectID().toHexString(),
          currency: defaultCurrency,
          discountAmount: 0,
          amount: 0,
          qty: 0,
          idx: 1,
          validateInventory: false,
          isQuote: false,
          specs: Object.keys(v).map(_v => ({
            spec: _v,
            value: v[_v]
          }))
        };
        if (!reduceSpec) {
          const oldValue = prevProductSku.find(v =>
            v.specs.every(v =>
              newValue.specs.find(
                _v => v.spec === _v.spec && v.value === _v.value
              )
            )
          );
          if (oldValue) {
            const index = prevProductSku.indexOf(oldValue);
            prevProductSku.splice(index, 1);
            newValue = {
              ...oldValue,
              ...newValue,
              _id: oldValue._id,
              currency: oldValue.currency || defaultCurrency,
              amount: oldValue.amount || 0,
              discountAmount: oldValue.discountAmount || 0
            };
          }
        }

        return newValue;
      });
      values.sort((a, b) => (a.idx || 0) - (b.idx || 0));
      formValueChange(form, 'sku', values);
      unTouchSkuField();
    }
  }
};
