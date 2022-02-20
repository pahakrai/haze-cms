import { useState, useEffect } from 'react';

import ProductService from '../Services/APIServices/ProductService';
import ProductSkuService from '../Services/APIServices/ProductSkuService';

export const useProduct = id => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const req = async () => {
      try {
        const result = await ProductService.getProductById(id, {
          populates: ['specs', 'skus', 'category']
        });
        result && result.data && setData(result.data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      req();
    } else {
      setData(null);
    }
  }, [id]);

  return {
    data,
    loading
  };
};
export const useProductSku = id => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const req = async () => {
      try {
        const result = await ProductSkuService.getProductSkuById(id, {
          populates: ['$specs.spec']
        });
        result && result.data && setData(result.data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      req();
    } else {
      setData(null);
    }
  }, [id]);

  return {
    data,
    loading
  };
};
