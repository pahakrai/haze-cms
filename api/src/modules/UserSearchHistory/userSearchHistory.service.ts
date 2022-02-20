import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {
  // ForbiddenException,
  // BadRequestException,
  MongooseOption
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  UserSearchHistoryCreateModel,
  UserSearchHistoryUpdateModel,
  UserSearchHistorySearchModel
} from './models';
import {UserSearchHistory, UserSearchHistoryModel} from './interfaces';
import {IUser} from '../User/interfaces';

@Injectable({scope: Scope.REQUEST})
export class UserSearchHistoryService extends BaseCRUDService<
  UserSearchHistory,
  UserSearchHistoryCreateModel,
  UserSearchHistoryUpdateModel,
  UserSearchHistorySearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('UserSearchHistories')
    private readonly userSearchHistoryRepository: UserSearchHistoryModel
  ) {
    super(userSearchHistoryRepository, request);
  }

  public _castQuery(searchModel: UserSearchHistorySearchModel) {
    const query: any = {};
    const {q, text, user} = searchModel;
    const currentUser = this.getCurrentUser<IUser>();

    query.workspace =
      currentUser?.currentWorkspace || this.getHeaderWorkspace();

    if (q) {
      query.text = new RegExp(q, 'i');
    }
    if (text) {
      query.text = text;
    }
    if (user) {
      query.user = user;
    }

    return query;
  }

  // Override
  public async create(
    model: UserSearchHistoryCreateModel,
    options?: MongooseOption
  ) {
    const user = this.getCurrentUser<IUser>();

    // only logined user can insert history
    if (!user) return null;

    // check any duplicate record
    const history = await this.findOne({
      text: model.text,
      user: user._id.toHexString()
    });
    if (history) {
      // update document's updatedAt to make it more 'recent'
      return this.update(history._id, {text: model.text});
    }

    // append user and workspace
    return super.create(
      {
        ...model,
        user: user._id.toHexString(),
        workspace: user.currentWorkspace.toHexString()
      },
      options
    );
  }

  /**
   * clear user search history
   */
  public async clearMySearchHistory() {
    const user = this.getCurrentUser<IUser>();

    await this.userSearchHistoryRepository
      .deleteMany({user: user._id})
      .session(this.getMongoSession())
      .exec();

    return true;
  }

  /**
   * get current user's search history, sort by createdAt desc
   * @param option mongoose option
   */
  public async findMySearchHistory(
    query: UserSearchHistorySearchModel,
    option: MongooseOption
  ) {
    const user = this.getCurrentUser<IUser>();

    return super.find(
      {...query, user: user._id.toHexString()},
      {sort: {updatedAt: -1}, limit: option.limit, lean: true}
    );
  }
}
