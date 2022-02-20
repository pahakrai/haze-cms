import {
  Matches,
  IsNumber,
  IsString,
  IsMongoId,
  IsPositive
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SalesVolumeCreateModel {
  @Matches(new RegExp(/^\d{4}\-(0?[1-9]|1[012])/))
  time: string;

  @IsString()
  @ApiProperty({required: true})
  currency: string;

  @IsPositive()
  @IsNumber({allowInfinity: false, allowNaN: false})
  amount: number;

  @IsMongoId()
  @ApiProperty({description: 'DO NOT PASS THIS FROM FRONTEND'})
  workspace: string;
}
