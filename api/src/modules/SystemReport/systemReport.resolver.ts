import {UseFilters} from '@nestjs/common';
import {Args, Query, Mutation, Resolver} from '@nestjs/graphql';

import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {SystemReportService} from './systemReport.service';

@Resolver('SystemReport')
@UseFilters(GraphQLExceptionFilter)
export class SystemReportResolver {
  constructor(private readonly systemReportService: SystemReportService) {}

  // Example for resolve field (populate field)
  // @ResolveField('abc')
  // async getAbc(@Parent() systemReport) {
  //   if (!systemReport.abc) {
  //     return null;
  //   }
  //
  //   const {abc} = await this.systemReportService._populate(systemReport, ['abc']);
  //
  //   return abc
  // }

  @Query()
  async systemReport(@Args('id') id: string) {
    return this.systemReportService.findById(id, {lean: true});
  }

  @Query()
  async systemReports(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.systemReportService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createSystemReport(
    @Args('systemReportCreateModel') systemReportCreateModel
  ) {
    return this.systemReportService.create(systemReportCreateModel, {
      lean: true
    });
  }

  @Mutation()
  @RequireLogin()
  async updateSystemReport(
    @Args('id') id: string,
    @Args('systemReportUpdateModel') systemReportUpdateModel
  ) {
    return this.systemReportService.update(id, systemReportUpdateModel, {
      lean: true
    });
  }
}
