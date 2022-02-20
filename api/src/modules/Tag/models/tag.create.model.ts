import {IsString, IsMongoId, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class TagCreateModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'hash tag text'})
  text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'related collection'})
  refType: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({description: 'related doc _id'})
  ref: string;

  @IsMongoId()
  workspace: string;
}
