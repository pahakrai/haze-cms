import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';

import {AuthModel} from './interfaces';

import {UserService} from '../User';
import {BlobService} from '../File/Blob';
// import {ACService} from '../Ac/ac.service';
import {FilemetaService} from '../File/FileMeta';
import {CacheService} from '../Cache/cache.service';
import {ParamService} from '../Param/param.service';
import {WorkspaceService} from '../Workspace/workspace.service';
import {AuthWithThirdPartyService} from './auth.withThirdParty.service';
import {NotificationService} from '../Notification/notification.service';
import {AuthConfigService} from './submodules/AuthConfig/authConfig.service';
import {IamService} from '../Iam/iam.service';
import {SMSService} from '../Sms/services/sms.service';

@Injectable({scope: Scope.REQUEST})
export class AuthService extends AuthWithThirdPartyService {
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
      iamService,
      blobService,
      userService,
      cacheService,
      fileMetaService,
      paramService,
      workspaceService,
      authConfigService,
      notificationService,
      smsService
    );
  }
}
