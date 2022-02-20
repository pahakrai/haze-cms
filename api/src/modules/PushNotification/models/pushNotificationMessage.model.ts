import {IsString, IsOptional} from 'class-validator';

export class PushNotificationMessageData {
  @IsOptional()
  @IsString()
  screen?: string;

  @IsOptional()
  parameters?: any;
}

export class PushNotificationMessage {
  @IsOptional()
  data?: PushNotificationMessageData;

  @IsString()
  title: {[key: string]: string};

  @IsString()
  body: {[key: string]: string};
}
