import {IsOptional, ValidateNested} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

import {ShoppingCartItemModel} from './shoppingCart.item.model';

export class ShoppingCartItemsModel extends BaseSearchModel {
  @IsOptional()
  @ValidateNested({each: true})
  items?: ShoppingCartItemModel[];
}
