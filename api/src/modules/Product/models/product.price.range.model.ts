import {IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductPriceRangeModel {
  @IsNumber()
  @ApiProperty({description: 'lowest price of SKUs'})
  min: number;

  @IsNumber()
  @ApiProperty({description: 'highest price of SKUs'})
  max: number;
}
