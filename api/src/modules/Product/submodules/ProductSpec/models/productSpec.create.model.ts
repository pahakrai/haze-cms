import {IsMongoId, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';
import {ProductSpecValuesModel} from './productSpec.values.model';

export class ProductSpecCreateModel {
  @IsMongoId()
  @ApiProperty({
    description: 'generated in frontend in order to use in sku.specs'
  })
  _id: string;

  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  product: string;

  @ValidateNested()
  @ApiProperty({
    required: true,
    description: 'name of productSpec, which is unique'
  })
  name: LocalizeStringModel;

  @ValidateNested({each: true})
  values: ProductSpecValuesModel[];
}
