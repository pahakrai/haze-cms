import {IsString, IsOptional, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductSKUQueryModel {
  @IsString({each: true})
  @ApiProperty({
    description: 'product spec & value, in ${specId}_${specVal} format'
  })
  specs: string[];

  @IsOptional()
  @IsDate()
  expiryDateLte?: Date;

  @IsOptional()
  @IsDate()
  expiryDateGte?: Date;
}
