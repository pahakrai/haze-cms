import {
  IsOptional,
  ValidateIf,
  IsNumber,
  IsMongoId,
  IsString
} from 'class-validator';
export class PushNotificationsSearchModel {
  @IsMongoId({each: true})
  @IsOptional()
  _ids?: string[];

  @IsOptional()
  @ValidateIf(obj => !obj._ids || obj._ids.length === 0)
  @IsMongoId({each: true})
  userIds?: string[];

  @IsOptional()
  @IsString({each: true})
  deviceIds?: string[];

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;

  createdAt?: string;

  screen?: string;
}
