import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PageMenuSearchModel {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  q: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString({each: true})
  _ids: Array<string>;
}
