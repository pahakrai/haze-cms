import {Injectable, Inject, BadRequestException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {ParamCreateModel, ParamUpdateModel, ParamSearchModel} from './models';
import {Param, ParamModel} from './interfaces';
import {CacheService} from '../Cache/cache.service';

@Injectable()
export class ParamService extends BaseCRUDService<
  Param,
  ParamCreateModel,
  ParamUpdateModel,
  ParamSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Params') private readonly paramRepository: ParamModel,
    private readonly cacheService: CacheService
  ) {
    super(paramRepository, request);
  }

  /**
   * get param.parameters from cache/db
   *
   * @param type param.type
   * @param workspace workspace id  (optional)
   */
  public async getParameter(type: string, workspace = null) {
    const conditons = {type, ...(workspace ? {workspace: workspace} : {})};

    // find in cache first
    const parameters = await this.cacheService.get(JSON.stringify(conditons));

    // found in cache, JSON.parse and return
    if (parameters) {
      return JSON.parse(parameters);
    }

    // not found, find in cache
    const param = await this.findOne(conditons, {lean: true});

    if (!param) {
      throw new BadRequestException({
        code: 'err_param_not_found'
      });
    }
    //save to cache
    await this.cacheService.set(
      JSON.stringify(conditons),
      JSON.stringify(param.parameters),
      86400000
    );

    return param.parameters;
  }

  public _castQuery(searchModel: ParamSearchModel) {
    const query: any = {};
    const {type, types, workspace} = searchModel;

    if (type) {
      query.type = type;
    }
    if (types?.length > 0) {
      query.type = {$in: types};
    }
    if (workspace) {
      query.workspace = workspace;
    }

    return query;
  }

  // Override
  public async create(createModel: ParamCreateModel) {
    const param = await super.create(createModel, {lean: true});

    // update cache
    await this.cacheService.set(param.type, JSON.stringify(param.parameters));

    return param;
  }

  public async getSupportContact() {
    const param = await this.getParameter('company_info');

    let contact = {email: '', phone: ''};
    if (param.contact) {
      contact = param.contact.find(contact => contact.type === 'support');
    }
    return contact;
  }

  /**
   * find feed back selection base on workspace
   */
  public async paramFeedbackSelection() {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    if (!workspaceId) {
      throw new BadRequestException({
        code: 'err_workspace_not_found!'
      });
    }
    return this.getParameter('feedback_selection', workspaceId);
  }

  // Override
  public async update(_id: string, updateModel: ParamUpdateModel) {
    const param = await super.update(_id, updateModel);

    // update cache
    await this.cacheService.set(param.type, JSON.stringify(param.parameters));

    return param;
  }
}
