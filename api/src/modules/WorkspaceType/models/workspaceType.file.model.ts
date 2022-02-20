import {LocalizeStringModel} from 'src/core';
import {IsString, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class WorkspaceTypeFileModel {
  @ValidateNested()
  @ApiProperty({description: 'display name for file'})
  name: LocalizeStringModel;

  @IsString()
  @ApiProperty({description: 'file type to match merchant/member data'})
  fileType: string;
}
