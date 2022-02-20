import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {helpers} from '@golpasal/common';

import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {BadRequestException, RandomHelper} from 'src/core';

// interfaces & models
import {
  WorkspaceCreateModel,
  WorkspaceUpdateModel,
  WorkspaceSearchModel
} from './models';
import {Workspace, WorkspaceModel} from './interfaces';

export const ContactTypes = {
  SUPPORT: 'support'
};

@Injectable({scope: Scope.REQUEST})
export class WorkspaceService extends BaseCRUDService<
  Workspace,
  WorkspaceCreateModel,
  WorkspaceUpdateModel,
  WorkspaceSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Workspaces')
    private readonly workspaceRepository: WorkspaceModel
  ) {
    super(workspaceRepository, request);
  }

  public _castQuery(searchModel: WorkspaceSearchModel) {
    const {q, code, status} = searchModel;
    const query: any = {
      $and: []
    };
    if (q && q !== 'undefined' && q !== 'null') {
      const $or = [];
      $or.push({
        code: {$regex: q, $options: 'i'}
      });
      $or.push({
        name: {$regex: q, $options: 'i'}
      });
      query.$and.push({$or});
    }
    if (status === 0 || status) {
      query.$and.push({status});
    }
    if (code) {
      query.$and.push({code: {$regex: code, $options: 'i'}});
    }
    if (query.$and && query.$and.length === 0) {
      delete query.$and;
    }

    return query;
  }

  /**
   * create workspace
   * @param body
   */
  public async createWorkspace(body: WorkspaceCreateModel) {
    const isDuplicate = await this.checkDuplicateCodeOrName(
      body.code,
      body.name
    );
    if (isDuplicate) {
      throw new BadRequestException({
        code: 'err_required',
        payload: {key: 'workspace_exists'}
      });
    }
    if (body?.integrations?.length > 0) {
      body.integrations.forEach(ig => {
        if (ig?.app === '') {
          throw new Error('the app can`t Empty');
        }
        ig.hooks.forEach(hook => {
          if (!hook.method) {
            throw new Error('the method can`t Empty');
          }
        });
      });
    }

    const secret = RandomHelper.randomString('string', 8);
    return super.create({...body, secret: secret}, {lean: true});
  }

  /**
   * check workspace code or name
   * @param code  code
   * @param name  name
   * @param excludeId    id
   */
  public async checkDuplicateCodeOrName(
    code: string,
    name: string,
    excludeId?: string
  ) {
    const query = {$and: []};
    const $or = [];
    if (code) {
      $or.push({code: code});
    }
    if (name) {
      $or.push({name: name});
    }
    excludeId ? query.$and.push({_id: {$ne: excludeId}}) : {};
    query.$and.push({$or});
    if (!$or.length) delete query.$and;
    const workspace = await this.workspaceRepository.findOne(query);
    return !!workspace;
  }

  // Find workspace by code
  public async findByCode(code: string) {
    return this.findOne({code});
  }

  public async getWorkspaceByCurrentUser(user) {
    return super.findById(user.currentWorkspace);
  }

  /**
   * get user's current workspace
   */
  public async getMyCurrentWorkspace() {
    return this.getCurrentWorkspace<Workspace>();
  }

  /**
   * get workspace social links
   */
  public async getSocialLinks(id: string) {
    const workspace = await this.findById(id);
    return workspace?.socialLinks;
  }

  /**
   * get workspace marketing object
   */
  public async getMarketing(id: string) {
    const workspace = await this.findById(id);
    return workspace?.marketing;
  }

  /**
   * get parameters of workspace
   *
   * @param param workspace field values type
   */
  public async getParameters(param: string, workspaceId?: string) {
    const wsId =
      this.getCurrentUser()?.currentWorkspace ||
      workspaceId ||
      this.getHeaderWorkspace();
    // not found, find in cache
    const workspace = await this.repository
      .findById(wsId)
      // populate to get the fileMeta uri or thumbnailUri
      .populate('setting.logo')
      .populate('setting.favicon')
      .populate('setting.headerLogo')
      .populate('setting.loginBackgroundImage')
      .lean(true);

    const setting: any = workspace?.setting || {};

    // if the setting exist, map out the uri of each setting key
    // if the uri key exist as well and if the populate is success
    // for each setting keys hence check if it is object first
    Object.keys(setting)?.map(key => {
      if (
        setting?.[key] &&
        typeof setting?.[key] === 'object' &&
        'uri' in setting?.[key]
      ) {
        setting[key] = setting[key]['uri'];
      }
    });
    // update the setting
    workspace.setting = setting;
    // return the workspace field value eg: setting, seoMeta, socialLinks
    return workspace[param];
  }

  public async getWorkspaceContact(wsId: string, type?: string) {
    const wsType = type || ContactTypes.SUPPORT;
    const contacts = await this.getParameters('contacts', wsId);
    return contacts?.find(c => c?.department === wsType) || contacts?.[0];
  }

  public async getWorkspaceSafeKey(_id: string) {
    const workspace = await this.findById(_id, {lean: true});

    if (!workspace) throw new BadRequestException({});

    const {'safe-key': safeKey, ...rest} = helpers.getAPIHeader(
      _id,
      workspace.secret
    );

    return {safeKey, secret: workspace.secret, ...rest};
  }

  /**
   * update workspace by id
   * @param _id         workspace id
   * @param updateModel  updateModel
   */
  public async updateWorkspace(_id: string, updateModel: WorkspaceUpdateModel) {
    const isDuplicate = await this.checkDuplicateCodeOrName(
      updateModel.code,
      updateModel.name,
      _id
    );
    if (isDuplicate) {
      throw new BadRequestException({
        code: 'err_required',
        payload: {key: 'workspace_exists'}
      });
    }

    if (updateModel?.integrations?.length > 0) {
      updateModel.integrations.forEach(ig => {
        if (ig?.app === '') {
          throw new Error('the app can`t Empty');
        }
        ig.hooks.forEach(hook => {
          if (hook?.method === '') {
            throw new Error('the method can`t Empty');
          }
        });
      });
    }
    return super.update(_id, updateModel);
  }
}
