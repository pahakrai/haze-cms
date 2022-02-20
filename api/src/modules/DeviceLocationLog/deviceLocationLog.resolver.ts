import {UseFilters} from '@nestjs/common';
import {Resolver, Args, Query, Mutation} from '@nestjs/graphql';
import common from '@golpasal/common';

import {GraphQLExceptionFilter, UserTypes} from 'src/core';
import {DeviceLocationLogService} from './deviceLocationLog.service';

const {UserType} = common.type;

@UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
@Resolver('DeviceLocationLog')
@UseFilters(GraphQLExceptionFilter)
export class DeviceLocationLogResolver {
  constructor(
    private readonly deviceLocationLogService: DeviceLocationLogService
  ) {}

  @Query()
  async deviceLocationLog(@Args('id') id: string) {
    return this.deviceLocationLogService.findById(id);
  }

  @Query()
  async deviceLocationLogs(@Args('query') query, @Args('paginate') paginate) {
    return this.deviceLocationLogService.findWithCursorPaginate(
      query,
      paginate
    );
  }

  @Mutation()
  async createDeviceLocationLog(
    @Args('deviceLocationLogCreateModel') deviceLocationLogCreateModel
  ) {
    return this.deviceLocationLogService.create(deviceLocationLogCreateModel);
  }

  @Mutation()
  async updateDeviceLocationLog(
    @Args('id') id: string,
    @Args('deviceLocationLogUpdateModel') deviceLocationLogUpdateModel
  ) {
    return this.deviceLocationLogService.update(
      id,
      deviceLocationLogUpdateModel
    );
  }
}
