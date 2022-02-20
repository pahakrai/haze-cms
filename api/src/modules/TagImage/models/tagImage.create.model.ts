import {IsString, IsEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
export class TagImageCreateModel {
  @IsString()
  text: string;

  @IsOptional()
  image?: string;

  @IsEmpty()
  @ApiProperty({description: 'DO NOT PASS THIS FROM FRONTEND'})
  workspace: string;
}
