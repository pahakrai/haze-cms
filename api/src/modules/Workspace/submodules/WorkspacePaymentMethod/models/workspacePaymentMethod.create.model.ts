import {
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsUrl,
  IsBoolean,
  ValidateNested,
  IsEnum,
  IsString,
  IsNumber
} from 'class-validator';
import common from '@golpasal/common';
import {PaymentMethodCreateModel} from 'src/modules/PaymentMethod/models';
const {PlatformType} = common.type;

export class WorkspacePaymentMethodCreateModel {
  @IsMongoId()
  @IsNotEmpty()
  workspace: string;

  @IsMongoId()
  @IsOptional()
  paymentMethod?: string;

  @ValidateNested()
  @IsOptional()
  paymentMethodModel?: PaymentMethodCreateModel;

  @IsOptional()
  @IsUrl()
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
