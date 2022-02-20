import {IsDate, IsOptional, IsString, ValidateNested} from 'class-validator';

export class VersionHistoryModel {
  @IsOptional()
  @IsString()
  version: string;

  @IsDate()
  @IsOptional()
  releaseDate: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class VersionInfoModel {
  @IsOptional()
  @IsString()
  appId?: string;

  @IsOptional()
  @IsString()
  appIconLink?: string;

  @IsOptional()
  @IsString()
  touchIcon?: string;

  @IsOptional()
  @IsString()
  latestVersionNo?: string;

  @IsString()
  @IsOptional()
  latestVersionDescription?: string;

  @IsOptional()
  @IsString()
  nextVersionNo?: string;

  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @IsString()
  @IsOptional()
  nextVersionDescription?: string;

  @IsOptional()
  @ValidateNested()
  history?: VersionHistoryModel[];
}

export class NextReleaseInfoModel {
  @IsString()
  nextVersionNo?: string;

  @IsOptional()
  @IsString()
  nextVersionDescription?: string;

  @IsOptional()
  @IsString()
  appId?: string;

  @IsOptional()
  @IsString()
  appIconLink?: string;

  @IsOptional()
  @IsString()
  touchIcon?: string;
}
