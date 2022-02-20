import {IsString} from 'class-validator';

export class PageMenuCreateModel {
  @IsString()
  code: string;

  @IsString()
  platform: string;

  // @IsArray()
  // items: Array<PageMenuItemModel>;

  // @IsString()
  // workspace: string;
}
