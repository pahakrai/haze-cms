import {IsString, IsOptional, IsMongoId} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ParamCreateModel {
  @IsString()
  @ApiProperty({description: 'param type (code)'})
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'param description'})
  description?: string;

  @ApiProperty({description: 'content'})
  parameters: any;

  @IsOptional()
  @IsMongoId()
  workspace?: string;
}
