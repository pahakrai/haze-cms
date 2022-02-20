import {IsString, IsMongoId, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductSkuSpecsUpdateModel {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({description: 'spec of ProductSpecs'})
  spec?: string;

  @IsString()
  @ApiProperty({description: 'value of ProductSkuSpecs'})
  value?: string;
}
