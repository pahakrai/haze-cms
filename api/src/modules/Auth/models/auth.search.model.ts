import {IsString, IsOptional} from 'class-validator';
import {BaseSearchModel} from 'src/core/models';

export class AuthSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  user?: string;
}
