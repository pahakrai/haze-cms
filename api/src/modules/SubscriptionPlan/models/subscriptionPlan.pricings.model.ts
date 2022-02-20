import {IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SubscriptionPlanPricingModel {
  @IsString()
  @ApiProperty({required: true})
  apiId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({required: false})
  currency?: string;

  @IsString()
  @ApiProperty({required: true})
  amount: string;

  @IsOptional()
  @IsString()
  @ApiProperty({required: false})
  unit?: string;
}
