import {IsString, IsOptional, IsMongoId, IsArray} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class TagSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'hash tag text'})
  text?: string;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  texts?: string[];

  @IsOptional()
  @IsString({each: true})
  @ApiPropertyOptional({description: 'related collections'})
  refTypes?: string[];

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'related doc _id'})
  ref?: string;
}
