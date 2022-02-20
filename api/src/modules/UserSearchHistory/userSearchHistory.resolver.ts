import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GqlCurrentUser, GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {UserSearchHistoryService} from './userSearchHistory.service';

@RequireLogin()
@Resolver('UserSearchHistory')
@UseFilters(GraphQLExceptionFilter)
export class UserSearchHistoryResolver {
  constructor(
    private readonly userSearchHistoryService: UserSearchHistoryService
  ) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() userSearchHistory) {
    if (!userSearchHistory.workspace) {
      return null;
    }

    const {
      workspace
    } = await this.userSearchHistoryService._populate(userSearchHistory, [
      'workspace'
    ]);

    return workspace;
  }

  @ResolveField('user')
  async getUser(@Parent() userSearchHistory) {
    if (!userSearchHistory.user) {
      return null;
    }

    const {
      user
    } = await this.userSearchHistoryService._populate(userSearchHistory, [
      'user'
    ]);

    return user;
  }

  @Query()
  async mySearchHistory(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {},
    @GqlCurrentUser() currentUser
  ) {
    return this.userSearchHistoryService.findWithCursorPaginate(
      {...query, user: currentUser._id.toHexString()},
      {
        ...paginate,
        ...options
      }
    );
  }

  @Mutation()
  async clearMySearchHistory() {
    try {
      await this.userSearchHistoryService.clearMySearchHistory();
      return true;
    } catch {
      return false;
    }
  }

  @Mutation()
  async deleteSearchHistory(@Args('id') id: string) {
    try {
      await this.userSearchHistoryService.delete(id);
      return true;
    } catch {
      return false;
    }
  }
}
