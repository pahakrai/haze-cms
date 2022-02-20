import {
  IsString,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsMongoId
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';
import {UserTypeConfig, UserTypeDisplay} from './workspaceType.create.model';

const {WorkspaceType} = common.type;

export class WorkspaceTypeUpdateModel {
  @IsString()
  @IsEnum(WorkspaceType)
  @ApiProperty({description: 'workspace type'})
  @IsOptional()
  type?: string;

  @IsMongoId()
  @IsOptional()
  payrollPayeeUserType?: string;

  @ValidateNested({each: true})
  @ApiProperty({description: 'config of user types'})
  userTypeConfigs: UserTypeConfig[];

  @ValidateNested({each: true})
  @ApiProperty({description: 'user type display'})
  userTypeDisplay: UserTypeDisplay[];
}
