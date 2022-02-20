import {ValidateNested, IsString, IsBoolean, IsOptional} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {SubscriptionPlanItemModel, SubscriptionPlanPricingModel} from './index';
import {Type} from 'class-transformer';

export class SubscriptionPlanUpdateModel {
  @IsString()
  @IsBoolean()
  productId?: string;

  @IsString()
  @IsBoolean()
  code?: string;

  @ValidateNested()
  @IsBoolean()
  name?: LocalizeStringModel;

  @ValidateNested()
  @IsBoolean()
  description?: LocalizeStringModel;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionPlanPricingModel)
  pricings?: SubscriptionPlanPricingModel[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionPlanItemModel)
  items?: SubscriptionPlanItemModel[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
