import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsMongoId
} from 'class-validator';
import common from '@golpasal/common';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class PricingUpdateModel {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({description: 'new amount'})
  amount?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'price description'})
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'new currency'})
  currency?: string;

  @IsOptional()
  @IsEnum(common.type.PriceType)
  @ApiPropertyOptional({description: 'price type'})
  priceType?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'start date'})
  effectiveDateFr?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'end date'})
  effectiveDateTo?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'is this price active'})
  isActive?: boolean;
}
