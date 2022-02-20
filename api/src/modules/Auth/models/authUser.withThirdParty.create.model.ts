import {IsString, IsOptional} from 'class-validator';
import {AuthUserCreateModel} from './authUser.create.model';

export class AuthUserWithThirdPartyCreateModel extends AuthUserCreateModel {
  @IsOptional()
  @IsString()
  channelId?: string;
}
