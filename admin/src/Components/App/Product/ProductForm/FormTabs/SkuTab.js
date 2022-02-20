import React from 'react';

import Error from '../../../../Form/Error';
import ProductSpecForm from '../ProductSpecForm';
import ProductSkuForm from '../ProductSkuForm';
export const SkuTab = ({ intl, workspaceType, uploadSpecIcon }) => {
  return (
    <>
      <ProductSpecForm
        intl={intl}
        name="spec"
        workspaceType={workspaceType}
        uploadSpecIcon={uploadSpecIcon}
      />
      <ProductSkuForm intl={intl} name="sku" workspaceType={workspaceType} />
      <Error touched name="sku" style={{ marginTop: 10 }} />
    </>
  );
};
