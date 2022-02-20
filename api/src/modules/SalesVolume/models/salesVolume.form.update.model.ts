import {IsDate, IsNumber, IsString, IsPositive} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SalesVolumeFormUpdateModel {
  @IsDate()
  time: Date;

  @IsString()
  @ApiProperty({required: true})
  currency: string;

  @IsPositive()
  @IsNumber({allowInfinity: false, allowNaN: false})
  amount: number;
}
