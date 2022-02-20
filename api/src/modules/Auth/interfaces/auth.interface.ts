import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {IUser} from 'src/modules/User';

interface AuthRefreshToken {
  /**
   * [optional] device id that using this refresh token
   */
  device: string;

  /**
   * signature (3rd part of JWT) of an refresh token
   */
  token: string;

  /**
   * expiry of the token
   */
  expiresAt: Date;
  expiresIn: number;
}

interface AuthLoginChannel {
  type: string;
  id: string;
}

export interface Auth extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  user: IUser['_id'] | IUser;
  password: string;
  // FOR MULTIPLE
  // passcodes: [{
  //   code: string;
  //   expiresAt: Date;
  //   expiresIn: number;
  // }];
  passcode: {
    code: string;
    scope: string;
    expiresAt: Date;
    expiresIn: number;
  };
  refreshTokens: AuthRefreshToken[];
  loginChannels: AuthLoginChannel[];
}

export type AuthModel = PaginateModel<Auth>;
