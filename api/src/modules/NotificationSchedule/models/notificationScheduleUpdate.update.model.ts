import {IsString, IsOptional, IsNotEmpty} from 'class-validator';
import {classToPlain} from 'class-transformer';
export class NotificationScheduleUpdateModel {
  @IsOptional()
  title: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };

  @IsOptional()
  body: {
    en: string;
    'zh-cn': string;
    'zh-hk': string;
  };

  @IsOptional()
  data: {
    link?: string;
    parameters?: any;
  };

  @IsOptional()
  to: {
    filters: any;
  };

  @IsString({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {value: 'actionTime'}
        })
      );
    }
  })
  @IsOptional()
  notificationTime: Date;

  @IsOptional()
  image: {
    fileMeta: any;
  };

  @IsNotEmpty({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {value: 'notificationMediaType'}
        })
      );
    }
  })
  notificationMediaType: string;
}
