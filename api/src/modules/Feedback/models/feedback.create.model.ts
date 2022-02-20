import {
  Min,
  IsIn,
  IsEmpty,
  IsNumber,
  IsString,
  IsMongoId,
  IsOptional
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class FeedbackCreateModel {
  @IsMongoId()
  @ApiProperty({description: 'feedback from, DO NOT PASS FROM FRONTEND'})
  from?: string;

  @IsMongoId()
  @ApiProperty({description: 'feedback to'})
  to: string;

  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace?: string;

  @IsString()
  @IsIn(['Orders', 'Products'])
  @ApiProperty({description: 'used for populate ref document'})
  refType: string;

  @IsMongoId()
  @ApiProperty({description: 'ref document'})
  ref: string;

  @Min(0)
  @IsNumber()
  @ApiProperty({description: 'feedback rating'})
  rating: number;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false, description: 'feedback comment'})
  comment?: string;
}
