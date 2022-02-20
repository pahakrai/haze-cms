import {IProductSku} from './IProductSku';
import {ProductSkuCreateModel, ProductSkuUpdateModel} from '../models';

export interface IProductSkuService {
  create(productSkuCreateModel: ProductSkuCreateModel): Promise<IProductSku>;
  findById(_id: string): Promise<IProductSku | null>;
  update(
    _id: string,
    productUpdateModel: ProductSkuUpdateModel
  ): Promise<IProductSku | null>;
  delete(_id: string): void;
}
