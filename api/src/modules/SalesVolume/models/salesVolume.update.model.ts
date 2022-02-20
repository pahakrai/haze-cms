import {
  Matches,
  IsNumber,
  IsString,
  IsOptional,
  IsPositive
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class SalesVolumeUpdateModel {
  @IsOptional()
  @Matches(new RegExp(/^\d{4}\-(0?[1-9]|1[012])/))
  time: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  currency?: string;

  @IsPositive()
  @IsOptional()
  @IsNumber({allowInfinity: false, allowNaN: false})
  amount?: number;
}
