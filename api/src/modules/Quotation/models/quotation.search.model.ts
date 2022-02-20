import {IsEnum, IsString, IsOptional, IsMongoId} from 'class-validator';

import common from '@golpasal/common';

import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models';

const {QuotationStatus} = common.status;

export class QuotationSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'client'})
  client?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'quotationNo'})
  quotationNo?: string;

  @IsOptional()
  @IsEnum(QuotationStatus)
  @ApiPropertyOptional({description: 'quotation status'})
  status?: number;
}
