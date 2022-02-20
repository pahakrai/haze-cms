import {IsOptional, ValidateNested, IsDate, IsMongoId} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {ShoppingCartItemModel} from './shoppingCart.item.model';

export class ShoppingCartSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'owner of the cart'})
  user?: string;

  @IsOptional()
  @ValidateNested({each: true})
  @ApiPropertyOptional({description: 'cart item'})
  items?: ShoppingCartItemModel[];

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'date items added'})
  date?: Date;
}
