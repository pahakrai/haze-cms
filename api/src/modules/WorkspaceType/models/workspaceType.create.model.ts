import {
  IsString,
  ValidateNested,
  IsEnum,
  IsOptional,
  IsMongoId,
  IsBoolean
} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';
import {WorkspaceTypeFileModel} from './workspaceType.file.model';
import {WorkspaceTypeMetaModel} from './workspaceType.meta.model';
import {WorkspaceTypePreferenceModel} from './workspaceType.preference.model';
import {LocalizeStringModel} from '../../../core/models/localize.string.model';

const {UserType, WorkspaceType} = common.type;

export class UserTypeConfig {
  @IsString()
  @IsEnum(UserType)
  @ApiProperty({description: 'user type'})
  userType: string;

  @ValidateNested({each: true})
  @Type(() => WorkspaceTypeFileModel)
  @IsOptional()
  files?: WorkspaceTypeFileModel[];

  @ValidateNested({each: true})
  @IsOptional()
  meta?: WorkspaceTypeMetaModel[];

  @ValidateNested({each: true})
  @IsOptional()
  preferences?: WorkspaceTypePreferenceModel[];
}

export class UserTypeDisplay {
  @IsString()
  @IsEnum(UserType)
  @ApiProperty({description: 'user type'})
  type: string;

  @ValidateNested({each: true})
  @IsOptional()
  name?: LocalizeStringModel;

  @IsBoolean()
  @IsOptional()
  isShow?: boolean;
}

export class WorkspaceTypeCreateModel {
  @IsString()
  @IsEnum(WorkspaceType)
  @ApiProperty({description: 'workspace type'})
  type: string;

  @IsMongoId()
  @IsOptional()
  payrollPayeeUserType?: string;

  @ValidateNested({each: true})
  @ApiProperty({description: 'config of user types'})
  userTypeConfigs: UserTypeConfig[];

  @ValidateNested({each: true})
  @ApiProperty({description: 'display name of userTypes'})
  userTypeDisplay: UserTypeDisplay[];
}
