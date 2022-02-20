import {IsString, IsInt} from 'class-validator';

export class PageDiffNodeModel {
  @IsString()
  date: string;

  @IsInt()
  version: number;

  up: any;

  down: any;
}
