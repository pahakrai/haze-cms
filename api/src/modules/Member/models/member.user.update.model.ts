import {ApiProperty} from '@nestjs/swagger';
import {MemberUpdateModel} from './member.update.model';
import {UserUpdateModel} from 'src/modules/User';

export class MemberUserUpdateModel {
  @ApiProperty({required: true})
  user: UserUpdateModel;

  @ApiProperty({required: true})
  member: MemberUpdateModel;
}
