import {Type} from 'class-transformer';
import {ValidateNested} from 'class-validator';

import {ProductCreateModel} from './product.create.model';
import {ProductSpecCreateModel} from '../submodules/ProductSpec/models';
import {ProductSkuCreateModel} from '../submodules/ProductSku/models';

export class ProductFormCreateModel {
  @ValidateNested()
  product: ProductCreateModel;

  @ValidateNested({each: true})
  @Type(() => ProductSpecCreateModel)
  specs: ProductSpecCreateModel[];

  @ValidateNested({each: true})
  @Type(() => ProductSkuCreateModel)
  skus: ProductSkuCreateModel[];
}
