import {IsBoolean, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class PaymentMethodSearchModel extends BaseSearchModel {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description: 'whether method is active'})
  isActive?: boolean;
}
