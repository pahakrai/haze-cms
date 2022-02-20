import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNumber
} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class WebMenuItemModel {
  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  to: string;

  @IsString()
  @IsOptional()
  icon: string;

  // either localeId or text
  @IsString()
  @IsOptional()
  localeId: string;

  @ValidateNested()
  @IsOptional()
  text: LocalizeStringModel;

  @IsBoolean()
  @IsOptional()
  exact: boolean;

  @IsBoolean()
  @IsOptional()
  hideMenu: boolean;

  @IsString()
  @IsOptional()
  route: string;

  // page string key
  @IsString()
  @IsOptional()
  component: string;

  // policy action array
  @IsString({each: true})
  @IsOptional()
  auth: Array<string>;

  // workspace types
  @IsString({each: true})
  @IsOptional()
  workspaceTypes: Array<string>;

  // workspace access
  @IsOptional()
  @IsString({each: true})
  workspaceAccess: Array<string>;

  // recursive children menu items
  @IsOptional()
  @ValidateNested({each: true})
  items: Array<WebMenuItemModel>;

  @IsNumber()
  @IsOptional()
  priority: number;
}
