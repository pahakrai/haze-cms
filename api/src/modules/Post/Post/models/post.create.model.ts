import {IsString, IsBoolean, IsOptional, ValidateNested} from 'class-validator';
import {classToPlain} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

// FIXME: this is not in core at the moment
// import {
//   IsWorkspaceRequired
// } from '../../../core/nest/Class-validator/workspace.validator';

import {LocalizeStringModel} from 'src/core';

export class PostCreateModel {
  @ApiProperty()
  // @Validate(IsWorkspaceRequired, {
  //   message: () => {
  //     const msg = JSON.stringify(classToPlain({
  //       code: 'data__required',
  //       payload: {key: 'key_workspace'}
  //     }));
  //     return msg;
  //   }
  // })
  workspace: string;

  @ApiProperty({required: true, description: 'Title of post'})
  @ValidateNested()
  @IsOptional()
  title: LocalizeStringModel;

  @ApiProperty({required: true, description: 'Post Type, blog or ad'})
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({required: true, description: 'Post Date'})
  @IsString({
    message: () => {
      return JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {
            key: 'key_post_date'
          }
        })
      );
    }
  })
  postDate: string;

  @ApiProperty({required: true, description: 'Snippets'})
  @IsOptional()
  snippets: LocalizeStringModel;

  @ApiProperty({description: 'Images', required: false})
  @IsOptional()
  images: Array<any>;

  @ApiProperty({required: true, description: 'Content of post'})
  content: LocalizeStringModel;

  @ApiProperty({required: true, description: 'priority of post'})
  @IsOptional()
  priority: number;

  @ApiProperty({required: true, description: 'Deals of post'})
  @IsOptional()
  queries: Array<{
    query: string;
    queryType: string;
    title: string;
  }>;

  @IsOptional()
  tags: Array<any>;

  @IsOptional()
  industries: Array<string>;

  @IsOptional()
  subjects: Array<string>;

  @IsOptional()
  regions: Array<string>;

  @ApiProperty({required: false, description: 'default is false'})
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  workspaceId?: string;

  @IsOptional()
  @IsString({each: true})
  platformTypes?: Array<string>;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
