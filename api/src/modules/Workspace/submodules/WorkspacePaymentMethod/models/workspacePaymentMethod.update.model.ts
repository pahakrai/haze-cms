import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsBoolean,
  ValidateNested,
  IsNumber,
  IsString
} from 'class-validator';

import common from '@golpasal/common';
import {PaymentMethodUpdateModel} from 'src/modules/PaymentMethod/models';
const {PlatformType} = common.type;

export class WorkspacePaymentMethodUpdateModel {
  @IsMongoId()
  @IsNotEmpty()
  paymentMethod: string;

  @ValidateNested()
  @IsOptional()
  paymentMethodModel?: PaymentMethodUpdateModel;

  @IsOptional()
  url?: string;

  @IsOptional()
  @IsEnum(PlatformType, {each: true})
  platforms?: Array<string>;

  @IsOptional()
  credential?: any;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  defaultCurrency?: string;

  @IsNumber()
  @IsOptional()
  chargeValue?: number;

  @IsOptional()
  @IsString()
  chargeSymbol?: string;

  @IsNumber()
  @IsOptional()
  adminCharge?: number;
}
