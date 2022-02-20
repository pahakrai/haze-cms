import {
  IsString,
  IsOptional,
  ValidateNested,
  IsInt,
  IsMongoId,
  IsBoolean,
  IsUrl
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {WorkspaceContactModel} from './workspace.contact.model';
import {WorkspaceMarketingModel} from './workspace.marketing.model';
import {WorkspaceSettingModel} from './workspace.setting.model';
import {WorkspaceMetaModel} from './workspace.meta.model';
import {WorkspaceSocialLinkModel} from './workspace.social.link.model';
import {WorkspaceIntegrationsModel} from './workspace.integrations.model';
import {WorkspacePreferenceModel} from './workspace.preference.model';
import {ServiceAppsModel} from './workspace.serviceApps.model';

export class WorkspaceCreateModel {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsString()
  code: string;

  @ApiProperty({description: 'name', required: true})
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @ValidateNested()
  setting?: WorkspaceSettingModel;

  @IsOptional()
  @ValidateNested()
  preferences?: WorkspacePreferenceModel;

  @IsString()
  defaultCurrency: string;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  webHost?: string;

  @IsBoolean()
  @IsOptional()
  alwaysHttpsWebHost?: boolean;

  @IsOptional()
  @IsString()
  merchantWebHost?: string;

  @IsBoolean()
  @IsOptional()
  alwaysHttpsMerchantWebHost?: boolean;

  @IsOptional()
  @IsString()
  adminHost?: string;

  @IsBoolean()
  @IsOptional()
  alwaysHttpsAdminWebHost?: boolean;

  @IsOptional()
  @ValidateNested()
  contacts?: WorkspaceContactModel;

  @IsOptional()
  socialLinks?: WorkspaceSocialLinkModel | any;

  @IsOptional()
  seoMeta?: WorkspaceMetaModel | any;

  @IsOptional()
  @ValidateNested()
  marketing?: WorkspaceMarketingModel;

  @IsOptional()
  @ValidateNested({each: true})
  integrations?: WorkspaceIntegrationsModel[];

  @IsString()
  @IsOptional()
  secret?: string;

  @IsOptional()
  @IsUrl()
  appStoreUrl?: string;

  @IsOptional()
  @IsUrl()
  googlePlayUrl?: string;

  @IsOptional()
  @ValidateNested()
  serviceApps?: ServiceAppsModel;
}
