import {UseFilters} from '@nestjs/common';
import {Args, Mutation, Resolver, Context} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  NotFoundException,
  GqlWorkspaceId,
  GqlCurrentUser,
  RequireLogin
} from 'src/core';
import {IUserToken} from './interfaces';
import {AuthUserCreateModel} from './models';
import {AuthService} from './auth.service';
import {IUser} from '../User';

@Resolver('Auth')
@UseFilters(GraphQLExceptionFilter)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async signUp(
    @Args('user') userCreateModel: AuthUserCreateModel,
    @GqlCurrentUser() currentUser: IUser,
    @GqlWorkspaceId() workspace: string
  ) {
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || workspace;
    // sign up using a mix of auth fields and user fields
    if (workspaceId) {
      userCreateModel.currentWorkspace = workspaceId;
      userCreateModel.workspaces = [
        ...new Set([
          ...(userCreateModel?.workspaces || []),
          ...(workspaceId ? [workspaceId] : [])
        ])
      ];
    }
    const {user, auth} = await this.authService.signUp(userCreateModel, {
      sendPasscode: false
    });
    // generate user token
    const userToken = await this.authService.generateUserToken(
      user,
      userCreateModel?.password,
      user?.userTypes,
      {
        auth
      }
    );
    return {user, userToken};
  }

  @Mutation()
  async userToken(
    @Args('input') input: string,
    @Args('password') password: string,
    @Args('userTypes') userTypes: string[]
  ) {
    return this.authService.generateUserToken(input, password, userTypes);
  }

  @Mutation()
  async forgotPassword(@Args('input') input: string, @Args('options') options) {
    try {
      await this.authService.forgotPassword(input, options);
    } catch (err) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_user'}
      });
    }
    return true;
  }

  @Mutation()
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
    @Context() ctx
  ): Promise<IUserToken> {
    const {
      headers: {authorization}
    } = ctx.req;
    const accessToken = authorization?.replace(/(B|b)earer /, '');
    return (
      accessToken &&
      this.authService.generateUserTokenByRefreshToken(
        accessToken,
        refreshToken
      )
    );
  }

  @Mutation()
  async validatePasscode(
    @Args('input') input: string,
    @Args('passcode') passcode: string,
    @Args('options') options
  ) {
    const result = await this.authService.validatePasscode(input, passcode, {
      ...options,
      returnPasscodeToken: options.returnNewPasscodeToken
    });
    // if result is a boolean, just return empty because there's nothing
    // needed and GQL only accepts one type of response
    if (typeof result === 'boolean') {
      return null;
    } else {
      // if result is not a boolean, we assume it is passcodeToken, so
      // return the object
      return result;
    }
  }

  @Mutation()
  async sendPasscode(@Args('input') input: string, @Args('options') options) {
    return this.authService.sendPasscode(input, options);
  }

  @Mutation()
  async validatePasscodeToken(
    @Args('token') token: string,
    @Args('options') options
  ) {
    return this.authService.validatePasscodeToken(token, {
      ...options,
      returnPasscodeToken: options?.returnNewPasscodeToken
    });
  }

  @Mutation()
  async setPassword(
    @Args('passcodeToken') passcodeToken: string,
    @Args('password') password: string
  ) {
    await this.authService.resetPassword(passcodeToken, password, {
      passcodeUseOnce: true,
      updateUserVerify: true
    });
    return true;
  }

  @Mutation()
  async resetPassword(
    @Args('passcodeToken') passcodeToken: string,
    @Args('password') password: string
  ) {
    await this.authService.resetPassword(passcodeToken, password, {
      passcodeUseOnce: true
    });
    return true;
  }

  @Mutation()
  @RequireLogin()
  async updateMyPassword(
    @GqlCurrentUser() currentUser: IUser,
    @Args('newPassword') newPassword: string,
    @Args('oldPassword') oldPassword: string
  ) {
    await this.authService.updatePassword(
      currentUser,
      newPassword,
      oldPassword
    );
    return true;
  }

  @Mutation()
  async loginChannelExists(@Args('type') type, @Args('id') id) {
    const auth = await this.authService.findLoginChannel(type, id);
    return Boolean(auth);
  }

  @Mutation()
  async loginFacebook(@Args('token') token, @Args('newUser') newUser) {
    return this.authService.loginFacebook(token, newUser);
  }

  @Mutation()
  async loginApple(@Args('token') token, @Args('newUser') newUser) {
    return this.authService.loginApple(token, newUser);
  }

  @Mutation()
  async loginGoogle(@Args('token') token, @Args('newUser') newUser) {
    return this.authService.loginGoogle(token, newUser);
  }

  @Mutation()
  async loginWeChat(@Args('code') code, @Args('newUser') newUser) {
    return this.authService.loginWeChat(code, newUser);
  }

  @Mutation()
  async loginMessaging(
    @Args('phone') phone,
    @Args('userType') userType,
    @Args('verifyCode') verifyCode,
    @Args('phoneRegionCode') phoneRegionCode
  ) {
    return this.authService.loginMessaging({
      phone,
      userType,
      verifyCode,
      phoneRegionCode
    });
  }

  @Mutation()
  async sendMessagingVerification(
    @Args('phone') phone,
    @Args('phoneRegionCode') phoneRegionCode
  ) {
    return this.authService.sendMessagingVerification({phone, phoneRegionCode});
  }
}
