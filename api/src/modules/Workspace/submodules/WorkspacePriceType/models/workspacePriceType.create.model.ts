import {IsMongoId, IsEnum} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

export class WorkspacePriceTypeCreateModel {
  @ApiProperty({required: true})
  @IsMongoId()
  workspace: string;

  @IsEnum(common.type.PriceType)
  @ApiProperty({required: true})
  priceType?: string;
}
