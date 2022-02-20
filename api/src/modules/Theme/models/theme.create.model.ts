import {IsString, IsOptional, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {ThemeIconsModel} from './theme.icons.model';

export class ThemeCreateModel {
  @IsString()
  @ApiProperty({description: 'name of theme'})
  name: string;

  @IsString()
  @ApiProperty({description: 'scope of theme'})
  scope: string;

  @IsString()
  @ApiProperty({description: 'baseTheme of theme'})
  baseTheme: string;

  color: any;

  dimensions: any;

  @ValidateNested()
  @IsOptional()
  icons?: ThemeIconsModel;
}
