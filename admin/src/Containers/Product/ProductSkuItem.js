import React, { useState, useEffect } from 'react';

import ProductSkuService from '../../Services/APIServices/ProductSkuService';

export default ({ id, children }) => {
  const [productSku, setProductSku] = useState();
  useEffect(() => {
    const func = async () => {
      const result = await ProductSkuService.getProductSkuById(id, {
        populates: ['$specs.spec', 'product']
      });
      result && result.data && setProductSku(result.data);
    };
    id ? func() : setProductSku(null);
  }, [id]);

  return (
    <React.Fragment>
      {typeof children === 'function' && children({ productSku })}
    </React.Fragment>
  );
};
