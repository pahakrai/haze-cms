import {IsString, IsNumber, IsOptional} from 'class-validator';

export class DeviceLocationLogCreateModel {
  @IsString()
  device: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsNumber({}, {each: true})
  coordinates: number[];
}
