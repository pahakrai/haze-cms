import {IsString, IsNumber, IsOptional} from 'class-validator';
export class OrderChargeServiceModel {
  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsNumber()
  isQuotation?: boolean;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
