import {IsString, IsEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UserSearchHistoryCreateModel {
  @IsString()
  @ApiProperty({description: 'user workspace'})
  text: string;

  @IsEmpty()
  @ApiProperty({description: 'workspace, do not pass from frontend'})
  workspace?: string;

  @IsEmpty()
  @ApiProperty({description: 'user, do not pass from frontend'})
  user?: string;
}
