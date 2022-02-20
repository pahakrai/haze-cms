import {Type} from 'class-transformer';
import {ValidateNested} from 'class-validator';

import {ProductUpdateModel} from './product.update.model';
import {ProductSpecCreateModel} from '../submodules/ProductSpec/models';
import {ProductSkuCreateModel} from '../submodules/ProductSku/models';

export class ProductFormUpdateModel {
  @ValidateNested()
  product: ProductUpdateModel;

  @ValidateNested({each: true})
  @Type(() => ProductSpecCreateModel)
  specs: ProductSpecCreateModel[];

  @ValidateNested({each: true})
  @Type(() => ProductSkuCreateModel)
  skus: ProductSkuCreateModel[];
}
