import {IsString, IsOptional, IsDate} from 'class-validator';

export class FollowerSearchModel {
  @IsString()
  @IsOptional()
  follower?: string;

  @IsString()
  @IsOptional()
  followee?: string;

  @IsDate()
  @IsOptional()
  unfollowAt?: Date;
}
