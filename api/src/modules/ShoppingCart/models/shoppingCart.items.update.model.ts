import {IsMongoId, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class ShoppingCartItemsUpdateModel {
  @IsMongoId()
  @ApiProperty({description: 'id of the item'})
  itemId: string;

  @IsNumber()
  qty: number;
}
