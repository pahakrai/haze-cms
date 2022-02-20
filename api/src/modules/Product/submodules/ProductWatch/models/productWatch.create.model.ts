import {IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ProductWatchCreateModel {
  @IsMongoId()
  @ApiProperty({description: 'user who watch a product'})
  client: string;

  @IsMongoId()
  @ApiProperty({description: 'product which being watched by client'})
  product: string;
}
