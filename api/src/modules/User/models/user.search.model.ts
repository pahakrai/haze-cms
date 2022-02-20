import {IsOptional, IsBoolean, IsInt, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {BaseSearchModel} from 'src/core/models';

export class UserSearchModel extends BaseSearchModel {
  // @ApiPropertyOptional()
  verifyInput?: string;

  userTypes?: string[];

  email?: string;

  username?: string;

  phone?: string;

  name?: string;

  not_ids?: string[];

  @IsOptional()
  @IsInt({each: true})
  @Type(() => Number)
  statuses?: number[];

  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  isHandleBy?: boolean;

  @IsOptional()
  @IsString({each: true})
  phones?: string[];
}
