import {ValidateNested, IsString, IsBoolean, IsOptional} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {ApiProperty} from '@nestjs/swagger';
import {SubscriptionPlanItemModel, SubscriptionPlanPricingModel} from './index';
import {Type} from 'class-transformer';

export class SubscriptionPlanCreateModel {
  @IsString()
  @ApiProperty({required: true})
  productId: string;

  @IsString()
  @ApiProperty({required: true})
  code: string;

  @ValidateNested()
  @ApiProperty({description: 'name'})
  name: LocalizeStringModel;

  @ValidateNested()
  @ApiProperty({description: 'description'})
  description: LocalizeStringModel;

  @IsOptional()
  @IsString()
  @ApiProperty({required: false})
  unit: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionPlanPricingModel)
  pricings?: SubscriptionPlanPricingModel[];

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => SubscriptionPlanItemModel)
  items: SubscriptionPlanItemModel[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'is subscriptionPlan active'})
  isActive?: boolean;
}
