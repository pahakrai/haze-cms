import {IsOptional, IsMongoId, IsDate} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models';

export class WorkspaceSubscriptionInvoiceSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'subscription id'})
  subscription: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'issuing date from'})
  dateFr?: Date;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'issuing date to'})
  dateTo?: Date;
}
