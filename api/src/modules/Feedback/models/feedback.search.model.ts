import {IsMongoId, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class FeedbackSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'from user id'})
  from?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'to user id'})
  to?: string;

  @IsOptional()
  @ApiPropertyOptional({description: 'refType'})
  refType?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'ref id'})
  ref?: string;
}
