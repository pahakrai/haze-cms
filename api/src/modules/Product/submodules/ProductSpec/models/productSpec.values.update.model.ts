import {IsMongoId, ValidateNested, IsOptional} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class ProductSpecValuesUpdateModel {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @ValidateNested({each: true})
  @IsOptional()
  name?: LocalizeStringModel;
}
