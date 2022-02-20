import {IsString, IsNumber} from 'class-validator';

class LocalizeString {
  [key: string]: string;
}

export class PageMenuItemInsertModel {
  name: LocalizeString;

  @IsString()
  type: string;

  data: any;

  to: any;

  effects: any;

  @IsNumber()
  idx: number;

  // @IsArray()
  // items: Array<PageMenuItemModel>;

  // @IsArray()
  // mItems: Array<PageMenuItemModel>;
}
