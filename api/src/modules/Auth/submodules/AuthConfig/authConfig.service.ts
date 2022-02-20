import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  AuthConfigCreateModel,
  AuthConfigUpdateModel,
  AuthConfigSearchModel
} from './models';
import {
  AuthConfig,
  AuthConfigModel,
  AuthConfigContactMethodDetail,
  AuthConfigContactMethodDetailWithConfig,
  AuthConfigContactMethod
} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class AuthConfigService extends BaseCRUDService<
  AuthConfig,
  AuthConfigCreateModel,
  AuthConfigUpdateModel,
  AuthConfigSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('AuthConfigs')
    private readonly authConfigRepository: AuthConfigModel
  ) {
    super(authConfigRepository, request);
  }

  public _castQuery(searchModel: AuthConfigSearchModel) {
    const queryAnd = [];
    const {workspace, userTypes} = searchModel;

    const currentUser = this.getCurrentUser();
    const workspaceId = currentUser
      ? currentUser?.currentWorkspace?.toHexString()
      : this.getHeaderWorkspace() || workspace;

    if (userTypes?.length) {
      queryAnd.push({userType: {$in: userTypes}});
    }

    if (workspaceId) {
      queryAnd.push({workspace: workspaceId});
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  public getContactMethodField(
    contactMethods: AuthConfigContactMethod,
    field: string,
    method?: string
  ) {
    const contactMethodField =
      contactMethods?.[method || '']?.[field] ||
      contactMethods?.default?.[field];
    return contactMethodField;
  }

  public async getContactMethod(
    userType: string,
    workspaceId: string,
    method?: string
  ): Promise<AuthConfigContactMethodDetailWithConfig> {
    const authConfig = await this.authConfigRepository.findOne({
      userType: userType,
      workspace: workspaceId
    });
    const authMethod: AuthConfigContactMethodDetail = {
      ...(authConfig?.contactMethod?.default || {}),
      ...(method ? authConfig?.contactMethod?.[method] : {})
    };
    return {
      ...authMethod,
      config: authConfig,
      get: (field: string) =>
        this.getContactMethodField(authConfig?.contactMethod, field, method)
    };
  }
}
