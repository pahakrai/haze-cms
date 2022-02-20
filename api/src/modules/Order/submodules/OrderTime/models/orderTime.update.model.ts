import {IsDate, IsInt, IsNumber, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class OrderTimeUpdateModel {
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'expiry of this order'})
  pendingRequestExpireAt?: Date;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({description: 'expiry of this order(in ms)'})
  pendingRequestExpireIn?: number;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({description: 'schedule time of this order'})
  scheduleTime?: Date;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({description: 'schedule time - current time'})
  timeScheduledAhead?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({description: 'order duration'})
  duration?: number;
}
