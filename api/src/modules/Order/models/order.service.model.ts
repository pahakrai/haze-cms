import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class OrderServiceModel {
  @IsMongoId()
  @IsNotEmpty()
  service: string;

  value: any;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsNumber()
  @IsOptional()
  quotedPrice?: number;
}
