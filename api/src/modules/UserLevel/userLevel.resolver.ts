import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {
  GqlLocaleDecorator,
  GraphQLExceptionFilter,
  RequireLogin
} from 'src/core';
import {UserLevelService} from './userLevel.service';

@Resolver('UserLevel')
@UseFilters(GraphQLExceptionFilter)
export class UserLevelResolver {
  constructor(private readonly userLevelService: UserLevelService) {}

  @ResolveField('name')
  getName(@Parent() userLevel, @GqlLocaleDecorator() locale) {
    return userLevel.name[locale.getLanguage()];
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() userLevel) {
    if (!userLevel.workspace) {
      return null;
    }
    const {workspace} = await this.userLevelService._populate(userLevel, [
      'workspace'
    ]);
    return workspace;
  }

  @Query()
  async userLevel(@Args('id') id: string) {
    return this.userLevelService.findById(id, {lean: true});
  }

  @Query()
  @RequireLogin()
  async userLevels(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.userLevelService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createUserLevel(@Args('userLevelCreateModel') userLevelCreateModel) {
    return this.userLevelService.create(userLevelCreateModel);
  }

  @Mutation()
  @RequireLogin()
  async updateUserLevel(
    @Args('id') id: string,
    @Args('userLevelUpdateModel') userLevelUpdateModel
  ) {
    return this.userLevelService.update(id, userLevelUpdateModel);
  }
}
