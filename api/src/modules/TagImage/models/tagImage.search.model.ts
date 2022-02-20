import {IsOptional, IsString} from 'class-validator';
import {BaseSearchModel} from 'src/core/models';

export class TagImageSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  text?: string;
}
