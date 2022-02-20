import {IsString, IsOptional, IsNotEmpty} from 'class-validator';
export class Message {
  @IsNotEmpty()
  title: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };

  @IsOptional()
  data: {
    link: string;
    parameters: any;
  };

  @IsString()
  notificationTime: string;

  @IsNotEmpty()
  to: {
    filters: any;
  };
}
