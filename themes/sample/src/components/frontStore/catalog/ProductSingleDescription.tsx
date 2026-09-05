import Area from '@components/common/Area.js';
import { Editor } from '@components/common/Editor.js';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';

export const ProductSingleDescription = () => {
  const { description } = useProduct();

  return (
    <>
      <Area id="productDescriptionBefore" noOuter />
      <div className="product__single__description mt-8">
        <h3>Descripción del producto</h3>
        <Editor rows={description} />
      </div>
      <Area id="productDescriptionAfter" noOuter />
    </>
  );
};
