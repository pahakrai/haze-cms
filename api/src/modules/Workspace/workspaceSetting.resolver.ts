import {ResolveField, Parent, Resolver} from '@nestjs/graphql';
import {FilemetaService} from '../File/FileMeta';
import {WorkspaceService} from './workspace.service';

@Resolver('WorkspaceSetting')
export class WorkspaceSettingResolver {
  constructor(
    private readonly fileMetaService: FilemetaService,
    private readonly workspaceService: WorkspaceService
  ) {}

  @ResolveField('logo')
  async getLogo(@Parent() workspaceSetting) {
    return this.fileMetaService.findById(workspaceSetting.logo);
  }

  @ResolveField('favicon')
  async getFavicon(@Parent() workspaceSetting) {
    return this.fileMetaService.findById(workspaceSetting.favicon);
  }

  @ResolveField('headerLogo')
  async getHeaderLogo(@Parent() workspaceSetting) {
    return this.fileMetaService.findById(workspaceSetting.headerLogo);
  }

  @ResolveField('loginBackgroundImage')
  async getLoginBackgroundImage(@Parent() workspaceSetting) {
    return this.fileMetaService.findById(workspaceSetting.loginBackgroundImage);
  }

  @ResolveField('theme')
  async getPayer(@Parent() workspaceSetting) {
    const {setting} = await this.workspaceService._populate(
      {setting: workspaceSetting},
      ['$setting.theme']
    );
    return setting.theme;
  }
}
