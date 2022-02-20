import {IsString, IsMongoId, IsBoolean, IsOptional} from 'class-validator';

export class FileInfo {
  @IsString()
  fileType: string; // match from workspaceType

  @IsOptional()
  priority?: number;

  @IsString()
  userType: string; // user or member or merchant

  @IsString()
  isVerified?: boolean;
}

export class FileModel {
  @IsString()
  fileType?: string;

  @IsMongoId()
  file?: string;

  @IsBoolean()
  isVerified?: boolean;
}
