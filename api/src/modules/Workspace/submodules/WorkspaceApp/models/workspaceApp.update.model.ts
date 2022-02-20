import {IsOptional, IsMongoId, IsString, ValidateNested} from 'class-validator';
import {VersionInfoModel} from './workspaceApp.version.model';
export class WorkspaceAppUpdateModel {
  @IsOptional()
  @IsMongoId()
  workspace: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested()
  productionIOS?: VersionInfoModel;

  @IsOptional()
  @ValidateNested()
  productionAndroid?: VersionInfoModel;
}
