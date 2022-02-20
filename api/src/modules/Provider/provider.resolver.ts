import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UseFilters} from '@nestjs/common';
import {GraphQLExceptionFilter, BypassSecretGuard} from 'src/core';

import {ProviderService} from './provider.service';
import {AuthService} from '../Auth/auth.service';
import {ProviderUserModel} from './models/provider.user.model';

import {ProviderWorkspaceConfirmModel} from './models';

@Resolver('Provider')
@UseFilters(GraphQLExceptionFilter)
export class ProviderResolver {
  constructor(
    private readonly providerService: ProviderService,
    private readonly authService: AuthService
  ) {}

  @BypassSecretGuard()
  @Mutation()
  async signUpProvider(
    @Args('signupModel') providerUserModel: ProviderUserModel
  ) {
    const {user, workspace} = await this.providerService.signUp(
      providerUserModel
    );
    return {user, workspace};
  }

  @BypassSecretGuard()
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

  @BypassSecretGuard()
  @Mutation()
  async workspaceConfirm(
    @Args('token') token: string,
    @Args('options') options,
    @Args('workspaceConfirm')
    providerWorkspaceConfirmModel: ProviderWorkspaceConfirmModel
  ) {
    const {
      workspace,
      group,
      workspaceSubscription
    } = await this.providerService.workspaceConfirm(
      token,
      {
        ...options,
        returnPasscodeToken: options?.returnNewPasscodeToken
      },
      providerWorkspaceConfirmModel
    );
    return {
      workspace,
      group,
      workspaceSubscription
    };
  }
}
