import React, { useState, useEffect } from 'react';

import ProductService from '../../Services/APIServices/ProductService';

export default ({ id, children }) => {
  const [product, setProduct] = useState();
  useEffect(() => {
    const func = async () => {
      const result = await ProductService.getProductById(id, {
        populates: ['specs', 'skus', 'category']
      });

      result && result.data && setProduct(result.data);
    };
    func();
  }, [id]);
  return (
    <React.Fragment>
      {typeof children === 'function' && children({ product })}
    </React.Fragment>
  );
};
