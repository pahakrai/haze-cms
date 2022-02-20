import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class Message {
  @ApiProperty({required: false})
  @IsOptional()
  data: object;
  @ApiProperty({required: true})
  @IsString()
  title: string;
  @ApiProperty({required: true})
  @IsString()
  body: string;
}
