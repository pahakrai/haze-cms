import {UseFilters, UseInterceptors} from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  GqlLocaleDecorator,
  RequireLogin
} from 'src/core';
import {DashboardService} from './dashboard.service';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Resolver('Dashboard')
@UseFilters(GraphQLExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @ResolveField('title')
  async getTitle(@Parent() dashboard, @GqlLocaleDecorator() locale) {
    if (!dashboard.title) {
      return null;
    }
    return dashboard?.title[locale.getLanguage()];
  }

  @Query()
  async dashboard(@Args('id') id: string) {
    return this.dashboardService.findById(id);
  }

  @Query()
  async dashboards(@Args('query') query) {
    return this.dashboardService.find(query);
  }

  @Mutation()
  @RequireLogin()
  async createDashboard(@Args('dashboardCreateModel') dashboardCreateModel) {
    return this.dashboardService.create(dashboardCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateDashboard(
    @Args('id') id: string,
    @Args('dashboardUpdateModel') dashboardUpdateModel
  ) {
    return this.dashboardService.update(id, dashboardUpdateModel, {lean: true});
  }
}
