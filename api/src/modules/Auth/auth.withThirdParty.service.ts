/* eslint-disable max-len */
import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import axios from 'axios';
import {ObjectId} from 'mongodb';
import {InternalServerErrorException, BadRequestException} from 'src/core';
import common from '@golpasal/common';

import {AuthModel} from './interfaces';
import {Auth} from './interfaces/auth.interface';
import {WeChatAccessTokenModel} from './interfaces/IAuth.wechat.access.token';

import CommonHelper from './common.helper';

import {BlobService} from '../File/Blob';
import {FilemetaService} from '../File/FileMeta';
import {ParamService} from '../Param/param.service';
import {CacheService} from '../Cache/cache.service';
import {AuthBaseService} from './auth.base.service';
import {WorkspaceService} from '../Workspace/workspace.service';
import {UserService, WeChatUserInfoModel, IUser} from '../User';
import {NotificationService} from '../Notification/notification.service';
import {AuthConfigService} from './submodules/AuthConfig/authConfig.service';
import {AuthUserWithThirdPartyCreateModel} from './models/authUser.withThirdParty.create.model';
import {IamService} from '../Iam/iam.service';
import {SMSService} from '../Sms/services/sms.service';
import {SMSTwilioService} from '../Sms/services/twilio.service';

const {UserStatus} = common.status;
const {UserType, LoginChannel} = common.type;

@Injectable({scope: Scope.REQUEST})
export class AuthWithThirdPartyService extends AuthBaseService {
  constructor(
    @InjectModel('Auths') protected readonly authRepository: AuthModel,
    @Inject(REQUEST) request,
    protected readonly iamService: IamService,
    protected readonly blobService: BlobService,
    protected readonly userService: UserService,
    protected readonly cacheService: CacheService,
    protected readonly fileMetaService: FilemetaService,
    protected readonly paramService: ParamService,
    protected readonly workspaceService: WorkspaceService,
    protected readonly authConfigService: AuthConfigService,
    protected readonly notificationService: NotificationService,
    protected readonly smsService: SMSService
  ) {
    super(
      authRepository,
      request,
      userService,
      authConfigService,
      cacheService,
      notificationService,
      workspaceService
    );
  }

  public async findLoginChannel(type: string, id: string) {
    // get one user with loginChannel type and id
    const workspaceId = this.getHeaderWorkspace();
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
          'loginChannels.type': type,
          'loginChannels.id': id,
          'User.isVerified': true,
          $or: [
            {'User.currentWorkspace': new ObjectId(workspaceId)},
            {'User.workspaces': new ObjectId(workspaceId)}
          ]
        }
      }
    ]);

    // NOTE: login channel is always unique along with workspace
    // so should return data of single length from aggregation
    return auths?.[0];
  }

  async loginGoogle(token: string, newUser: AuthUserWithThirdPartyCreateModel) {
    // test token
    const {
      data: {
        email,
        id: googleId,
        name,
        picture,
        // optional fetches
        locale: googleUserLocale,
        link,
        verified_email,
        family_name,
        gender,
        given_name
      }
    } = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: {Authorization: `Bearer ${token}`}
    });

    // fetch auth by channel id
    let auth: Auth = await this.findLoginChannel(LoginChannel.GOOGLE, googleId);

    // let user = await this.userService.findOne({email});
    let user: IUser;

    if (!auth) {
      // if user not found, create user
      let avatars = newUser.avatars;
      // if newUser doesn't have avatars, create fileMeta for it
      if (!newUser.avatars || !newUser.avatars.length) {
        const avatarFileMeta = await this.fileMetaService.create({
          mimetype: 'image/jpg',
          uri: picture,
          thumbnailUri: picture,
          folder: '/',
          serviceType: '',
          tags: [],
          originalName: 'google_profile.jpg',
          fileExtension: '.jpg',
          displayName: 'google_profile.jpg',
          uploadedName: '',
          size: 0,
          workspace: '',
          isSystemFile: false
        });
        avatars = [
          {
            default: true,
            fileMeta: avatarFileMeta._id
          }
        ];
      }
      // create user
      const workspaceId = this.getHeaderWorkspace();
      const signUpData: {user: IUser; auth: Auth} = await this.signUp({
        ...newUser,
        // user data
        workspaces: workspaceId ? [workspaceId] : newUser.workspaces || [],
        currentWorkspace: workspaceId || newUser.currentWorkspace,
        phoneRegionCode: '',
        phone: '', // `_gl${Math.floor(Math.random() * 100000000)}`,
        email: email?.toLowerCase(),
        isVerified: true,
        verified: {
          email: true // default to false
        },
        password: '',
        username: '',
        name,
        userTypes: user?.userTypes ? user?.userTypes : [UserType.MEMBER],
        status: UserStatus.ACTIVE,
        description: '',
        preferences: {
          language: 'en',
          receiveNotification: true
        },
        avatars,
        // auth data
        loginChannels: [
          {
            type: LoginChannel.GOOGLE,
            id: googleId
          }
        ]
      });

      if (signUpData) {
        user = signUpData?.user;
        auth = signUpData?.auth;
      }

      // NOTE: for auth create
    } else {
      user = await this.userService.findById(auth?.user?.toString());
    }
    // return user's token (our token)
    const jwtToken = await this._createJwtToken(
      user?.userTypes ? user?.userTypes : [UserType.MEMBER],
      user?._id?.toHexString(),
      null,
      {
        auth
      }
    );
    return {
      user,
      userToken: jwtToken
    };
  }

  async loginFacebook(
    token: string,
    newUser: AuthUserWithThirdPartyCreateModel
  ) {
    // get email by token
    const fields = ['email', 'name'];
    const {
      data: {email, name, id: facebookId}
    } = await axios.get(
      `https://graph.facebook.com/me?fields=${fields.join(
        ','
      )}&access_token=${token}`
    );
    if (!facebookId) {
      throw new Error('facebook token invalid');
    }

    // fetch user by loginChannel or email
    let auth: Auth = await this.findLoginChannel(
      LoginChannel.FACEBOOK,
      facebookId
    );

    let user: IUser;

    if (!auth) {
      // if user not found, create user
      // get profile picture from facebook
      const pictureResponse = await axios.get(
        `https://graph.facebook.com/me/picture?type=large&redirect=true&width=480&height=480&access_token=${token}&redirect=false`
      );
      const {
        data: {url: profilePicUrl}
      } = pictureResponse.data;
      // download facebook user avatar picture
      const avatarFile = await CommonHelper.downloadFile(
        profilePicUrl,
        `${facebookId}_profile`
      );
      const workspace = this.getHeaderWorkspace();
      // upload to s3
      const fileMeta = await this.blobService.uploadFile(
        avatarFile,
        `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`
      );

      // create user
      const workspaceId = this.getHeaderWorkspace();
      const signUpData: {user: IUser; auth: Auth} = await this.signUp({
        ...newUser,
        // user data
        workspaces: workspaceId ? [workspaceId] : newUser.workspaces || [],
        currentWorkspace: workspaceId || newUser.currentWorkspace,
        phoneRegionCode: '',
        phone: '', // `_fb${Math.floor(Math.random() * 100000000)}`,
        email: email ? email.toLowerCase() : `!${facebookId}@facebook.com`,
        isVerified: true,
        verified: {
          email: email ? true : false
        },
        // password: '',
        username: `${await this.userService.generateUsername(
          name.replace(/\s+/g, '.').toLowerCase()
        )}`,
        name,
        userTypes: user?.userTypes ? user?.userTypes : [UserType.MEMBER],
        status: UserStatus.ACTIVE,
        description: '',
        preferences: {
          language: 'en',
          receiveNotification: true
        },
        avatars: fileMeta
          ? [
              {
                default: true,
                fileMeta: fileMeta._id
              }
            ]
          : [],

        // auth data
        loginChannels: [
          {
            type: LoginChannel.FACEBOOK,
            id: facebookId
          }
        ]
      });
      if (signUpData) {
        user = signUpData?.user;
        auth = signUpData?.auth;
      }
      // NOTE: for auth create
    } else {
      user = await this.userService.findById(auth?.user?.toString());
    }
    // return user's token (our token)
    const jwtToken = await this._createJwtToken(
      user?.userTypes ? user?.userTypes : [UserType.MEMBER],
      user?._id?.toHexString(),
      null,
      {
        auth
      }
    );

    return {
      user,
      userToken: jwtToken
    };
  }

  async loginApple(token: string, newUser: AuthUserWithThirdPartyCreateModel) {
    // NOTE: token in previous cases are for api call for OAUTH but
    // apple doesnt provide OAUTH but still keep for reference
    const email = newUser?.email;
    const name = newUser?.username;
    const channelId = newUser?.channelId;
    // fetch user by loginChannel or email
    let auth: Auth = await this.findLoginChannel(LoginChannel.APPLE, channelId);

    let user: IUser;
    if (!auth) {
      // if user not found, create user
      const workspaceId = this.getHeaderWorkspace();
      const signUpData: {user: IUser; auth: Auth} = await this.signUp({
        ...newUser,
        // user data
        workspaces: workspaceId ? [workspaceId] : newUser.workspaces || [],
        currentWorkspace: workspaceId || newUser.currentWorkspace,
        phoneRegionCode: '',
        phone: '',
        email: email ? email.toLowerCase() : `!${channelId}@apple.com`,
        verified: {
          email: false // default to false
        },
        username: `${await this.userService.generateUsername(
          name.trim().replace(/\s+/g, '.').toLowerCase()
        )}`,
        name,
        userTypes: user?.userTypes ? user?.userTypes : [UserType.MEMBER],
        status: UserStatus.ACTIVE,
        description: '',
        preferences: {
          language: 'en',
          receiveNotification: true
        },
        avatars: [],
        password: '',
        // auth data
        loginChannels: [
          {
            type: LoginChannel.APPLE,
            id: channelId
          }
        ]
      });

      if (signUpData) {
        user = signUpData?.user;
        auth = signUpData?.auth;
      }

      // NOTE: For auth create
    } else {
      user = await this.userService.findById(auth?.user?.toString());
    }
    // return user's token (our token)
    const jwtToken = await this._createJwtToken(
      user?.userTypes ? user?.userTypes : [UserType.MEMBER],
      user?._id?.toHexString(),
      null,
      {
        auth
      }
    );
    return {
      user,
      userToken: jwtToken
    };
  }

  /**
   * @description login with WeChat
   * @param code 第三方发起微信授权登录请求，微信用户允许授权第三方应用后的授权临时票据code参数
   */
  public async loginWeChat(code: string, newUser: any): Promise<any> {
    // get access_token and openid by code, appid and appsecret
    let accessTokenData: WeChatAccessTokenModel = null;
    try {
      const outh2Response = await axios.get(
        process.env.WECHAT_OAUTH2_REQUEST_URL,
        {
          params: {
            appid: process.env.WECHAT_APPID,
            secret: process.env.WECHAT_SECRET,
            code,
            grant_type: 'authorization_code'
          }
        }
      );
      accessTokenData = outh2Response.data;
    } catch (error) {
      throw new InternalServerErrorException({});
    }
    // if not exists access_token, throw error
    if (!accessTokenData || !accessTokenData.access_token) {
      throw new BadRequestException({code: 'err_wechat_login_failed'});
    }
    // if unionid exists, find user in db
    let weChatUserInfo: WeChatUserInfoModel = null;
    let auth: Auth = await this.findLoginChannel(
      LoginChannel.WECHAT,
      accessTokenData.unionid
    );
    let user: IUser;

    // if not found user in db, should get wechat userinfo
    if (!auth) {
      try {
        // get wechat userinfo
        const userInfoResponse = await axios.get(
          process.env.WECHAT_USERINFO_REQUEST_URL,
          {
            params: {
              access_token: accessTokenData.access_token,
              openid: accessTokenData.openid
            }
          }
        );
        weChatUserInfo = userInfoResponse.data;
      } catch (error) {
        throw new InternalServerErrorException({});
      }
      if (!weChatUserInfo || !weChatUserInfo.unionid) {
        throw new BadRequestException({code: 'err_wechat_login_failed'});
      }
      auth = await this.findLoginChannel(
        LoginChannel.WECHAT,
        accessTokenData.unionid
      );
    }
    // 如果数据库不存在该user的WeChat login记录, signup user
    if (!auth && weChatUserInfo) {
      // download wechat user avatar picture
      const avatarFile = await CommonHelper.downloadFile(
        weChatUserInfo.headimgurl,
        weChatUserInfo.unionid.toString()
      );
      // upload to s3, since the wechat avatar picture
      // may invalid when wechat user update avatar picture
      // so we cant use wechat avatar url(weChatUserInfo.headimgurl)
      const fileMetaId = await this.blobService.uploadFile(
        avatarFile,
        `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${newUser.currentWorkspace}`
      );
      // singup user
      // create user
      const workspaceId = this.getHeaderWorkspace();
      const signUpData: {user: IUser; auth: Auth} = await this.signUp({
        ...newUser,
        // user data
        workspaces: workspaceId ? [workspaceId] : newUser.workspaces || [],
        currentWorkspace: workspaceId || newUser.currentWorkspace,
        phoneRegionCode: '',
        phone: '',
        email: '',
        verified: {
          email: false // default to false
        },
        // password: '',
        username: weChatUserInfo.nickname,
        name: weChatUserInfo.nickname,
        userTypes: user?.userTypes ? user?.userTypes : [UserType.MEMBER],
        status: UserStatus.ACTIVE,
        description: '',
        preferences: {
          language: this.getLocale()?.getLanguage,
          receiveNotification: true
        },
        avatars: fileMetaId
          ? [
              {
                default: true,
                fileMetaId
              }
            ]
          : [],
        // auth data
        loginChannels: [
          {
            type: LoginChannel.WECHAT,
            id: weChatUserInfo?.unionid
          }
        ]
      });
      if (signUpData) {
        user = signUpData?.user;
        auth = signUpData?.auth;
      }
    }
    if (auth) {
      user = await this.userService.findById(auth?.user?.toString());
    }
    if (!user) {
      throw new BadRequestException({code: 'err_wechat_login_failed'});
    }
    // return user's token (our token)
    const jwtToken = await this._createJwtToken(
      user?.userTypes ? user?.userTypes : [UserType.MEMBER],
      user?._id?.toHexString(),
      null,
      {
        auth
      }
    );
    return {
      user,
      userToken: jwtToken
    };
  }

  /**
   * dial to user with the verify code
   *
   * @param model user phone no and region code
   */
  public async sendMessagingVerification(model: {
    phoneRegionCode: string;
    phone: string;
  }) {
    const workspaceId = this.getHeaderWorkspace();
    const workspace = await this.workspaceService.findById(workspaceId);
    const fullPhoneNo = `${model.phoneRegionCode}${model.phone}`;

    // Get bypass phone no. (if any) from params collection
    const params = await this.paramService.getParameter(
      'bypass_phone',
      workspaceId
    );
    const phoneByPass = params.find(p => p.phone === fullPhoneNo);
    const isPhoneByPass: boolean = phoneByPass ? true : false;

    if (process.env.TWILIO_AUTH_VERIFY_ENABLE === 'true' && !isPhoneByPass) {
      const locale = this.getLocale();

      if (workspace.preferences?.auth?.twilioLogin.useAuthy) {
        // Authy only available for twilio
        if (process.env.SMS_PROVIDER !== 'twilio') {
          throw new Error('NOT TWILIO');
        }

        // send authy request
        await (this.smsService as SMSTwilioService).authyVerify({
          workspace: workspaceId,
          language: locale.getLanguage(),
          phone: `${model.phoneRegionCode}${model.phone}`,
          channel: workspace.preferences?.auth?.twilioLogin.channel ?? 'call'
        });
      } else {
        // send sms using SMSService

        // generate random 6 digit
        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        // save verify code into cache (expire after 5 minute)
        await this.cacheService.set(
          `${model.phoneRegionCode}${model.phone}_${workspaceId}`,
          verifyCode,
          300000
        );

        // send sms to user
        await this.smsService.send({
          workspace: workspaceId,
          to: `${model.phoneRegionCode}${model.phone}`,
          body: locale.t('sms_validate_user_body', [verifyCode])
        });
      }
    }

    return true;
  }

  /**
   * verify phone with twilio and login/signup with it
   * @param model phone no and vierify code
   */
  public async loginMessaging(model: {
    phone: string;
    userType: string;
    verifyCode: string;
    phoneRegionCode: string;
  }) {
    let isApproved = false;
    const locale = this.getLocale();
    const workspaceId = this.getHeaderWorkspace();
    const fullPhoneNo = `${model.phoneRegionCode}${model.phone}`;
    const workspace = await this.workspaceService.findById(workspaceId);

    // Get bypass phone no. (if any) from params collection
    const params = await this.paramService.getParameter(
      'bypass_phone',
      workspaceId
    );
    const phoneByPass = params.find(p => p.phone === fullPhoneNo);
    const isPhoneByPass: boolean = phoneByPass ? true : false;

    if (process.env.TWILIO_AUTH_VERIFY_ENABLE === 'true' && !isPhoneByPass) {
      if (workspace.preferences?.auth?.twilioLogin?.useAuthy) {
        // Authy only available for twilio
        if (process.env.SMS_PROVIDER !== 'twilio') {
          throw new Error('NOT TWILIO');
        }

        isApproved = await (
          this.smsService as SMSTwilioService
        ).authyVerifyCheck({
          code: model.verifyCode,
          workspace: workspaceId,
          phone: `${model.phoneRegionCode}${model.phone}`,
          channel: workspace.preferences?.auth?.twilioLogin.channel ?? 'call'
        });
      } else {
        // verify with cached verify code
        const cachedVerifyCode = await this.cacheService.get(
          `${fullPhoneNo}_${workspaceId}`
        );

        isApproved = cachedVerifyCode === model.verifyCode;
      }
    } else {
      // skip twilio verify
      isApproved = true;
    }

    if (isApproved) {
      // verification pass

      // fetch user by loginChannel or email
      let user: IUser;
      let auth: Auth = await this.findLoginChannel(
        LoginChannel.MESSAGING,
        `${fullPhoneNo}_${model.userType}`
      );

      if (!auth) {
        // NOTE: check user as in some cases user exist but channel does not exist
        // and if the user exist auth must exist without the twilio channel
        // And update the login channel on the found auth
        // TODO: this scenario should not exist, add this channel with default channel
        // on signup process with workspace standard configurations
        user = await this.userService.findOne({
          phone: model?.phone,
          userTypes: [model.userType],
          isVerified: true
        });
        auth = await this.findByUser(user?._id?.toHexString());
        // user doesn't have this loginChannel, add it now
        if (user) {
          auth = await this.update(auth._id, {
            loginChannels: [
              ...auth?.loginChannels,
              {
                type: LoginChannel.MESSAGING,
                id: `${fullPhoneNo}_${model.userType}`
              }
            ]
          });
        } else {
          // if user exist
          // update auth with loginchannel
          // if user not found, create user
          const workspaceId = this.getHeaderWorkspace();
          // sign up
          const signUpData = await this.signUp(
            {
              workspaces: [workspaceId],
              currentWorkspace: workspaceId,
              phone: model.phone,
              phoneRegionCode: model.phoneRegionCode,
              verified: {
                phone: true
              },
              isVerified: true,
              userTypes: [model.userType],
              status: UserStatus.ACTIVE,
              description: '',
              preferences: {
                language: locale.getLanguage(),
                receiveNotification: true
              },
              avatars: [],
              password: '',
              loginChannels: [
                {
                  type: LoginChannel.MESSAGING,
                  id: `${fullPhoneNo}_${model.userType}`
                }
              ]
            },
            {sendPasscode: false}
          );

          if (signUpData) {
            user = signUpData?.user;
            auth = signUpData?.auth;
          }
        }
      } else {
        user = await this.userService.findById(auth?.user?.toString());
      }

      // return user's token (our token)
      const jwtToken = await this._createJwtToken(
        user.userTypes,
        user._id?.toHexString(),
        null,
        {
          auth
        }
      );
      return {
        user,
        userToken: jwtToken
      };
    }

    throw new BadRequestException({code: 'err_invalid_user_code'});
  }
}
