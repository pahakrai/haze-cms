import {IsDate, IsEmpty, IsInt, IsNumber, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class OrderTimeCreateModel {
  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  order?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({description: 'expiry of this order'})
  pendingRequestExpireAt?: Date;

  @IsInt()
  @IsOptional()
  @ApiProperty({description: 'expiry of this order(in ms)'})
  pendingRequestExpireIn?: number;

  @IsDate()
  @IsOptional()
  @ApiProperty({description: 'schedule time of this order'})
  scheduleTime?: Date;

  @IsInt()
  @IsOptional()
  @ApiProperty({description: 'schedule time - current time'})
  timeScheduledAhead?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({description: 'order duration'})
  duration?: number;
}
