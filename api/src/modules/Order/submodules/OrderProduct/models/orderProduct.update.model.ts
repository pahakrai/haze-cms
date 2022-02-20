import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {ArrayMinSize, IsOptional, ValidateNested} from 'class-validator';

import {OrderProductItem} from './orderProduct.item.model';

export class OrderProductUpdateModel {
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => OrderProductItem)
  @ApiProperty({description: 'order item lists'})
  items?: OrderProductItem[];
}
