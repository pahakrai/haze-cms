import {UserCreateModel} from 'src/modules/User';

export class AuthUserLoginChannelCreateModel {
  id: string;
  type: string;
}

export class AuthUserCreateModel extends UserCreateModel {
  // ApiProperty()
  password: string;

  loginChannels?: AuthUserLoginChannelCreateModel[];
}
