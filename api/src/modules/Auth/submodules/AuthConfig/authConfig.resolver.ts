import {UseFilters} from '@nestjs/common';
import {Args, Query, Mutation, Resolver} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {AuthConfigService} from './authConfig.service';

@Resolver('AuthConfig')
@UseFilters(GraphQLExceptionFilter)
export class AuthConfigResolver {
  constructor(private readonly authConfigService: AuthConfigService) {}

  @Query()
  async authConfig(@Args('id') id: string) {
    return this.authConfigService.findById(id, {lean: true});
  }

  @Query()
  async authConfigs(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.authConfigService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createAuthConfig(@Args('authConfigCreateModel') authConfigCreateModel) {
    return this.authConfigService.create(authConfigCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateAuthConfig(
    @Args('id') id: string,
    @Args('authConfigUpdateModel') authConfigUpdateModel
  ) {
    return this.authConfigService.update(id, authConfigUpdateModel, {
      lean: true
    });
  }
}
