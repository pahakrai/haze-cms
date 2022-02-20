import {Post, Get, Put, Controller, Body, Query} from '@nestjs/common';
import {BaseController, BypassSecretGuard} from 'src/core';

// services
import {AuthService} from '../Auth/auth.service';
import {ProviderService} from './provider.service';

import {ProviderUserModel} from './models/provider.user.model';
import {ProviderWorkspaceConfirmModel} from './models';

@Controller('providers')
export class ProviderController extends BaseController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly authService: AuthService
  ) {
    super();
  }

  @BypassSecretGuard()
  @Post('signUp')
  public async signUp(@Body() body: ProviderUserModel) {
    return this.providerService.signUp(body);
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
  @Put('workspace/confirm')
  public async workspaceConfirm(
    @Query() query,
    @Body() body: ProviderWorkspaceConfirmModel
  ) {
    const {useOnce, token, returnNewPasscodeToken} = query;
    return this.providerService.workspaceConfirm(
      token,
      {
        useOnce,
        returnPasscodeToken: returnNewPasscodeToken,
        // separates the logic to change user status from passcode validation
        updateUserStatus: false
      },
      body
    );
  }
}
