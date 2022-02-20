import {UseFilters} from '@nestjs/common';
import {Args, Query, Mutation, Resolver} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {WebMenuService} from './webMenu.service';

@Resolver('WebMenu')
@UseFilters(GraphQLExceptionFilter)
export class WebMenuResolver {
  constructor(private readonly webMenuService: WebMenuService) {}

  @Query()
  async webMenu(@Args('id') id: string) {
    return this.webMenuService.findById(id, {lean: true});
  }

  @Query()
  async webMenus(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.webMenuService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createWebMenu(@Args('webMenuCreateModel') webMenuCreateModel) {
    return this.webMenuService.create(webMenuCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateWebMenu(
    @Args('id') id: string,
    @Args('webMenuUpdateModel') webMenuUpdateModel
  ) {
    return this.webMenuService.update(id, webMenuUpdateModel, {lean: true});
  }
}
