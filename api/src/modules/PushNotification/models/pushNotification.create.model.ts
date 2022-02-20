import {IsString, IsOptional, ValidateNested, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {classToPlain} from 'class-transformer';
import {PushNotificationMessage} from './pushNotificationMessage.model';
export class PushNotificationCreateModel {
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {
            key: 'key_sender'
          }
        })
      );
    }
  })
  sender: string;
  @ApiProperty({
    description: 'array: device ids'
  })
  @IsString({each: true})
  toUsers?: string[];

  @IsMongoId()
  @IsOptional()
  userNotification?: string;

  @IsOptional()
  @IsString({each: true})
  toDevices?: string[];

  @IsOptional()
  title?: {[lang: string]: string};

  @ApiProperty()
  @ValidateNested()
  message: PushNotificationMessage;

  hooks: string[];
}
