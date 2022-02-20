import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  Matches,
  ValidateNested
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {classToPlain, Type} from 'class-transformer';

import {LocalizeStringModel} from 'src/core';
import {PageDiffNodeModel} from './page.diff.node.model';

export class PageUpdateModel {
  @ApiProperty()
  @ValidateNested()
  title?: LocalizeStringModel;

  @IsOptional()
  @Matches(/^\/.*$/, {
    message: () => {
      return JSON.stringify(classToPlain({code: 'err_incorrect_page_path'}));
    }
  })
  path?: string;

  @IsString({
    message: () => {
      const msg = JSON.stringify(
        classToPlain({
          code: 'data__required',
          payload: {key: 'key_remarks'}
        })
      );
      return msg;
    }
  })
  @IsOptional()
  remarks?: string;

  @ApiProperty()
  content?: any;

  @IsNumber()
  @IsOptional()
  version?: number;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => PageDiffNodeModel)
  diffNodes?: PageDiffNodeModel[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsString({
    message: () => {
      const msg = JSON.stringify(
        classToPlain({code: 'data__required', payload: {key: 'key_remarks'}})
      );
      return msg;
    }
  })
  preview?: string;

  @IsOptional()
  @IsBoolean()
  isTemplate?: boolean;

  @IsOptional()
  @IsBoolean()
  isSection?: boolean;

  @IsOptional()
  meta?: {
    description: string;
    keywords: string;
    version: number;
  };

  @IsOptional()
  workspace?: string;

  @IsOptional()
  layout?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  @IsBoolean()
  isSeo?: boolean;
}
