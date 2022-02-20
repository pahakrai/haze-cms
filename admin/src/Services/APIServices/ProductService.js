import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const appendFileToFormData = (files, data) => {
  const keys = Object.keys(files);
  keys.length > 0 && keys.forEach(v => data.append(v, files[v]));
};

const getProducts = opts => {
  return ecommApi.get('/products?' + serialize(opts));
};

const getProductById = (id, opts) => {
  return ecommApi.get(`/products/${id}?` + serialize(opts));
};

const createProduct = (
  product,
  files,
  skuFiles = {},
  mediaList1 = {},
  mediaList2 = {},
  mediaList3 = {},
  onUploadProgress
) => {
  const data = new FormData();
  // files
  files.forEach(f => data.append(`product_files`, f));
  // skuFile
  appendFileToFormData(skuFiles, data);
  // mediaList1
  appendFileToFormData(mediaList1, data);
  // mediaList2
  appendFileToFormData(mediaList2, data);
  // mediaList3
  appendFileToFormData(mediaList3, data);
  // body
  const stringtifyBody = JSON.stringify(product);
  data.append('form', stringtifyBody);
  return ecommApi.post(`products`, data, { onUploadProgress });
};
const updateProduct = (
  _id,
  product,
  files,
  skuFiles = {},
  mediaList1 = {},
  mediaList2 = {},
  mediaList3 = {},
  onUploadProgress
) => {
  const data = new FormData();
  // files
  files.forEach(f => data.append(`product_files`, f));
  // skuFile
  appendFileToFormData(skuFiles, data);
  // mediaList1
  appendFileToFormData(mediaList1, data);
  // mediaList2
  appendFileToFormData(mediaList2, data);
  // mediaList3
  appendFileToFormData(mediaList3, data);
  const stringtifyBody = JSON.stringify(product);
  data.append('form', stringtifyBody);
  return ecommApi.put(`products/${_id}`, data, { onUploadProgress });
};
const getProductWatchById = (id, opts) => {
  return ecommApi.get(
    `/product-watches/by-product-id/${id}?` + serialize(opts)
  );
};

const importProduct = (files, onUploadProgress) => {
  const data = new FormData();

  if (files) files.forEach(f => data.append(`file`, f));
  // data.append('utcOffset', moment().format('Z'));
  return ecommApi.post('products/imports', data, {
    onUploadProgress
  });
};

const uploadSpecIcon = (
  id,
  formValue,
  iconFiles = [],
  iconActiveFiles = []
) => {
  const data = new FormData();
  if (iconFiles[0]) {
    data.append(`icon`, iconFiles[0]);
  }
  if (iconActiveFiles[0]) {
    data.append(`activeIcon`, iconActiveFiles[0]);
  }
  const stringtifyBody = JSON.stringify(formValue);
  data.append('form', stringtifyBody);
  return ecommApi.patch(`productspecs/${id}`, data);
};

export default {
  self: ecommApi,
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  getProductWatchById,
  importProduct,
  uploadSpecIcon
};
