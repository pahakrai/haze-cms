import {IsString, IsNumber, ValidateNested} from 'class-validator';

class LocalizeString {
  [key: string]: string;
}

export class PageMenuItemUpdateModel {
  label: LocalizeString;

  @IsNumber()
  type: number;

  data: any;

  @IsString()
  to: string;

  @IsNumber()
  idx: number;

  @ValidateNested({each: true})
  items: Array<PageMenuItemUpdateModel>;
}
