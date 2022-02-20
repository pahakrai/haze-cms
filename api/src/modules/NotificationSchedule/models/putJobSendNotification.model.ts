import {IsString, IsOptional, IsArray} from 'class-validator';
export class PutJobSendNotificationModel {
  @IsOptional()
  @IsString()
  senders: [string];

  @IsOptional()
  @IsString()
  _id?: string;

  @IsArray()
  @IsOptional()
  toUsers?: Array<any>;

  @IsArray()
  @IsOptional()
  toDevices?: Array<any>;

  @IsString()
  @IsOptional()
  notificationMediaType?: string;

  @IsOptional()
  title: any;

  @IsOptional()
  images: [any];

  @IsOptional()
  hooks: Array<string>;

  body: any;

  data: {
    screen: string;
    parameters: any;
  };
}
