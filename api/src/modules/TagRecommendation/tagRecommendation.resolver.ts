import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  // Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';
import {TagRecommendationService} from './tagRecommendation.service';

@Resolver('TagRecommendation')
@UseFilters(GraphQLExceptionFilter)
export class TagRecommendationResolver {
  constructor(
    private readonly tagRecommendationService: TagRecommendationService
  ) {}

  // Example for resolve field (populate field)
  @ResolveField('workspace')
  async getWorkspace(@Parent() tagRecommendation) {
    if (!tagRecommendation.workspace) {
      return null;
    }

    const {
      workspace
    } = await this.tagRecommendationService._populate(tagRecommendation, [
      'workspace'
    ]);

    return workspace;
  }

  @Query()
  async tagRecommendation(@Args('id') id: string) {
    return this.tagRecommendationService.findById(id, {lean: true});
  }

  @Query()
  async tagRecommendations(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.tagRecommendationService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  // @Mutation()
  // @RequireLogin()
  // async createTagRecommendation(
  //   @Args('tagRecommendationCreateModel') tagRecommendationCreateModel
  // ) {
  //   return this.tagRecommendationService.create(tagRecommendationCreateModel, {
  //     lean: true
  //   });
  // }

  // @Mutation()
  // @RequireLogin()
  // async updateTagRecommendation(
  //   @Args('id') id: string,
  //   @Args('tagRecommendationUpdateModel') tagRecommendationUpdateModel
  // ) {
  //   return this.tagRecommendationService.update(
  //     id,
  //     tagRecommendationUpdateModel,
  //     {lean: true}
  //   );
  // }
}
