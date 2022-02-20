import {ValidateNested, IsEmpty, ArrayMinSize} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';

import {OrderProductItem} from './orderProduct.item.model';

export class OrderProductCreateModel {
  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS from frontend'})
  order?: string;

  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => OrderProductItem)
  @ApiProperty({description: 'order item lists'})
  items: OrderProductItem[];
}
