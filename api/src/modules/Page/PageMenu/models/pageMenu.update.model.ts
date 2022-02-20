import {IsString} from 'class-validator';

export class PageMenuUpdateModel {
  @IsString()
  code: string;

  @IsString()
  platform: string;

  items: Array<any>;

  mItems: Array<any>;
}
