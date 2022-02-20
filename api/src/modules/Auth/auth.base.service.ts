import {Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
// import moment from 'moment';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import {ClientSession} from 'mongoose';
import crypto from '@golpasal/crypto';
import common from '@golpasal/common';

import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  PATTERN_SANITIZE_LOGIN_INPUT,
  prepHost,
  parseSignedRequest,
  prepareUrl
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';
import * as JWTHelper from './jwt.helper';

// interfaces & models
import {
  IPasscode,
  IDecryptedAccessToken,
  IDecryptedPasscodeToken,
  IPasscodeToken
} from './interfaces';
import {
  AuthUserCreateModel,
  AuthCreateModel,
  AuthUpdateModel,
  AuthSearchModel,
  SignUpOptionsModel
} from './models';
import {AuthModel, Auth, IUserToken} from './interfaces';
import {
  AuthConfigContactMethodDetail,
  AuthConfigContactMethodDetailWithConfig
} from './submodules/AuthConfig/interfaces';
import {UserCreateModel} from 'src/modules/User';

import {CacheService} from '../Cache/cache.service';
import {IUser, UserService, UserUpdateModel} from '../User';
import {WorkspaceService} from '../Workspace/workspace.service';
import {NotificationService} from '../Notification/notification.service';
import {AuthConfigService} from './submodules/AuthConfig/authConfig.service';
import {ObjectId} from 'mongodb';

const {UserStatus} = common.status;
const {AuthMethod} = common.method;
const {NotificationMediaType} = common.type;

const AuthContactMethodType = {
  EMAIL: 'email',
  SMS: 'sms'
};

const AuthContactMethodKeyType = {
  FORGOT_PASSWORD: 'forgotPassword',
  INVITE: 'invite',
  SIGN_UP: 'signUp'
};

const {decrypt, hashPlainText, comparePassword, generateSecurityPass, encrypt} =
  crypto;

export class AuthBaseService extends BaseCRUDService<
  Auth,
  AuthCreateModel,
  AuthUpdateModel,
  AuthSearchModel
> {
  constructor(
    @InjectModel('Auths') protected readonly authRepository: AuthModel,
    @Inject(REQUEST) request,
    protected readonly userService: UserService,
    protected readonly authConfigService: AuthConfigService,
    protected readonly cacheService: CacheService,
    protected readonly notificationService: NotificationService,
    protected readonly workspaceService: WorkspaceService
  ) {
    super(authRepository, request);
  }

  public _castQuery(searchModel: AuthSearchModel) {
    const queryAnd = [];
    const {user} = searchModel;

    if (user) {
      queryAnd.push({user});
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  protected async _addPasscodeToUser(
    user: IUser | string,
    passcode: IPasscode,
    options?: {
      session?: ClientSession;
    }
  ): Promise<Auth> {
    const userId = typeof user === 'string' ? user : user._id.toHexString();
    const auth = await this.authRepository
      .findOne({user: userId})
      .session(options?.session);
    return super.update(auth._id, {
      passcode
      // FOR MULTIPLE
      // passcodes: auth.passcodes.filter(o =>
      //   o.expiresAt > new Date()
      // ).concat([passcode])
    });
  }

  /**
   * create jwt token
   * @param type
   * @param _id
   */
  protected async _createJwtToken(
    userTypes: string[],
    userId: string,
    deviceId?: string,
    options?: {
      // auth data, no need to fetch again if exist
      auth?: Auth;
      // access expiry: time until expires in ms
      accessExpiresIn?: number;
      // refresh expiry: time until expires in ms
      refreshExpiresIn?: number;
      session?: ClientSession;
    }
  ): Promise<IUserToken> {
    const opts = {
      // default: 15 minute
      accessExpiresIn: parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRE_IN, 10),
      // default: 30 days
      refreshExpiresIn: parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRE_IN, 10),
      ...options
    };
    const userKey = uuidv4();
    const issuedAt = Date.now();
    const workspace = await this.workspaceService.findById(
      this.getHeaderWorkspace(),
      {lean: true}
    );

    // generate refresh token
    const refreshExpiresAt = issuedAt + opts.refreshExpiresIn;
    const refreshToken = JWTHelper.generate(
      userId,
      userTypes,
      deviceId,
      userKey,
      issuedAt,
      refreshExpiresAt,
      {type: 'refresh'}
    );
    // get the signature of JWT
    const refreshTokenSignature = refreshToken.substring(
      refreshToken.lastIndexOf('.') + 1
    );

    const accessExpiresAt = issuedAt + opts.accessExpiresIn;
    const accessToken = JWTHelper.generate(
      userId,
      userTypes,
      deviceId,
      userKey,
      issuedAt,
      accessExpiresAt,
      {
        type: 'access',
        // add signature of refresh token into access token
        refresh: refreshTokenSignature
      }
    );
    // get auth by user
    const auth = opts.auth
      ? opts.auth
      : await this.findByUser(userId, {
          session: opts?.session || this.getMongoSession()
        });
    // if auth not exists, throw error
    if (!auth) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_user'
        }
      });
    }
    // store refresh token into auth object
    const now = new Date();
    const refreshTokens = [...auth.refreshTokens].filter(
      r => r.expiresAt > now
    );

    const authorizedDeviceLimit =
      workspace.preferences?.auth?.authorizedDeviceLimit[userTypes[0]] ?? 0;
    if (
      authorizedDeviceLimit > 0 &&
      refreshTokens.length > authorizedDeviceLimit - 1
    ) {
      // no. of refresh token exceeded/will exceed the limit
      // shift out old token
      do {
        refreshTokens.shift();
      } while (refreshTokens.length > authorizedDeviceLimit - 1);
    }

    // append new refresh token
    refreshTokens.push({
      device: deviceId,
      token: refreshTokenSignature,
      expiresIn: opts.refreshExpiresIn,
      expiresAt: new Date(refreshExpiresAt)
    });

    // update auth
    await super.update(auth._id, {
      refreshTokens
    });

    if (process.env.JTI_ENABLE === 'true') {
      const key = JWTHelper.getSessionKey(userId, deviceId, issuedAt, userKey);
      this.cacheService.set(key, userKey, accessExpiresAt);
    }

    return {
      // TODO: can handle scope as well
      scope: '',
      userId,
      token_type: 'Bearer',
      // absolute timestamp in seconds
      expires_in: opts.accessExpiresIn / 1000,
      // delta timestamp in seconds
      expires_on: Math.round(accessExpiresAt / 1000),
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  protected async _decryptAccessToken(
    token: string
  ): Promise<IDecryptedAccessToken> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, success: any) => {
        if (success) {
          resolve({
            userId: success.sub,
            jwtId: success.jwtid,
            issuedAt: success.iat,
            expiresAt: success.exp,
            tokenType: success.type,
            userTypes: success.userTypes,
            deviceId: success.deviceId
          });
        } else {
          reject(err);
        }
      });
    });
  }

  protected _decryptPasscodeToken(
    passcodeToken: string
  ): IDecryptedPasscodeToken {
    // decrypt passcode from passcode token
    const decryptedPasscode = decrypt(passcodeToken, process.env.CRYPTO_KEY);
    // separate passcode into array split by _
    const decryptedPasscodePartsArr = decryptedPasscode.split('_');
    // if array does not have exactly two parts, it is already wrong,
    // so throw error
    if (decryptedPasscodePartsArr.length !== 3) {
      throw new Error('invalid passcode token');
    }
    // return decrypted
    return {
      user: decryptedPasscodePartsArr[0],
      passcode: decryptedPasscodePartsArr[1],
      verifyField: decryptedPasscodePartsArr[2]
    };
  }

  protected _getMatchingInputFieldKey(user: IUser, input: string): string {
    const inputRegex = new RegExp(
      `^${input.replace(PATTERN_SANITIZE_LOGIN_INPUT, '')}$`,
      'i'
    );
    for (const field of Object.keys(user.toObject ? user.toObject() : user)) {
      if (inputRegex.test(user[field])) {
        return field;
      }
    }
    return null;
  }

  protected _getPasscodeScope(auth: Auth, passcode?: string): string {
    return auth.passcode.scope;
  }

  protected async _isPasscodeUpdateVerify(
    authOrAuthConfigMethod: Auth | AuthConfigContactMethodDetail,
    options?: {
      user?: IUser;
    }
  ): Promise<boolean> {
    // if authOrAuthConfigMethod is a authConfigMethod,
    if (
      (authOrAuthConfigMethod as AuthConfigContactMethodDetail)
        .isUpdateUserVerifyOnPasscodeValidate
    ) {
      // just return the authConfigMethod's boolean field for this
      return (authOrAuthConfigMethod as AuthConfigContactMethodDetail)
        .isUpdateUserVerifyOnPasscodeValidate;
    }

    // get the user (for the userType) so we can find the authConfig method
    // based on user type
    const user =
      options?.user ||
      (await this.userService.findById(
        (authOrAuthConfigMethod as Auth).user.toString()
      ));
    // auth config method is fetched by usertype and passcode scope
    const authConfigMethod = await this.authConfigService.getContactMethod(
      user.userTypes?.[0],
      user.currentWorkspace.toHexString(),
      (authOrAuthConfigMethod as Auth).passcode.scope
    );
    // return the value of isUpdateUserVerifyOnPasscodeValidate from
    // the auth config method
    return authConfigMethod.get('isUpdateUserVerifyOnPasscodeValidate');
  }

  protected _isPasscodeValid(
    auth: Auth,
    passcode: string,
    scope?: string
  ): boolean {
    // FOR MULTIPLE
    // return auth.passcodes.some(p =>
    //   p.code === passcode && p.expiresAt > new Date()
    // );
    return (
      auth.passcode?.code === passcode &&
      auth.passcode.expiresAt > new Date() &&
      (!scope || auth.passcode.scope === scope)
    );
  }

  protected _parseString(
    str: string,
    variables: {[key: string]: any} = {},
    options?: {regex?: string}
  ): string {
    const opts = {
      regex: /\$\{([\w]+)\}/,
      ...options
    };
    // go through each matched regex, replace it and return
    // final string
    return str.replace(new RegExp(opts.regex, 'g'), (match, p1) => {
      // if drilled down, ie `order.orderNo`, handle drill down
      // from original var object
      return p1.split('.').reduce((obj, p) => {
        return obj[p];
      }, variables);
    });
  }

  // TODO: suggesting method, not used yet
  public async _sendContactMethodNotification(
    userIds: string[],
    contactMethod: AuthConfigContactMethodDetailWithConfig,
    params: {[key: string]: any} = {}
  ) {
    const users = await this.userService.findByIds(userIds);
    if (users.length > 0) {
      this.notificationService.push({
        toUsers: users.map(u => ({user: u})),
        notificationMediaType: contactMethod.get('transportType'),
        title: contactMethod.get('emailTitle'),
        body: contactMethod.get('smsMessage'),
        data: {
          screen: '',
          parameters: {
            t_message: contactMethod.get('emailMessage')['default'],
            t_title: contactMethod.get('emailTitle'),
            ...params,
            ...contactMethod.get('transportParameters')
          }
        }
      });
    }
  }

  public async findByUser(
    userId: string,
    options?: {session?: ClientSession}
  ): Promise<Auth> {
    // find an auth by the user id
    return this.findOne(
      {user: userId},
      {
        lean: true,
        session: options?.session
      }
    );
  }

  public async findUserByAccessToken(token: string): Promise<IUser> {
    const tokenObject = await this._decryptAccessToken(token);
    return this.userService.findById(tokenObject.userId);
  }

  public async forgotPassword(
    input: string,
    options?: {
      // overriding transport type
      // ie. sms, email
      transportType?: string;
      // overriding interact type
      // ie. link, passcode
      interactType?: string;
    }
  ): Promise<void> {
    // define options
    const opts = {
      // set default values
      ...options
    };

    // send passcode based on fixed contact method
    // and optional transport type and interact type
    // to override
    return this.sendPasscode(
      // user's input to lookup user
      // ie. user's username, email, _id
      input,
      {
        // overriding transportType
        transportType: opts.transportType,
        // overriding interactType
        interactType: opts.interactType,
        // fixed contact method to forgot password
        contactMethod: AuthContactMethodKeyType.FORGOT_PASSWORD,
        // update db passcode
        updateDb: true
      }
    );
  }

  public async invalidateUserPasscode(user: IUser | string, passcode: string) {
    // get user id from param based on whether it is string or not
    const userId = typeof user === 'string' ? user : user._id.toHexString();
    // remove passcode from user
    return this.authRepository.updateOne(
      // find one auth that matches user id
      {
        user: userId
      },
      // remove passcode item with matching code
      {
        // FOR MULTIPLE
        // $pull: {
        //   passcodes: {
        //     code: passcode
        //   }
        // }
        $set: {
          passcode: null
        }
      },
      {
        // return new item
        new: true,
        // define session
        session: this.getMongoSession()
      }
    );
  }

  public async generateUserTokenByRefreshToken(
    accessToken: string,
    refreshToken: string
  ): Promise<IUserToken> {
    // get decoded parts from access token
    const payload = jwt.decode(accessToken);
    // extract userId from decoded object
    const {sub: userId} = payload;
    // get auth by refresh token
    const auth = await this.authRepository
      .findOne({
        user: userId as string,
        refreshTokens: {
          $elemMatch: {
            token: refreshToken.substring(refreshToken.lastIndexOf('.') + 1),
            expiresAt: {$gt: new Date()}
          }
        }
      })
      .populate('user');

    // if auth not found, throw error
    if (!auth) {
      throw new NotFoundException({code: 'err_login_not_user_pwd'});
    }
    const user = auth.user as IUser;
    // return this._createJwtToken(user.userTypes, user._id.toHexString());

    // generate new access token
    const newIssuedAt = Date.now();
    const newExpiresAt =
      newIssuedAt + parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRE_IN, 10);
    const newAccessToken = JWTHelper.generate(
      userId.toString(),
      payload['userTypes'],
      payload['deviceId'],
      // generate new userKey
      uuidv4(),
      newIssuedAt,
      newExpiresAt,
      {
        type: 'access',
        // get the verify signature of token
        refresh: refreshToken.substring(refreshToken.lastIndexOf('.') + 1)
      }
    );

    return {
      scope: '',
      userId: userId.toString(),
      expires_in: 900,
      expires_on: Math.round(newExpiresAt / 1000),
      access_token: newAccessToken,
      token_type: 'Bearer',
      refresh_token: refreshToken
    };
  }

  public async generatePasscode(
    user: IUser | string,
    options?: {
      contactMethod?: string;
      updateDb?: boolean;
      scope?: string;
      // expires in ms
      expiresIn?: number;
    }
  ): Promise<IPasscode> {
    const opts = {
      // some defaults defined here
      updateDb: true,
      scope: '',
      ...options
    };
    // get user by id and populate
    if (typeof user === 'string') {
      user = await this.userService.findById(user);
    }

    // if no user found, throw error
    if (!user) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_user'
        }
      });
    }
    // get contact method
    const configContactMethod = await this.authConfigService.getContactMethod(
      user?.userTypes?.[0],
      user?.currentWorkspace?.toHexString(),
      opts?.contactMethod
    );
    // define password length, defaulted to 6
    const passwordLength = configContactMethod.get('passcodeLength') || 6;
    // define expires in, defaulted to 5 mins
    const expiresIn =
      opts.expiresIn || configContactMethod.get('passcodeExpiresIn') || 300000;
    // generate passcode based on password length and expires in
    const passcode = generateSecurityPass(passwordLength, expiresIn);
    // transform into our Passcode
    const resultPasscode = {
      code: passcode.code,
      scope: opts.scope,
      expiresAt: passcode.expiredAt,
      expiresIn: expiresIn
    };
    // if update db as well, do it now
    if (opts.updateDb) {
      await this._addPasscodeToUser(user, resultPasscode, {
        session: this.getMongoSession()
      });
    }

    // return generated passcode
    return resultPasscode;
  }

  public async generatePasscodeToken(
    user: IUser | string,
    options?: {
      contactMethod?: string;
      updateDb?: boolean;
      scope?: string;
      // expires in ms
      expiresIn?: number;
    }
  ): Promise<IPasscodeToken> {
    const userId = typeof user === 'string' ? user : user._id.toHexString();
    const passcode = await this.generatePasscode(user, options);
    return this.generatePasscodeTokenByPasscode(userId, passcode);
  }

  public async generatePasscodeTokenByPasscode(
    user: IUser | string,
    passcode: IPasscode
  ): Promise<IPasscodeToken> {
    const userId = typeof user === 'string' ? user : user._id.toHexString();
    const tokenParts = [userId, passcode.code, passcode.scope];
    const token = encrypt(tokenParts.join('_'), process.env.CRYPTO_KEY);
    return {
      // TODO: check if this is correct
      token,
      scope: passcode.scope,
      expiresAt: passcode.expiresAt,
      expiresIn: passcode.expiresIn
    };
  }

  public async generateUserToken(
    input: IUser | string,
    password: string,
    userTypes?: string[],
    options?: {
      auth?: Auth;
      device?: string;
      updateDb?: boolean;
      accessExpiresIn?: number;
      refreshExpiresIn?: number;
      session?: ClientSession;
    }
  ): Promise<IUserToken> {
    const opts = {
      updateDb: true,
      ...options
    };

    let user: IUser;
    // get user by input
    if (typeof input === 'string') {
      user = await this.findOneUserFromMany(input, userTypes);
      // NOTE: DO NOT DELETE MIGHT REQUIRE TO REVERT AND FOR REFERENCE
      // user = await this.userService.findOne(
      //   {
      //     workspace,
      //     verifyInput: input,
      //     ...(userTypes?.length && {userTypes}),
      //     // NOTE: bypassWorkspace is a flag always it keep it at the end
      //     bypassWorkspace: true
      //   },
      //   {lean: true}
      // );
    } else {
      user = input;
    }
    // if user not found, throw error
    if (!user) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_user'
        }
      });
    }
    // if userTypes declared
    // ensure user has one of these userTypes
    if (
      userTypes?.length &&
      userTypes.every(ut => !user.userTypes.includes(ut))
    ) {
      // if user doesn't have any of the requested userTypes,
      // throw error
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_user'
        }
      });
    }
    // if password not match, throw error
    if (!(await this.isMatchPassword(options?.auth || user, password))) {
      throw new BadRequestException({code: 'err_login_not_user_pwd'});
    }
    // if user is locked, throw error
    if (user.status === UserStatus.LOCKED) {
      throw new ForbiddenException({code: 'err_user_status_locked'});
    }
    // create token based on user
    return this._createJwtToken(
      user.userTypes,
      user._id.toHexString(),
      opts.device,
      {
        auth: options?.auth,
        ...(opts.accessExpiresIn
          ? {accessExpiresIn: opts.accessExpiresIn}
          : {}),
        ...(opts.refreshExpiresIn
          ? {refreshExpiresIn: opts.refreshExpiresIn}
          : {})
      }
    );
  }

  public async isMatchPassword(
    userOrAuth: Auth | IUser | string,
    password: string
  ) {
    let auth: Auth;
    if (typeof userOrAuth === 'string') {
      auth = await this.findByUser(userOrAuth);
    } else if (
      (userOrAuth as IUser).email !== undefined ||
      (userOrAuth as IUser).phone !== undefined
    ) {
      // FIXME: temp version of checking whether object is a user object
      auth = await this.findByUser(userOrAuth._id.toHexString());
    } else if ((userOrAuth as Auth).password !== undefined) {
      // FIXME: temp version of checking whether object is a auth object
      auth = userOrAuth as Auth;
    }
    // if no user auth found
    if (!auth) {
      // return false right away
      return false;
    }
    // check password match
    return comparePassword(password.toString(), auth?.password?.toString());
  }

  public async resetPassword(
    passcodeToken: string,
    password: string,
    options?: {
      updateUserVerify?: boolean;
      updateUserStatus?: boolean;
      passcodeUseOnce?: boolean;
    }
  ): Promise<void> {
    const opts = {
      passcodeUseOnce: true,
      ...options
    };
    // decrypt passcode token to { user, passcode }
    const {user: userId, passcode} = this._decryptPasscodeToken(passcodeToken);
    // get passcode validity
    const isPasscodeValid = await this.validatePasscode(userId, passcode, {
      updateUserVerify: opts?.updateUserVerify,
      updateUserStatus: opts?.updateUserStatus,
      useOnce: opts?.passcodeUseOnce
    });
    // if passcode not valid, throw error
    if (!isPasscodeValid) {
      throw new Error('invalid passcode token');
    }
    // passcode valid, so update user password
    await this.updatePassword(userId, password);
    // done
  }

  public async sendPasscode(
    // ie. value for username, email, phone
    input: IUser | string,
    // optional options
    options?: {
      // ie. sms, email (priority: 1)
      transportType?: string;
      // ie. forgotPassword, signUp, updateField (priority: 2)
      contactMethod?: string;
      // ie. link, passcode
      interactType?: string;
      // updates auth.passcodes in db when true
      updateDb?: boolean;
      // the link format it should follow
      interactLinkUrl?: string;
      // the scope of the passcode
      scope?: string;
      // passode to updated contact/input
      sendToInput?: boolean;
    }
  ): Promise<void> {
    // define options
    const opts = {
      verifyField: '',
      // set default options
      ...options
    };

    // fetch user by input
    const user =
      typeof input === 'string' ? await this.findOneUserFromMany(input) : input;
    // if no user, throw error
    if (!user) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_user'
        }
      });
    }
    // get auth config for this user's userType
    // currently only support first one
    const contactMethod = await this.authConfigService.getContactMethod(
      user?.userTypes?.[0],
      user?.currentWorkspace?.toHexString(),
      opts?.contactMethod
    );

    // define interactType prioiritized on 1. fn param, 2. authConfig
    const _interactType =
      opts.interactType || contactMethod.get('interactType');
    // define transportType prioiritized on 1. fn param, 2. authConfig
    const _transportType =
      opts.transportType || contactMethod.get('transportType');

    // define passcode and passcodeToken fields
    let passcode: IPasscode;
    let passcodeToken: IPasscodeToken;
    let passcodeTokenUrl: string;
    // check whether this interact type requires passcode
    // or passcode token
    const isUsingPasscodeToken = AuthMethod.LINK === _interactType;
    // if interact Type is a link
    if (isUsingPasscodeToken) {
      // passcode token is required
      passcodeToken = await this.generatePasscodeToken(user, {
        scope: opts.scope || contactMethod.passcodeScope || _transportType,
        contactMethod: options?.contactMethod,
        expiresIn: contactMethod.passcodeExpiresIn
      });

      //base workspace webHost
      const workspace = await this.workspaceService.findById(
        user.currentWorkspace
      );
      // if no user, throw error
      if (!workspace) {
        throw new NotFoundException({
          code: 'data__not_exists',
          payload: {
            key: 'key_workspace'
          }
        });
      }
      // define link url for interactType = link
      const _interactLinkUrl = this._parseString(
        opts.interactLinkUrl || contactMethod.get('interactLinkUrl') || '',
        // parse string with environment variables
        // and auth config fields
        {...process.env, ...contactMethod}
      );
      // finalize passcodeToken url with the url
      // and the token put together
      passcodeTokenUrl = `${prepHost(user, workspace)}${_interactLinkUrl}${
        _interactLinkUrl.includes('?') ? '&' : '?'
      }token=${passcodeToken.token}&userType=${
        user?.userTypes?.[0]
      }&workspace=${user?.currentWorkspace}`;
    } else {
      // else, generate passcode
      passcode = await this.generatePasscode(user, {
        scope: opts.scope || contactMethod.passcodeScope || _transportType,
        contactMethod: options?.contactMethod,
        expiresIn: contactMethod.passcodeExpiresIn
      });
    }

    switch (_transportType) {
      case AuthContactMethodType.SMS: {
        const contactUser: any =
          opts?.sendToInput && typeof input === 'string'
            ? {...user, phone: input}
            : user;
        await this.notificationService.push({
          notificationMediaType: NotificationMediaType.SMS,
          toUsers: [
            {
              user: contactUser
            }
          ],
          body: contactMethod.get('smsMessage'),
          data: {
            screen: '',
            parameters: {
              ...contactMethod.get('transportParameters'),
              // based on token or code, it'll return specific
              // field
              ...(isUsingPasscodeToken
                ? {passcodeLink: passcodeTokenUrl}
                : {passcode: passcode.code})
            }
          }
        });
        break;
      }
      case AuthContactMethodType.EMAIL: {
        const contactUser: any =
          opts?.sendToInput && typeof input === 'string'
            ? {...user, email: input}
            : user;
        await this.notificationService.push({
          notificationMediaType: NotificationMediaType.EMAIL,
          toUsers: [{user: contactUser}],
          title: contactMethod.get('emailTitle'),
          data: {
            screen: contactMethod.get('emailTemplate') || 'email/passcode.ejs',
            parameters: {
              ...contactMethod.get('transportParameters'),
              t_title: contactMethod.get('emailTitle'),
              // email message would be determined by the verification interaction provided
              // from the mobile or web
              t_message:
                contactMethod.get('emailMessage')[
                  isUsingPasscodeToken ? 'link' : 'passcode'
                ] || contactMethod.get('emailMessage')['default'],
              // a general parameter for passcodeToken or passcode
              code: isUsingPasscodeToken ? passcodeTokenUrl : passcode.code,
              // based on token or code, it'll return specific
              // field
              ...(isUsingPasscodeToken
                ? {passcodeLink: passcodeTokenUrl}
                : {passcode: passcode.code})
            }
          }
        });
        break;
      }
    }
  }

  public async setUserFieldVerified(
    user: IUser | string,
    field: string,
    updateStatus = true,
    isVerified = true
  ): Promise<IUser> {
    let userObj: IUser;
    // if user string, get user by id
    if (typeof user === 'string') {
      userObj = await this.userService.findById(user);
    } else {
      userObj = user;
    }
    // if user not exist, throw error
    if (!userObj) {
      // TODO: throw proper error
      throw new Error('user not found');
    }
    // if the userObj verified is undefined
    if (!userObj?.verified) {
      // based on field string, update verified fields
      userObj.verified = {};
    }
    // define variable for user fields to update
    const userToUpdate: UserUpdateModel = {
      verified: userObj.verified
    };
    userObj.verified[field] = userToUpdate.verified[field] = isVerified;

    // get user's auth config
    const authConfig = await this.authConfigService.findOne({
      userTypes: userObj.userTypes
    });

    // update isVerified
    const isMeetVerifiedRequirements = authConfig.verifiedRequirements.every(
      vr => userObj.verified[vr]
    );

    let userIsVerifiedChanged = false;
    // if all requirements met, set isVerified to true
    if (isMeetVerifiedRequirements && !userObj.isVerified) {
      // set verify changed to true
      userIsVerifiedChanged = true;
      // set isVerified to true
      userObj.isVerified = userToUpdate.isVerified = true;
    }

    let userStatusActiveChanged = false;
    // if activateByAdmin = false, automatically update status
    // if needed
    if (!authConfig.activateByAdmin) {
      // if user status is unactivated, and user is verified,
      // update status to ACTIVE
      if (
        userObj.status === UserStatus.UNACTIVATED &&
        userObj.isVerified &&
        updateStatus
      ) {
        userToUpdate.status = UserStatus.ACTIVE;
        userStatusActiveChanged = true;
      }
    }
    // if user isVerified changed, and is now verified,
    // send notification to admin users
    if (userIsVerifiedChanged) {
      // TODO: can refactor, this is a big chunk of code
      // send notification isVerified true
      const contactMethod = await this.authConfigService.getContactMethod(
        // FIXME: default to first one?
        userObj.userTypes[0],
        userObj.currentWorkspace.toHexString(),
        'userIsVerifiedTrue'
      );
      switch (contactMethod.get('transportType')) {
        case 'email':
          await this.userService.sendAdminEmail(
            contactMethod.get('emailTemplate'),
            contactMethod.get('emailTitle'),
            // this.getLocale().tAll('user_joined'),
            {
              ...contactMethod.get('transportParameters'),
              t_message: contactMethod.get('emailMessage')['default'],
              client: user
            }
          );
          break;
        // TODO: support other methods?
      }
    }
    // if user status became active, then send a notification
    // to user
    if (userStatusActiveChanged) {
      // TODO: can refactor, this is a big chunk of code and
      //       is restricted to email to user
      const contactMethod = await this.authConfigService.getContactMethod(
        // FIXME: default to first one?
        userObj.userTypes[0],
        userObj.currentWorkspace.toHexString(),
        'userStatusActive'
      );

      switch (contactMethod.get('transportType')) {
        case AuthContactMethodType.SMS:
          this.notificationService.push({
            toUsers: [{user: userObj}],
            notificationMediaType: NotificationMediaType.SMS,
            body: contactMethod.get('smsMessage'),
            data: {
              screen: '',
              parameters: {
                ...contactMethod.get('transportParameters')
              }
            }
          });
          break;
        case AuthContactMethodType.EMAIL:
          this.notificationService.push({
            toUsers: [{user: userObj}],
            notificationMediaType: NotificationMediaType.EMAIL,
            title: contactMethod.get('emailTitle'),
            data: {
              screen: contactMethod.get('emailTemplate'),
              parameters: {
                ...contactMethod.get('transportParameters'),
                t_title: contactMethod.get('emailTitle'),
                t_message: contactMethod.get('emailMessage')['default']
              }
            }
          });
          break;
      }
    }

    // update with newly changed fields
    const updatedUser = await this.userService.update(
      userObj?._id?.toHexString(),
      userToUpdate
    );
    // return new user
    return updatedUser;
  }

  public async signUp(
    userCreateModel: AuthUserCreateModel,
    options?: SignUpOptionsModel
  ): Promise<{user: IUser; auth: Auth}> {
    // define options
    const opts = {
      usernameAutoGenerate: true,
      sendPasscode: true,
      ...options
    };
    // extract auth fields from user model
    const {password, loginChannels, ...userModel} = userCreateModel;
    // create user
    const user = await this.addUser(userModel, opts);
    // create auth
    const auth = await this.createAuth({
      user: user._id.toHexString(),
      // TODO: should allow empty password?
      password: await hashPlainText(password || 'empty'),
      loginChannels: loginChannels || [{type: 'default', id: ''}]
    });
    // if send passcode, send passcode with key SIGN_UP
    if (opts.sendPasscode) {
      await this.sendPasscode(user, {
        contactMethod: AuthContactMethodKeyType.SIGN_UP
      });
    }
    // return user;
    return {user, auth};
  }

  public async addUser(userModel: UserCreateModel, opts?: SignUpOptionsModel) {
    // create user
    const user = await this.userService.create(
      // user model
      userModel,
      // don't need to declare any mongoose options
      {lean: true},
      // pass username options into user create
      opts
    );
    // get auth config for ac groups to add user to
    const authConfig = await this.authConfigService.findOne({
      userTypes: user.userTypes
    });
    // add user to ac groups
    if (authConfig?.signUpAcGroups?.length) {
      await this.userService.addUserToAcGroups(
        user._id.toHexString(),
        authConfig.signUpAcGroups
      );
    }
    return user;
  }

  public async createAuth(authCreateModel: AuthCreateModel) {
    return this.create(authCreateModel, {lean: true});
  }

  public async inviteUsers(
    contactCreateModel: {contacts: string[]; contactType: string},
    userType: string
  ) {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    return Promise.all(
      contactCreateModel?.contacts?.map(async c => {
        const user = await this.addUser(
          {
            [contactCreateModel.contactType]: c,
            userTypes: [userType],
            workspaces: [workspaceId],
            currentWorkspace: workspaceId
          },
          {usernameAutoGenerate: true}
        );
        await this.createAuth({
          user: user?._id?.toHexString(),
          password: await hashPlainText('empty'),
          loginChannels: [{type: 'default', id: ''}]
        });
        await this.sendPasscode(user, {
          contactMethod: AuthContactMethodKeyType.INVITE
        });
        return user;
      })
    );
  }

  public async updatePassword(
    user: IUser | string,
    newPassword: string,
    oldPassword?: string
  ): Promise<void> {
    // define userId from param
    const userId = typeof user === 'string' ? user : user._id.toHexString();
    // if old password is passed in, check if old password is valid
    // before updating
    if (
      oldPassword !== undefined &&
      !(await this.isMatchPassword(user, oldPassword))
    ) {
      throw new Error('password not match');
    }
    // update db with new password
    await this.authRepository.updateOne(
      {
        user: userId
      },
      {
        $set: {
          password: await hashPlainText(newPassword)
        }
      },
      {
        new: true,
        session: this.getMongoSession()
      }
    );
  }

  public async validatePasscode(
    input: IUser | string,
    passcode: string,
    options?: {
      returnPasscodeToken?: boolean;
      useOnce?: boolean;
      updateUserVerify?: boolean;
      updateUserStatus?: boolean;
      // optional field to reduce api calls
      auth?: Auth;
    }
  ): Promise<IPasscodeToken | boolean> {
    // define options
    const opts = {
      // set default values
      useOnce: false,
      ...options
    };

    if (!input) {
      throw new Error('empty input');
    }
    // retrieve user by input either from db or if input
    // input is already a user, just assign it
    let user: IUser;
    if (typeof input === 'string') {
      user = await this.findOneUserFromMany(input);
    } else {
      user = input;
    }

    // get auth either from options or from db
    const auth =
      options?.auth || (await this.findByUser(user._id.toHexString()));
    // get whether passcode is valid
    const isValid = this._isPasscodeValid(auth, passcode);
    // get the scope of the passcode
    const passcodeScope = this._getPasscodeScope(auth, passcode);
    // get whether the scope of this passcode mean we should
    // update user's verify status
    const isPasscodeScopeUpdateVerify =
      opts.updateUserVerify !== undefined
        ? opts.updateUserVerify
        : await this._isPasscodeUpdateVerify(auth, {user});
    // if passcode not valid, throw error
    if (!isValid) {
      throw new Error('invalid passcode');
    }
    // if want to update verify, check which input field
    // it is matching against, update that field's verified
    if (
      isPasscodeScopeUpdateVerify ||
      opts.updateUserVerify ||
      opts.updateUserStatus
    ) {
      // get matching field
      // FIXME: scope might not be an object field
      let inputFieldKey: string;
      // if passcode ends with "Verify", we'll assume
      // second part is the key
      if (/^[\w_]+Verify$/.test(passcodeScope)) {
        // place the scope without the word "Verify" as the field's
        // name
        inputFieldKey = passcodeScope.replace(/Verify$/, '');
      }
      // if passcodeScope not defined and input is string,
      // use input to extract input field key from object
      if (!inputFieldKey && typeof input === 'string') {
        inputFieldKey = this._getMatchingInputFieldKey(user, input);
      }
      // if inputFieldKey found, set the field as verified
      if (inputFieldKey) {
        // handle update verified
        user = await this.setUserFieldVerified(
          user,
          inputFieldKey,
          options.updateUserStatus
        );
      }
    }
    // if useOnce, then invalidate it now
    if (opts.useOnce) {
      await this.invalidateUserPasscode(user, passcode);
    }
    // if option says return a new passcode token
    if (opts.returnPasscodeToken) {
      // generate and return a new passcode token
      return this.generatePasscodeToken(user, {
        scope: passcodeScope
      });
    }
    // everything passed, return success
    return true;
  }

  public async validatePasscodeToken(
    // passcode token to validate
    passcodeToken: string,
    // secondary optional fields
    options?: {
      // should function return a new passcode token
      // after valid?
      returnPasscodeToken?: boolean;
      // should we invalidate passcode after valid?
      useOnce?: boolean;
      // should we update user verify after valid?
      updateUserVerify?: boolean;
      // should update user status on token validation
      updateUserStatus?: boolean;
    }
  ): Promise<IPasscodeToken | boolean> {
    // define options
    const opts = {
      // set default values
      useOnce: false,
      ...options
    };
    // decrypt passcode token to give us user and passcode
    // will throw error if fail
    const {user: userId, passcode} = this._decryptPasscodeToken(passcodeToken);
    // validate passcode
    return this.validatePasscode(userId, passcode, opts);
  }

  public async validatePasscodeTokenAndReturnUser(
    // passcode token to validate
    passcodeToken: string,
    // secondary optional fields
    options?: {
      // should function return a new passcode token
      // after valid?
      returnPasscodeToken?: boolean;
      // should we invalidate passcode after valid?
      useOnce?: boolean;
      // should we update user verify after valid?
      updateUserVerify?: boolean;
      // should update user status on token validation
      updateUserStatus?: boolean;
    }
  ) {
    // define options
    const opts = {
      // set default values
      useOnce: false,
      ...options
    };
    // decrypt passcode token to give us user and passcode
    // will throw error if fail
    const {user: userId, passcode} = this._decryptPasscodeToken(passcodeToken);
    // validate passcode
    const validateSuccess = await this.validatePasscode(userId, passcode, opts);
    if (validateSuccess) {
      const user = await this.findOneUserFromMany(userId);
      return {validate: true, user: user};
    }
    return {validate: false};
  }

  /**
   * get the users with the same input (phone, email) and returns most recent
   * @param input
   * @param userTypes
   */
  public async findOneUserFromMany(input: string, userTypes?: Array<string>) {
    const currentUser = this.getCurrentUser();
    const users = await this.userService.find(
      {
        verifyInput: currentUser ? currentUser?._id?.toHexString() : input,
        ...(userTypes?.length && {userTypes})
      },
      {
        sort: '-createdAt',
        lean: true
      }
      // sort by descending order always look for the latest user
    );
    // return the recently created user
    return users[0];
  }

  /**
   * delete users and auth by channelId
   * @param channelId
   */
  public async removeFacebookUser(signedRequest: string, workspaceId: string) {
    const workspace = await this.workspaceService.findById(workspaceId);
    const data = parseSignedRequest(
      signedRequest,
      workspace?.serviceApps?.facebook?.secret
    );
    const facebookUserId = data.user_id;

    // Start data deletion
    // NOTE: login channel is always unique along with workspace
    // so should return data of single length from aggregation
    const auths = await this.authRepository.aggregate([
      {
        $lookup: {
          from: 'Users',
          localField: 'user',
          foreignField: '_id',
          as: 'User'
        }
      },
      {
        $match: {
          'loginChannels.type': 'facebook',
          'loginChannels.id': facebookUserId,
          'User.currentWorkspace': new ObjectId(workspaceId)
        }
      }
    ]);

    if (auths?.[0]) {
      await this.update(auths[0]._id.toHexString(), {
        ...auths[0],
        loginChannels: auths[0]?.loginChannels?.filter(
          c => c.type !== 'facebook'
        )
      });
      // await this.userService.delete(auths[0].user.toHexString());
      // URL to track the deletion
      const statusUrl = `${prepareUrl(
        workspace?.webHost,
        workspace?.alwaysHttpsWebHost
      )}${
        process.env.FACEBOOK_DELETION_HOST_PATH
      }?id=${auths[0].user.toHexString()}`;
      // requires unique code for the deletion request right now using facebookUserId
      const confirmationCode = auths[0].user.toHexString();

      return {
        url: statusUrl,
        confirmation_code: confirmationCode
      };
    } else {
      return false;
    }
  }

  /**
   * get user passcode
   * @param userid userid
   * @param platform [admin]
   */
  public async getPasscodeByUserId(userId) {
    if (userId) {
      const auth = await this.authRepository.findOne({user: userId});
      return auth.passcode;
    } else {
      throw new BadRequestException({code: 'err_missing_param'});
    }
  }
}
