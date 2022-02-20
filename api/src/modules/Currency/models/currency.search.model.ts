import {IsString, IsBoolean, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class CurrencySearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'currency code'})
  code?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'is currency active for user'})
  isActive?: boolean;
}
