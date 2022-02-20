import {IsOptional, IsMongoId, IsInt, IsDate, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class OrderSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'client'})
  client?: string;

  @IsOptional()
  @ApiPropertyOptional({description: 'orderNo'})
  orderNo?: string;

  @IsOptional()
  @ApiPropertyOptional({description: 'orderType'})
  orderType?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'quotation id'})
  quotation?: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt({each: true})
  statuses?: Array<number>;

  @IsDate()
  @IsOptional()
  dateFr?: Date;

  @IsDate()
  @IsOptional()
  dateTo?: Date;

  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'pick up store id'})
  pickupStores?: string[];

  @IsOptional()
  @IsMongoId({each: true})
  @ApiPropertyOptional({description: 'service id'})
  services?: string[];

  @IsOptional()
  @IsString({each: true})
  clientUserTypes?: string[];
}
