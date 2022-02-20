import {IsMongoId, IsOptional, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {ShoppingCartItemModel} from './shoppingCart.item.model';

export class ShoppingCartCreateModel {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'owner of the cart'})
  // TODO: handle by token, not passed from client side
  user?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @ApiProperty({description: 'cart items'})
  items?: ShoppingCartItemModel[];
}
