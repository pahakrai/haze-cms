import {IsString, IsOptional, Matches, IsMongoId} from 'class-validator';

import {BaseSearchModel} from 'src/core/models';

export class SalesVolumeSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @Matches(new RegExp(/^\d{4}\-(0?[1-9]|1[012])/))
  time?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsMongoId()
  @IsOptional()
  notId?: string;
}
