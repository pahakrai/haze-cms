import {IsOptional, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {PushNotificationMessage} from './pushNotificationMessage.model';
export class PushNotificationUpdateModel {
  @ApiProperty()
  @ValidateNested()
  message: PushNotificationMessage; // message we can change it
  @ApiProperty({required: false})
  @IsOptional()
  data: string; // other data, we can change it
}
