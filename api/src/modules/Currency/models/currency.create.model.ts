import {IsString, IsBoolean, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CurrencyCreateModel {
  @IsString()
  @ApiProperty({description: 'currency code'})
  code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'currency symbol, auto gen based on code if not provided'
  })
  symbol?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'is the currency active for user'
  })
  isActive?: boolean;
}
