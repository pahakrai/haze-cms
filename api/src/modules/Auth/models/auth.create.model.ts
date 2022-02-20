// import {
//   IsString,
//   IsBoolean,
//   IsNotEmpty,
//   IsOptional,
//   ValidateNested
// } from 'class-validator';
// import {ApiProperty} from '@nestjs/swagger';

export class AuthSecurityPassCreateModel {
  code: string;
  expireAt: Date;
  expiresIn: number;
}

export class AuthRefreshTokenCreateModel {
  code: string;
  expireAt: Date;
  expiresIn: number;
}

export class AuthLoginChannelCreateModel {
  type: string;

  id?: string;
}

export class AuthCreateModel {
  user: string;

  // ApiProperty()
  password: string;

  securityPasses?: AuthSecurityPassCreateModel[];

  refreshTokens?: AuthRefreshTokenCreateModel[];

  loginChannels?: AuthLoginChannelCreateModel[];
}
