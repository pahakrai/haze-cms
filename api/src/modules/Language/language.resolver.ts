import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  // Mutation,
  Resolver,
  Parent,
  ResolveField
} from '@nestjs/graphql';
import {GqlLocaleDecorator, GraphQLExceptionFilter} from 'src/core';

import {LanguageService} from './language.service';

@Resolver('Language')
@UseFilters(GraphQLExceptionFilter)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() language) {
    if (!language.workspace) {
      return null;
    }
    const {workspace} = await this.languageService._populate(language, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('name')
  getName(@Parent() language, @GqlLocaleDecorator() locale) {
    return language.name[locale.getLanguage()];
  }

  @Query()
  async language(@Args('id') id: string) {
    return this.languageService.findById(id, {lean: true});
  }

  @Query()
  async languages(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.languageService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }
}
