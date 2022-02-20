import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  Matches,
  ValidateNested,
  IsMongoId
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {classToPlain, Type} from 'class-transformer';
import {MetaModel} from './page.meta.model';
import {LocalizeStringModel} from 'src/core';
import {PageDiffNodeModel} from './page.diff.node.model';

export class PageCreateModel {
  @ApiProperty()
  @ValidateNested()
  title: LocalizeStringModel;

  @IsString({
    message: () => {
      const msg = JSON.stringify(
        classToPlain({code: 'key_enter_path', payload: {}})
      ); // first plain class/object then to json string
      return msg;
    }
  })
  @Matches(/^\/.*$/, {
    message: () => {
      return JSON.stringify(classToPlain({code: 'err_incorrect_page_path'}));
    }
  })
  @IsOptional()
  path?: string;

  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsString()
  @IsOptional()
  layout: string;

  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  id_name: string;

  @IsString({
    message: () => {
      const msg = JSON.stringify(
        classToPlain({code: 'data__required', payload: {key: 'key_remarks'}})
      );
      return msg;
    }
  })
  @IsOptional()
  remarks: string;

  @IsNumber()
  @IsOptional()
  version: number;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => PageDiffNodeModel)
  diffNodes: PageDiffNodeModel[];

  @ApiProperty()
  content: any;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

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
  isTemplate: boolean;

  @ApiProperty({required: true})
  @IsBoolean()
  isSection: boolean;

  @IsOptional()
  @ValidateNested()
  meta?: MetaModel;

  @IsOptional()
  @IsBoolean()
  isSeo?: boolean;
}
