import {IsString, IsOptional, ValidateNested} from 'class-validator';
import {ThemeIconsModel} from './theme.icons.model';

export class ThemeUpdateModel {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  baseTheme?: string;

  @IsOptional()
  color?: any;

  @IsOptional()
  dimensions?: any;

  @ValidateNested()
  @IsOptional()
  icons?: ThemeIconsModel;
}
