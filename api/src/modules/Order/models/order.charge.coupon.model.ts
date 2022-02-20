import {IsString, IsNumber, IsOptional} from 'class-validator';
export class OrderChargeCouponModel {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
