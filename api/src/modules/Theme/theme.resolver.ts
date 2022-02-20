import {UseFilters} from '@nestjs/common';
import {Args, Query, Mutation, Resolver} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {ThemeService} from './theme.service';

@Resolver('Theme')
@UseFilters(GraphQLExceptionFilter)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Query()
  async theme(@Args('id') id: string) {
    return this.themeService.findById(id, {lean: true});
  }

  @Query()
  async themes(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.themeService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createTheme(@Args('themeCreateModel') themeCreateModel) {
    return this.themeService.create(themeCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateTheme(
    @Args('id') id: string,
    @Args('themeUpdateModel') themeUpdateModel
  ) {
    return this.themeService.update(id, themeUpdateModel, {lean: true});
  }
}
