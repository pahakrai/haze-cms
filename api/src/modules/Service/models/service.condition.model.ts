import {IsString} from 'class-validator';

export class ServiceConditionModel {
  @IsString()
  key: string;

  @IsString()
  comparison: string;

  value: any;
}
