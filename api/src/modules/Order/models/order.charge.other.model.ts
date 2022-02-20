import {IsString, IsNumber, IsOptional} from 'class-validator';
export class OrderChargeOtherModel {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
