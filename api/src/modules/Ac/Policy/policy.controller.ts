import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Query,
  Get,
  Delete
} from '@nestjs/common';
import common from '@golpasal/common';

import {UserTypes} from 'src/core';

// interfaces
import {ParamIdModel} from 'src/core/models/param.id.model';
import {BaseController} from 'src/core/layers/base.controller';

// services
import {PolicyService} from './policy.service';
import {
  PolicyCreateModel,
  PolicyUpdateModel,
  PolicySearchModel
} from './models';
import {CurrentUser, RequireLogin} from 'src/core/decorators';

const {UserType} = common.type;
@RequireLogin()
@Controller('policies')
export class PolicyController extends BaseController {
  constructor(private policyService: PolicyService) {
    super();
  }

  @Post()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async create(@Body() body: PolicyCreateModel) {
    return this.policyService.create(body);
  }

  @Put(':_id')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: PolicyUpdateModel
  ) {
    return this.policyService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: PolicySearchModel, @CurrentUser() user) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.policyService.findWithPaginate({
        ...query,
        workspace: user.currentWorkspace
      });
      // do populates
      result.docs = await this.policyService._populate(result.docs, populates);
    } else {
      result = await this.policyService.find({
        ...query,
        workspace: user.currentWorkspace
      });
      // do populates
      result = await this.policyService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.policyService.findById(param._id);

    return this.policyService._populate(result, query ? query.populates : []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.policyService.delete(param._id);
  }
}
