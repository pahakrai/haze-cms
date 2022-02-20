import {IsMongoId, ValidateNested} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class ProductSpecValuesModel {
  @IsMongoId()
  _id: string;

  @ValidateNested()
  name: LocalizeStringModel;
}
