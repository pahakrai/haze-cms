import {IsOptional, ValidateNested} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {ProductSpecValuesModel} from './productSpec.values.model';

export class ProductSpecUpdateModel {
  @IsOptional()
  @ValidateNested()
  name?: LocalizeStringModel;

  @IsOptional()
  @ValidateNested({each: true})
  values?: ProductSpecValuesModel[];
}
