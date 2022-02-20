import {
  IsString,
  ValidateNested,
  IsOptional,
  IsMongoId,
  IsNumber
} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class DashboardUpdateModel {
  @ValidateNested()
  @IsOptional()
  title?: LocalizeStringModel;

  @IsString()
  @IsOptional()
  apiUrl?: string;

  @IsString()
  @IsOptional()
  widgetType?: string;

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
