import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class ParamIdModel {
  @IsString()
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'target document _id'
  })
  _id: string;
}
