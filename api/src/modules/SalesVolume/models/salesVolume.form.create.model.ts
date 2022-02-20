import {IsString, IsDate, IsPositive, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SalesVolumeFormCreateModel {
  @IsDate()
  time: Date;

  @IsString()
  @ApiProperty({required: true})
  currency: string;

  @IsPositive()
  @IsNumber({allowInfinity: false, allowNaN: false})
  amount: number;
}
