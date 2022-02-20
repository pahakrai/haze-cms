import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {ObjectId} from 'mongodb';
import {helpers} from '@golpasal/common';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {BadRequestException} from 'src/core';
// interfaces & models
import {
  WorkspaceAppCreateModel,
  WorkspaceAppUpdateModel,
  WorkspaceAppSearchModel,
  VersionInfoModel,
  NextReleaseInfoModel
} from './models';
import {WorkspaceApp, WorkspaceAppModel} from './interfaces';

export enum DevicePlatformType {
  IOS = 'ios',
  ANDROID = 'android'
}

@Injectable({scope: Scope.REQUEST})
export class WorkspaceAppService extends BaseCRUDService<
  WorkspaceApp,
  WorkspaceAppCreateModel,
  WorkspaceAppUpdateModel,
  WorkspaceAppSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspaceApps')
    private readonly workspaceAppRepository: WorkspaceAppModel
  ) {
    super(workspaceAppRepository, request);
  }

  public _castQuery(searchModel: WorkspaceAppSearchModel) {
    const queryAnd: any = [];
    const {q, name} = searchModel;

    const user = this.getCurrentUser();
    const workspaceId =
      user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    if (q) {
    }

    if (name) {
      queryAnd.push({name});
    }

    queryAnd.push({workspace: new ObjectId(workspaceId)});

    return queryAnd.length > 0 ? {$and: queryAnd} : {};
  }

  public async create(createModel: WorkspaceAppCreateModel) {
    const user = this.getCurrentUser();
    const workspaceId =
      user?.currentWorkspace?.toHexString() || this.getHeaderWorkspace;

    const isDuplicate = await this.checkDuplicateName(createModel.name);
    if (isDuplicate) {
      throw new BadRequestException({
        code: 'workspaceApp_name_exists',
        payload: {key: 'workspaceApp_name_exists'}
      });
    }
    const prepCreateModel: any = {
      ...createModel,
      workspace: new ObjectId(workspaceId)
    };
    // TODO: do some validation here
    return this.workspaceAppRepository.create(prepCreateModel);
  }

  /**
   * check duplicate workspace app name
   * @param name     name
   * @param excludeId  _id
   */
  public async checkDuplicateName(name: string, excludeId?: string) {
    const query = {$and: []};
    if (name) {
      query.$and.push({name: name});
    }
    excludeId ? query.$and.push({_id: {$ne: excludeId}}) : {};
    const workspaceApp = await this.workspaceAppRepository.findOne(query);
    return !!workspaceApp;
  }

  /**
   * update workspace app
   * @param _id    _id
   * @param body   update model
   */
  public async update(_id, body) {
    const isDuplicate = await this.checkDuplicateName(body.name, _id);
    if (isDuplicate) {
      throw new BadRequestException({
        code: 'workspaceApp_name_exists',
        payload: {key: 'workspaceApp_name_exists'}
      });
    }
    return super.update(_id, body, {lean: true});
  }

  public prepPlatformTypeVersionKey(platformType: DevicePlatformType) {
    let updatingPlatformType: string;
    if (platformType === DevicePlatformType.IOS) {
      updatingPlatformType = 'productionIOS';
    } else if (platformType === DevicePlatformType.ANDROID) {
      updatingPlatformType = 'productionAndroid';
    }
    return updatingPlatformType;
  }

  public validateVersionNo(
    nextVersion: string,
    prevVersion: string,
    error = false
  ) {
    let valid = true;
    if (helpers.isValidVersion(nextVersion)) {
      valid = true;
    }
    if (nextVersion > prevVersion) {
      valid = true;
    } else if (nextVersion < prevVersion) {
      valid = false;
      // TODO: if error=true then throw relevant error message
      if (error) {
        throw new BadRequestException({code: 'err_greater_version_required'});
      }
    } else if (nextVersion === prevVersion) {
      valid = false;
      // TODO: if error=true then throw relevant error message
      if (error) {
        throw new BadRequestException({code: 'err_greater_version_required'});
      }
    }
    return valid;
  }

  public async releaseApp(
    appId: string,
    platformType: DevicePlatformType,
    nextReleaseData: NextReleaseInfoModel
  ) {
    const updatingPlatformType = this.prepPlatformTypeVersionKey(platformType);
    const workspaceApp = await this.findById(appId, {lean: true});
    if (!workspaceApp) {
      // throw error
    }
    let updatedWorkspaceApp: WorkspaceApp = workspaceApp;
    const prevVersionData: VersionInfoModel =
      workspaceApp?.[updatingPlatformType];
    const {nextVersionNo, nextVersionDescription} = nextReleaseData;
    const prevVersion = prevVersionData?.latestVersionNo;
    const nextVersion = nextVersionNo;
    const validVersion = this.validateVersionNo(nextVersion, prevVersion, true);
    if (validVersion) {
      updatedWorkspaceApp = await this.workspaceAppRepository.findByIdAndUpdate(
        appId,
        {
          [`${updatingPlatformType}`]: {
            ...prevVersionData,
            appId: nextReleaseData.appId,
            appIconLink: nextReleaseData.appIconLink,
            touchIcon: nextReleaseData.touchIcon,
            nextVersionNo: nextVersion,
            nextVersionDescription
          }
        },
        {new: true}
      );
    }

    return updatedWorkspaceApp;
  }

  /**
   * updates the workspace version
   * @param appId workspace app id
   * @param platformType platformType android | ios
   */
  public async launchApp(appId: string, platformType: DevicePlatformType) {
    const updatingPlatformType = this.prepPlatformTypeVersionKey(platformType);
    const workspaceApp = await this.findById(appId, {lean: true});
    if (!workspaceApp) {
      // throw error
    }
    const prevVersionData: VersionInfoModel =
      workspaceApp?.[updatingPlatformType];
    const updatingVersion = prevVersionData?.nextVersionNo;
    let updatedWorkspaceApp: WorkspaceApp = workspaceApp;
    if (updatingVersion) {
      // TODO: filter version history if required
      updatedWorkspaceApp = await this.workspaceAppRepository.findByIdAndUpdate(
        appId,
        {
          [`${updatingPlatformType}`]: {
            appId: prevVersionData?.appId,
            appIconLink: prevVersionData?.appIconLink,
            touchIcon: prevVersionData?.touchIcon,
            latestVersionNo: updatingVersion,
            latestVersionDescription: prevVersionData?.nextVersionDescription,
            nextVersionNo: null,
            nextVersionDescription: null,
            releaseDate: new Date(),
            history: [
              {
                version: prevVersionData?.latestVersionNo,
                releaseDate: prevVersionData?.releaseDate,
                description: prevVersionData?.latestVersionDescription || ''
              },
              ...(prevVersionData?.history ? [...prevVersionData?.history] : [])
            ]
          }
        },
        {new: true}
      );
    }
    return updatedWorkspaceApp;
  }
}
