import {IsString, IsEnum, IsOptional} from 'class-validator';
import common from '@golpasal/common';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

const {WorkspaceType} = common.type;

export class WorkspaceTypeSearchModel extends BaseSearchModel {
  @IsString()
  @IsOptional()
  @IsEnum(WorkspaceType)
  @ApiPropertyOptional({description: 'workspace type'})
  type?: string;
}
