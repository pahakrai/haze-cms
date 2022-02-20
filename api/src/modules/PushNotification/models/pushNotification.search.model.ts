import {IsString, IsOptional} from 'class-validator';
export class PushNotificationSearchModel {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  _id: string;
}
