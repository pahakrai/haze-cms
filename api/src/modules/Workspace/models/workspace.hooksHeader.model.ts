import {IsString} from 'class-validator';

export class HooksHeader {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
