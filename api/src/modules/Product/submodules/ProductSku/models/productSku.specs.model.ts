import {IsString, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductSkuSpecsModel {
  @IsMongoId()
  @ApiProperty({description: 'spec of ProductSpecs'})
  spec: string;

  @IsString()
  @ApiProperty({description: 'value of ProductSkuSpecs'})
  value: string;
}
