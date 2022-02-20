import {IsString} from 'class-validator';

export class FollowerCreateModel {
  @IsString()
  followee: string;

  @IsString()
  follower: string;
}
