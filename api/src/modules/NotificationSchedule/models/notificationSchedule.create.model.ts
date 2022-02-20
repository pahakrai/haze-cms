import {
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsString,
  IsDate,
  IsNumber
} from 'class-validator';
import {classToPlain} from 'class-transformer';

export class NotificationScheduleTemplateModel {
  @IsOptional()
  @IsNotEmpty({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {value: 'title'}
        })
      );
    }
  })
  title?: {
    en?: string;
    'zh-cn'?: string;
    'zh-hk'?: string;
  };

  @IsOptional()
  @IsNotEmpty({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {value: 'body'}
        })
      );
    }
  })
  body?: {
    en?: string;
    'zh-cn'?: string;
    'zh-hk'?: string;
  };

  @IsNotEmpty({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {value: 'data'}
        })
      );
    }
  })
  @IsOptional()
  data?: {
    screen?: string;
    parameters?: any;
  };

  @IsOptional()
  images?: string[];

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

export class NotificationScheduleReoccuranceModel {
  @IsOptional()
  @IsString()
  everyType?: string;

  @IsOptional()
  @IsNumber()
  everyN?: number;

  @IsOptional()
  @IsNumber({}, {each: true})
  weeklyDays?: number[];

  @IsOptional()
  @IsNumber()
  monthlyDate?: number;

  @IsOptional()
  @IsDate()
  yearlyDate?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;
}

export class NotificationScheduleToModel {
  @IsOptional()
  @IsString({each: true})
  groups?: string[];

  @IsOptional()
  filters?: any;

  @IsOptional()
  @IsString({each: true})
  users?: string[];

  @IsOptional()
  @IsString({each: true})
  scopes?: string[];

  @IsOptional()
  @IsString({each: true})
  userTypes?: string[];
}

export class NotificationScheduleCreateModel {
  @ValidateNested()
  notification: NotificationScheduleTemplateModel;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @ValidateNested()
  reoccurance?: NotificationScheduleReoccuranceModel;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsNotEmpty({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {value: 'to'}
        })
      );
    }
  })
  to: NotificationScheduleToModel;
}
