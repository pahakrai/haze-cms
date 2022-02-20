import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsMongoId,
  IsBoolean
} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class MemberSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsInt({each: true})
  userStatuses?: Array<number>;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  employmentTypes?: Array<string>;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  tags?: Array<string>;

  @IsArray()
  @IsMongoId({each: true})
  @IsOptional()
  locations?: Array<string>;

  @IsArray()
  @IsMongoId({each: true})
  @IsOptional()
  categories?: Array<string>;

  @IsBoolean()
  @IsOptional()
  isHandleBy?: boolean;
}
