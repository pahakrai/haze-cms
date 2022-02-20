import {IsString, IsOptional} from 'class-validator';

import {WebMenuItemModel} from './webMenu.item.model';

export class WebMenuCreateModel {
  @IsString()
  @IsOptional()
  code?: string;

  @IsOptional()
  menu?: Array<WebMenuItemModel>;
}
