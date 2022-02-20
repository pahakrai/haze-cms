import {IsString, ValidateNested, IsOptional, IsEnum} from 'class-validator';
import common from '@golpasal/common';
import {Type} from 'class-transformer';

const {WorkspaceType} = common.type;

class PolicyStatementUpdateModel {
  @IsString()
  @IsOptional()
  Effect?: string;

  @IsString({each: true})
  @IsOptional()
  Action?: string[];

  @IsString()
  @IsOptional()
  Resource?: string;
}

export class PolicyUpdateModel {
  @IsString()
  @IsOptional()
  name?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => PolicyStatementUpdateModel)
  Statement?: PolicyStatementUpdateModel[];

  @IsString({each: true})
  @IsOptional()
  workspaceAccess?: string[];

  @IsEnum(WorkspaceType, {each: true})
  @IsOptional()
  workspaceTypes?: string[];
}
