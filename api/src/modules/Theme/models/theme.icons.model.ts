import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ThemeIconsModel {
  @IsString()
  @IsOptional()
  @ApiProperty({description: 'facebook of theme'})
  facebook?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'youtube of theme'})
  youtube?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'instagram of theme'})
  instagram?: string;
}
