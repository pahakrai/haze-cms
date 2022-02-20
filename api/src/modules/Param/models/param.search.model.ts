import {IsString, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class ParamSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'param type'})
  type?: string;

  @IsOptional()
  @IsString({each: true})
  @ApiPropertyOptional({description: 'param type list'})
  types?: string[];
}
