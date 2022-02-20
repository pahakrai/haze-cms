import {IsString, IsOptional, ValidateNested} from 'class-validator';

export class ServiceAppFacebooklModel {
  @IsString()
  @IsOptional()
  appId?: string;

  @IsString()
  @IsOptional()
  secret?: string;
}

export class ServiceAppGoogleModel {
  web: ServiceAppGoogleWebModel;
  ios: ServiceAppGoogleIosModel;
  android: ServiceAppGoogleAndroidModel;
}

export class ServiceAppGoogleWebModel {
  @IsString()
  @IsOptional()
  appId?: string;
}
export class ServiceAppGoogleIosModel {
  @IsString()
  @IsOptional()
  appId?: string;
}
export class ServiceAppGoogleAndroidModel {
  @IsString()
  @IsOptional()
  appId?: string;
}
export class ServiceAppsModel {
  @IsOptional()
  @ValidateNested()
  facebook?: ServiceAppFacebooklModel;

  @IsOptional()
  @ValidateNested()
  google?: ServiceAppGoogleModel;
}
