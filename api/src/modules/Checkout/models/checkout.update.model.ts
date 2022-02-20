import {IsOptional, IsNumber, IsDate} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class CheckoutUpdateModel {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({description: 'checkout status'})
  status?: number;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'expiry of this checkout, failed after expire'
  })
  expireAt?: Date;
}
