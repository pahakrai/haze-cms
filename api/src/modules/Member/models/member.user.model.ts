import {ApiProperty} from '@nestjs/swagger';
import {MemberCreateModel} from './member.create.model';
import {AuthUserCreateModel} from 'src/modules/Auth/models';
import {IsOptional} from 'class-validator';

export class MemberUserModel {
  @ApiProperty({required: true})
  user: AuthUserCreateModel;

  @ApiProperty({required: true})
  member: MemberCreateModel;

  @ApiProperty({
    required: false,
    description: 'boolean to control send the email directly on signup'
  })
  @IsOptional()
  sendPasscode?: boolean;
}
