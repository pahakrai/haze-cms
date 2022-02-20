import {IsMongoId, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CheckoutCreateModel {
  @IsMongoId()
  @ApiProperty({description: 'order id'})
  order: string;

  @IsMongoId()
  @ApiProperty({description: 'payment id'})
  payment: string;

  @IsDate()
  @ApiProperty({description: 'expiry of this checkout, failed after expire'})
  expireAt: Date;
}
