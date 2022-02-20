import {
  IsOptional,
  IsMongoId,
  IsString,
  IsNumber,
  Min,
  IsInt
} from 'class-validator';

export class QuotationDetailModel {
  @IsMongoId()
  product: string;

  @IsMongoId()
  productSKU: string;

  @Min(1)
  @IsInt()
  qty: number;

  @Min(0)
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  remark?: string;
}
