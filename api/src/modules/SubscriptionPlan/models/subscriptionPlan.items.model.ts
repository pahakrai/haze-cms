import {IsOptional, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SubscriptionPlanItemModel {
  @IsMongoId()
  @ApiProperty({required: true})
  item: string;

  @IsOptional()
  @ApiProperty({required: false})
  value?: JSON;
}
