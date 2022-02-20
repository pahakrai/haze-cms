import {
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  IsMongoId
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CustomerEnquiryCreateModel {
  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  subject?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  phoneRegion?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  message?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  email?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({required: false})
  isFollow?: boolean;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({required: false})
  whoFollow?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsDate()
  followTime: Date;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  remarks: string;
}
