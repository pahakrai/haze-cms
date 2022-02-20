import {IsString, IsOptional} from 'class-validator';

export class GroupUpdateModel {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString({each: true})
  users?: string[];

  @IsOptional()
  @IsString({each: true})
  policies?: string[];
}
