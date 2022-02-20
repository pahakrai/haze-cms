import {IsString, IsOptional, IsMongoId} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models';

export class UserSearchHistorySearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({description: 'search text'})
  text?: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'user id'})
  user?: string;
}
