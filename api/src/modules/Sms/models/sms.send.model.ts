import {IsString, IsNotEmpty, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SMSSendModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'phone number that send SMS to'})
  // phone number that send SMS to
  to: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'SMS content'})
  // SMS content
  body: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({description: 'workspace of user'})
  workspace: string;
}
