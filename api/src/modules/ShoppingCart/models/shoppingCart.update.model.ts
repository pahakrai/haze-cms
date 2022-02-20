import {IsOptional, ValidateNested} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

import {ShoppingCartItemModel} from './shoppingCart.item.model';

export class ShoppingCartUpdateModel {
  @IsOptional()
  @ValidateNested({each: true})
  @ApiPropertyOptional({description: 'new cart item list'})
  items?: ShoppingCartItemModel[];

  $push?: any;

  $pull?: any;
}
