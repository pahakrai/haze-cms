import {
  IsString,
  IsOptional,
  ValidateNested,
  IsInt,
  IsBoolean
} from 'class-validator';
import {Type} from 'class-transformer';
import {WorkspaceContactModel} from './workspace.contact.model';
import {WorkspaceMarketingModel} from './workspace.marketing.model';
import {WorkspaceSettingModel} from './workspace.setting.model';
import {WorkspaceMetaModel} from './workspace.meta.model';
import {WorkspaceSocialLinkModel} from './workspace.social.link.model';
import {WorkspaceIntegrationsModel} from './workspace.integrations.model';
import {WorkspacePreferenceModel} from './workspace.preference.model';
import {ServiceAppsModel} from './workspace.serviceApps.model';

export class WorkspaceUpdateModel {
  @IsString()
  @IsOptional()
  code?: string;

  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

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
  setting?: WorkspaceSettingModel;

  @IsOptional()
  @ValidateNested()
  preferences?: WorkspacePreferenceModel;

  @IsString()
  @IsOptional()
  defaultCurrency?: string;

  @IsInt()
  @IsOptional()
  status?: number;

  @IsOptional()
  @ValidateNested()
  contacts?: WorkspaceContactModel;

  @IsOptional()
  socialLinks?: WorkspaceSocialLinkModel | any;

  @IsOptional()
  @ValidateNested()
  seoMeta?: WorkspaceMetaModel | any;

  @IsOptional()
  @ValidateNested()
  marketing?: WorkspaceMarketingModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => WorkspaceIntegrationsModel)
  integrations?: WorkspaceIntegrationsModel[];

  @IsOptional()
  @IsString()
  appStoreUrl?: string;

  @IsOptional()
  @IsString()
  googlePlayUrl?: string;

  @IsOptional()
  @ValidateNested()
  serviceApps?: ServiceAppsModel;
}
