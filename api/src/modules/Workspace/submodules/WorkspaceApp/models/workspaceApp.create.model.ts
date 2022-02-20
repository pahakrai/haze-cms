import {IsMongoId, IsOptional, IsString, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {VersionInfoModel} from './workspaceApp.version.model';

export class WorkspaceAppCreateModel {
  @IsOptional()
  @IsMongoId()
  workspace?: string;

  @ApiProperty({required: true})
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested()
  productionIOS?: VersionInfoModel;

  @IsOptional()
  @ValidateNested()
  productionAndroid?: VersionInfoModel;
}
