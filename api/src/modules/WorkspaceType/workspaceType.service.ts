import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  WorkspaceTypeCreateModel,
  WorkspaceTypeUpdateModel,
  WorkspaceTypeSearchModel
} from './models';
import {WorkspaceType, WorkspaceTypeModel} from './interfaces';
import {Workspace} from '../Workspace/interfaces';

// services
import {WorkspaceService} from '../Workspace/workspace.service';

@Injectable({scope: Scope.REQUEST})
export class WorkspaceTypeService extends BaseCRUDService<
  WorkspaceType,
  WorkspaceTypeCreateModel,
  WorkspaceTypeUpdateModel,
  WorkspaceTypeSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspaceTypes')
    private readonly workspaceTypeRepository: WorkspaceTypeModel,
    private readonly workspaceService: WorkspaceService
  ) {
    super(workspaceTypeRepository, request);
  }

  public _castQuery(searchModel: WorkspaceTypeSearchModel) {
    const query: any = {};
    const {type} = searchModel;

    if (type) {
      query.type = type;
    }

    return query;
  }

  /**
   * get requirements by requirement type (meta or files) and userType
   */
  async getRequirements(
    userType: string,
    requirementField?: string,
    wsType?: string
  ) {
    const workspace =
      this.getCurrentWorkspace() ||
      (this.getHeaderWorkspace() &&
        (await this.workspaceService.findById(this.getHeaderWorkspace())));
    const workspaceType = await this.findOne(
      {
        type: wsType || workspace?.type
      },
      {lean: true}
    );
    if (requirementField && workspaceType) {
      const userTypeConfig = workspaceType?.userTypeConfigs?.find(
        cfg => cfg?.userType === userType
      );
      return userTypeConfig ? userTypeConfig[requirementField] : [];
    }
    return workspaceType;
  }

  public async findMyWorkspaceType() {
    const currentWorkspace = this.getCurrentWorkspace<Workspace>();
    return this.findOne(
      {
        type: currentWorkspace?.type
      },
      {lean: true}
    );
  }

  public async getPayrollPayeeUserType(workspaceId?: string) {
    const currentWorkspace =
      this.getCurrentWorkspace() ||
      ((this.getHeaderWorkspace() || workspaceId) &&
        (await this.workspaceService.findById(
          this.getHeaderWorkspace() || workspaceId
        )));
    return (
      await this.findOne(
        {
          type: currentWorkspace?.type
        },
        {lean: true}
      )
    )?.payrollPayeeUserType;
  }

  /**
   * get userTypes by workspace id
   */
  public async getUserTypesByWorkspaceId(workspaceId: string) {
    const workspace = await this.workspaceService.findById(workspaceId);
    let workspaceUserTypes: Array<string> = [];
    if (workspace) {
      const workspaceType = await this.findOne({
        type: workspace?.type
      });
      workspaceUserTypes = workspaceType?.userTypeConfigs?.map(
        wst => wst?.userType
      );
    }
    return workspaceUserTypes;
  }

  /**
   * get userTypes display by workspace id
   */
  public async getUserTypesDisplay(workspaceId: string, locale = true) {
    const workspace = await this.workspaceService.findById(workspaceId);
    let userTypesDisplay: Array<any> = [];
    if (workspace) {
      const workspaceType = await this.findOne({
        type: workspace?.type
      });
      // filter only isShow equals true and map only the name prop
      userTypesDisplay = workspaceType?.userTypeDisplay?.filter(
        wst => wst?.isShow
      );
    }
    if (locale) {
      const locale = this.getLocale();
      this._mapToDisplay(userTypesDisplay, locale.getLanguage());
    }
    return userTypesDisplay;
  }

  /**
   * get serviceTypes display by workspace id
   */
  public async getServiceTypesDisplay(workspaceId: string, locale = true) {
    const workspace = await this.workspaceService.findById(workspaceId);
    let serviceTypesDisplay: Array<any> = [];
    if (workspace) {
      const workspaceType = await this.findOne({
        type: workspace?.type
      });
      // filter only isShow equals true and map only the name prop
      serviceTypesDisplay = workspaceType?.serviceTypeDisplay?.filter(
        wst => wst?.isShow
      );
    }
    if (locale) {
      const locale = this.getLocale();
      this._mapToDisplay(serviceTypesDisplay, locale.getLanguage());
    }
    return serviceTypesDisplay;
  }
}
