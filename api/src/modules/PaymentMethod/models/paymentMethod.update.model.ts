import {IsString, IsOptional, IsBoolean, ValidateNested} from 'class-validator';
import {LocalizeStringModel} from 'src/core';

export class PaymentMethodUpdateModel {
  @IsOptional()
  @IsString()
  code?: string;

  @ValidateNested()
  @IsOptional()
  name?: LocalizeStringModel;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
