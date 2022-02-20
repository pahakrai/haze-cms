import {IsString, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PostCommentCreateModel {
  @ApiProperty({description: 'DO NOT PASS FROM FRONTEND'})
  workspace: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  post: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  user?: string;

  @ApiProperty()
  @IsString({each: true})
  @IsOptional()
  likes: Array<string>;
}
