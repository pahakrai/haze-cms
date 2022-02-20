import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {classToPlain} from 'class-transformer';
export class PushNotificationDelateModel {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {
            key: 'key_user'
          }
        })
      );
    }
  })
  userId: string;
  @ApiProperty()
  @IsString({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {
            key: 'key_id'
          }
        })
      );
    }
  })
  _id: string;
}
