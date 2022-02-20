import {IsString, IsOptional} from 'class-validator';

export class FollowerUpdateModel {
  @IsString()
  @IsOptional()
  followee?: string;

  @IsString()
  @IsOptional()
  follower?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;
}
