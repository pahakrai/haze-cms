export const mapProductProperties = (
  product: IProduct,
  productSku: IProductSku
): { spec: string | undefined; value: string | undefined }[] => {
  const _specs = productSku.specs;
  const _result = _specs.map((_spec) => {
    const _productSpec = product.specs?.find((_productSpec) => {
      return _productSpec._id === _spec.spec?._id;
    });
    const _productSpecValue = _productSpec?.values?.find(
      (_productSpecValue) => {
        return _productSpecValue._id === _spec.value;
      }
    );
    return {
      spec: _productSpec?.name,
      value: _productSpecValue?.name
    };
  });
  return _result;
};

export const formatSkuName = (sku?: IProductSku) => {
  const specs = sku && sku.specs ? sku.specs : [];
  return specs
    .map((item) => {
      const values = (item.spec && item.spec?.values) || [];
      const value = values.find((v) => v._id === item.value);
      return (value && value.name && value.name) || "-";
    })
    .join(" - ");
};
