import {IsString} from 'class-validator';

export class UpdateDeviceLocationModel {
  @IsString()
  latlng: string;
}
