import {IsString, IsOptional, IsArray, IsMongoId} from 'class-validator';

export class PreferenceModel {
  @IsArray()
  @IsString({each: true})
  @IsOptional()
  employmentTypes?: Array<string>;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  tags?: Array<string>;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  locations?: Array<string>;

  @IsArray()
  @IsMongoId({each: true})
  @IsOptional()
  categories?: Array<string>;
}
