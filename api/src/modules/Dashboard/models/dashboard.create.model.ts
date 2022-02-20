import {
  IsString,
  ValidateNested,
  IsOptional,
  IsMongoId,
  IsNumber
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {LocalizeStringModel} from 'src/core';

export class DashboardCreateModel {
  @ValidateNested()
  @ApiProperty({description: 'title', required: true})
  title: LocalizeStringModel;

  @IsString()
  @ApiProperty({required: true})
  apiUrl: string;

  @IsString()
  @ApiProperty({required: true})
  widgetType: string;

  @IsOptional()
  @IsNumber()
  reload: number;

  @IsString({each: true})
  queries: Array<string>;

  // eg1: {x: 0,y: 0,w: 3,h: 1},
  // eg2: {lg: {x: 3,y: 0,w: 3,h: 1},md: {x: 3,y: 0,w: 3,h: 1},sm: {x: 3,y: 0,w: 3,h: 1},
  //       xs: {x: 0,y: 1,w: 3,h: 1},xxs: {x: 0,y: 1,w: 3,h: 1}}
  @IsOptional()
  position?: JSON;

  @IsMongoId({each: true})
  @IsOptional()
  workspaces?: Array<string>;
}
