import {
  Body,
  Post,
  Controller,
  UseFilters,
  Query,
  Get,
  Patch,
  Header,
  Headers,
  Param
} from '@nestjs/common';
import lib from '@golpasal/lib';

import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';
import {NotFoundException} from 'src/core/exceptions';
import {
  CurrentUser,
  BypassSecretGuard,
  WorkspaceId,
  RequireLogin,
  UserTypes
} from 'src/core/decorators';

// services
import {AuthService} from './auth.service';

// models
import {
  AuthUserTokenRequestModel,
  AuthForgotPasswordModel,
  AuthValidatePasscodeModel,
  AuthSendPasscodeModel,
  AuthSetCurrentUserPasswordModel,
  AuthResetPasswordModel,
  AuthUserCreateModel
} from './models';
import {IUser} from '../User/interfaces';

import common from '@golpasal/common';
const {UserType} = common.type;
const {sleep} = lib;

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post()
  public async signUp(
    @Body() authUserCreateModel: AuthUserCreateModel,
    @CurrentUser() currentUser: IUser,
    @WorkspaceId() workspace: string
  ) {
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || workspace;
    // sign up using a mix of auth fields and user fields
    if (workspaceId) {
      authUserCreateModel.currentWorkspace = workspaceId;
      authUserCreateModel.workspaces = [
        ...new Set([
          ...(authUserCreateModel?.workspaces || []),
          ...(workspaceId ? [workspaceId] : [])
        ])
      ];
    }
    const {user} = await this.authService.signUp(authUserCreateModel);
    return user;
  }

  @RequireLogin()
  @Post('/invite-users/:userType')
  public async inviteUser(
    @Body() contactCreateModel: {contacts: string[]; contactType: string},
    @Param() param: {userType: string}
  ) {
    return this.authService.inviteUsers(contactCreateModel, param?.userType);
  }

  @Post('token')
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async getUserToken(
    @Body() body: AuthUserTokenRequestModel,
    @Query() query
  ) {
    try {
      // generate and return a userToken
      const userToken = await this.authService.generateUserToken(
        body?.input,
        body?.password,
        query?.userTypes
      );
      return userToken;
    } catch (err) {
      // give pause to prevent constant messaging (DDOS)
      await sleep();
      // returning generic fail to prevent caller from
      // identifying whether it is valid or not
      throw new NotFoundException({code: 'err_login_not_user_pwd'});
    }
  }

  @Get('refresh-token')
  public async generateUserTokenByRefreshToken(
    @Query('refreshToken') refreshToken: string,
    @Headers() headers
  ) {
    const accessToken = headers.authorization.replace(/(B|b)earer /, '');
    return (
      accessToken &&
      this.authService.generateUserTokenByRefreshToken(
        accessToken,
        refreshToken
      )
    );
  }

  @Post('forgot-password')
  public async forgotPassword(@Body() body: AuthForgotPasswordModel) {
    try {
      // extract fields from body
      const {input, transportType, interactType} = body;
      // sends notification for next step, based on authConfig
      return this.authService.forgotPassword(input, {
        transportType,
        interactType
      });
    } catch (err) {
      // returning success either way to prevent caller from
      // identifying whether it is valid or not
      return;
    }
  }

  @Post('send-passcode')
  public async sendPasscode(
    @Body() body: AuthSendPasscodeModel,
    @CurrentUser() currentUser
  ) {
    // extract fields from body
    const {input, contactMethod, transportType, interactType} = body;
    // send passcode
    return this.authService.sendPasscode(
      input || currentUser?._id.toHexString(),
      {contactMethod, transportType, interactType}
    );
  }

  @Post('validate-passcode')
  public async validatePasscode(
    @Body() body: AuthValidatePasscodeModel,
    @Query() query,
    @CurrentUser() currentUser
  ) {
    // extract fields from query
    const {useOnce, returnPasscodeToken} = query;
    // extract fields from body
    const {input, passcode} = body;
    // validate passcode and either:
    //   1. pass, invalidate passcode if useOnce, and return true
    //   2. fail, throw error
    return this.authService.validatePasscode(
      input || currentUser?._id.toHexString(),
      passcode,
      {useOnce, returnPasscodeToken}
    );
  }

  @BypassSecretGuard()
  @Get('validate-passcode-token')
  public async validatePasscodeToken(@Query() query) {
    const {useOnce, token, returnNewPasscodeToken} = query;
    // validate passcode token and either:
    //   1. pass, invalidate passcode if useOnce, and return true
    //   2. fail, throw error
    return this.authService.validatePasscodeToken(token, {
      useOnce,
      returnPasscodeToken: returnNewPasscodeToken,
      // separates the logic to change user status from passcode validation
      updateUserStatus: false
    });
  }

  @BypassSecretGuard()
  @Post('set-password')
  public async setPassword(@Body() body: AuthResetPasswordModel) {
    // extract fields from body
    const {passcodeToken, password} = body;
    // reset password with passcodeToken and new password
    // and returns void
    return this.authService.resetPassword(passcodeToken, password, {
      passcodeUseOnce: true,
      updateUserVerify: true,
      updateUserStatus: true
    });
  }

  @BypassSecretGuard()
  @Post('reset-password')
  public async resetPassword(@Body() body: AuthResetPasswordModel) {
    // extract fields from body
    const {passcodeToken, password, updateUserVerify} = body;
    // reset password with passcodeToken and new password
    // and returns void
    return this.authService.resetPassword(passcodeToken, password, {
      passcodeUseOnce: true,
      updateUserVerify
    });
  }

  @RequireLogin()
  @Patch('me/set-password')
  public async setCurrentUserPassword(
    @CurrentUser() me: IUser,
    @Body() body: AuthSetCurrentUserPasswordModel
  ) {
    // extract fields from body
    const {password} = body;
    // based on current user, update password
    return this.authService.updatePassword(me, password);
  }

  /** NOTE: Be very careful with the endpoint */
  @BypassSecretGuard()
  @Post('remove-facebook-user/:workspaceId')
  public async deleteChannelUsers(
    @Param() param: {workspaceId: string},
    @Body() body: {signed_request: string}
  ) {
    return this.authService.removeFacebookUser(
      body?.signed_request,
      param?.workspaceId
    );
  }

  /**
   * get passcode by user id
   * @param query user
   */
  @Get('passcode')
  @UserTypes(
    // UserType.SYSTEM_ADMIN,
    UserType.PROVIDER
  )
  getPassCodeByUserId(@Query() query) {
    return this.authService.getPasscodeByUserId(query?.user);
  }
}
