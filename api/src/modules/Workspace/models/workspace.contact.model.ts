import {IsString, IsOptional} from 'class-validator';
// import {ApiProperty} from '@nestjs/swagger';

export class WorkspaceContactModel {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  phoneNo?: string;

  @IsString()
  @IsOptional()
  ext?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
