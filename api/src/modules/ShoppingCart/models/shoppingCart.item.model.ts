import {IsMongoId, IsNumber, Min} from 'class-validator';

export class ShoppingCartItemModel {
  @IsMongoId()
  product: string;

  @IsMongoId()
  productSku: string;

  @Min(1)
  @IsNumber()
  qty: number;
}
