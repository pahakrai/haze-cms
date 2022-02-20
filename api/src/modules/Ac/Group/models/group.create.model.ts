import {IsString, IsEmpty} from 'class-validator';

export class GroupCreateModel {
  @IsString()
  name: string;

  @IsEmpty()
  workspace?: string;

  @IsString({each: true})
  users: string[];

  @IsString({each: true})
  policies: string[];
}
