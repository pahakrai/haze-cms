import {IsOptional, IsMongoId} from 'class-validator';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class PostCommentSearchModel extends BaseSearchModel {
  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({description: 'filter by post'})
  post?: string;
}
