import {
  IsNumber,
  IsBoolean,
  IsOptional,
  IsMongoId,
  ValidateNested,
  IsString
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';

class CouponRedeemProductModel {
  @IsMongoId()
  product: string;

  @IsMongoId()
  @IsOptional()
  productSKU?: string;

  @IsNumber()
  amount: number;
}

export class CouponRedeemModel {
  @IsNumber()
  @ApiProperty({description: 'total amount'})
  productTotAmount: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({required: false, description: 'whether called when checkout'})
  isCheckout?: boolean;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => CouponRedeemProductModel)
  @ApiProperty({description: 'selected products'})
  products?: CouponRedeemProductModel[];

  @IsString()
  @IsOptional()
  paymentMethod?: string;
}
