import {IsString, IsOptional, IsEmpty, IsNumber, Min} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class OrderWageCreateModel {
  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  order?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'wage currency'})
  currency?: string;

  @Min(0)
  @IsNumber()
  @ApiProperty({description: 'amount that paid to app provider'})
  amountToApp: number;
}
