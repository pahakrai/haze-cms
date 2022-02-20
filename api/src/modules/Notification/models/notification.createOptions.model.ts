import {IsOptional, IsBoolean, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class NotificationCreateOptionsModel {
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsBoolean()
  sendPushNotification?: boolean;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsBoolean()
  sendUserNotification?: boolean;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsDate()
  delayDate?: Date;
}
