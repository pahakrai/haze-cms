import {
  IsMongoId,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class CustomerEnquiryUpdateModel {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  subject?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  phoneRegion?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  message?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  email?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({required: false})
  isFollow?: boolean;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({required: false})
  whoFollow?: string;

  @ApiPropertyOptional({required: false})
  @IsDate()
  @IsOptional()
  followTime?: Date;
}
