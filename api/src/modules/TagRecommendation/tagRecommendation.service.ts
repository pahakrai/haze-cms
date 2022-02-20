import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService, MongooseOption} from 'src/core';

// interfaces & models
import {
  TagRecommendationCreateModel,
  TagRecommendationUpdateModel,
  TagRecommendationSearchModel
} from './models';
import {TagRecommendation, TagRecommendationModel} from './interfaces';
import {IUser} from '../User';

@Injectable({scope: Scope.REQUEST})
export class TagRecommendationService extends BaseCRUDService<
  TagRecommendation,
  TagRecommendationCreateModel,
  TagRecommendationUpdateModel,
  TagRecommendationSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('TagRecommendations')
    private readonly tagRecommendationRepository: TagRecommendationModel
  ) {
    super(tagRecommendationRepository, request);
  }

  public _castQuery(searchModel: TagRecommendationSearchModel) {
    const query: any = {};
    let workspace: string;
    const {q, type, texts} = searchModel;
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    if (q) {
      query.text = new RegExp(q, 'i');
    }
    if (Array.isArray(texts) && texts.length) {
      query.text = {$in: texts};
    }
    if (type) {
      query.type = type;
    }
    query.workspace = workspace ? workspace : null;

    return query;
  }

  // Override
  public async create(
    model: TagRecommendationCreateModel,
    options?: MongooseOption
  ) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else {
      workspace = this.getHeaderWorkspace();
    }

    return super.create({...model, workspace}, options);
  }
}
