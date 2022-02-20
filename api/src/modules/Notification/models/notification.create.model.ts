import {
  IsOptional,
  ArrayMinSize,
  IsString,
  ValidateNested
} from 'class-validator';
import {NotificationToUserCreateModel} from './notification.toUser.create.model';

export class NotificationCreateModel {
  @IsString({each: true})
  @ArrayMinSize(1)
  @IsOptional()
  senders?: string[];

  @ValidateNested({each: true})
  @IsOptional()
  toUsers?: NotificationToUserCreateModel[];

  @IsOptional()
  @IsString({each: true})
  toDevices?: string[];

  @IsOptional()
  title?: {
    [lang: string]: string;
  };

  @IsOptional()
  images?: Array<any>;

  @IsOptional()
  hooks?: Array<string>;

  /**
   * required for: MOBILE
   */
  body?: {
    [lang: string]: string;
  };

  data: {
    screen: string;
    parameters: any;
  };

  @IsOptional()
  @IsString()
  notificationMediaType?: string;
}
