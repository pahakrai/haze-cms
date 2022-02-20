import {IsMongoId, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductReviewUpdateModel {
  @IsMongoId()
  @ApiProperty({description: 'user who review a product'})
  client?: string;

  @IsMongoId()
  @ApiProperty({description: 'order of product'})
  order?: string;

  @IsMongoId()
  @ApiProperty({description: 'product which being reviewed by client'})
  product?: string;

  @IsNumber()
  rating?: number;

  @IsString()
  comment?: string;
}
