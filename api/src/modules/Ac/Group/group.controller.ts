import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Put
} from '@nestjs/common';
// core
import {AC} from 'src/core/decorators';
import {ParamIdModel} from 'src/core/models/param.id.model';
import {BaseController} from 'src/core/layers/base.controller';
import common from '@golpasal/common';

// modules
import {GroupService} from './group.service';
import {GroupCreateModel, GroupUpdateModel, GroupSearchModel} from './models';

import {CurrentUser, RequireLogin} from 'src/core/decorators';

const {PolicyType} = common.type;

@RequireLogin()
@Controller('groups')
export class GroupController extends BaseController {
  constructor(private readonly groupService: GroupService) {
    super();
  }

  /**
   * Duplicate id
   * @param req request
   * @param res response
   * @param param._id
   */
  @Get('duplicate-name/:name/:_id')
  public async duplicateName(@Param() param) {
    const isDuplicate = await this.groupService.duplicateName(
      param.name,
      param.id
    );
    return isDuplicate;
  }

  @Post()
  public async create(@Body() body: GroupCreateModel, @CurrentUser() user) {
    return this.groupService.create({
      ...body,
      workspace: user.currentWorkspace
    });
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: GroupUpdateModel
  ) {
    return this.groupService.update(param._id, body);
  }

  @Get()
  public async find(
    @Query() query: GroupSearchModel,
    @CurrentUser() user,
    @AC() ac
  ) {
    let result: any;
    const {populates, paginate} = query;
    let actions = null;
    // get actions of current user
    if (user && user._id) {
      actions = {
        allows: await ac.getUserAllowedActions(
          user.currentWorkspace.toHexString(),
          user._id.toString()
        ),
        denies: await ac.getUserDeniedActions(
          user.currentWorkspace.toHexString(),
          user._id.toString()
        )
      };
    }

    const systemPolicies = [
      PolicyType.SYSTEM_ADMINISTRATOR,
      PolicyType.SYSTEM_SUPPORT
    ].filter(p => actions.allows.includes(p));

    // const systemPolicies = actions.allows.filter(a =>
    //   [PolicyType.SYSTEM_ADMINISTRATOR, PolicyType.SYSTEM_SUPPORT].includes(a)
    // );
    // check user allow to get group contain system polices
    if (systemPolicies.length === 0) {
      const polices = await ac.getPoliciesByActions(
        [PolicyType.SYSTEM_ADMINISTRATOR, PolicyType.SYSTEM_SUPPORT],
        {
          workspaceAccessFilter: false,
          workspaceTypesFilter: false
        }
      );

      query = {
        ...query,
        policiesNotIn: polices?.map(p => p._id.toHexString())
      };
    } else {
      // PolicyType.SYSTEM_ADMINISTRATOR or PolicyType.SYSTEM_SUPPORT
      // if user only contain PolicyType.SYSTEM_SUPPORT,
      // then this user is not allow to access PolicyType.SYSTEM_ADMINISTRATOR
      if (!actions.allows.includes(PolicyType.SYSTEM_ADMINISTRATOR)) {
        const polices = await ac.getPoliciesByActions(
          [PolicyType.SYSTEM_ADMINISTRATOR],
          {
            workspaceAccessFilter: false,
            workspaceTypesFilter: false
          }
        );

        query = {
          ...query,
          policiesNotIn: polices?.map(p => p._id.toHexString())
        };
      }
    }

    if (String(paginate) === 'true') {
      result = await this.groupService.findWithPaginate({
        ...query,
        workspace: user?.currentWorkspace
      });
      // do populates
      result.docs = await this.groupService._populate(result.docs, populates);
    } else {
      result = await this.groupService.find({
        ...query,
        workspace: user?.currentWorkspace
      });
      // do populates
      result = await this.groupService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.groupService.findById(param._id);

    return this.groupService._populate(result, query ? query.populates : []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.groupService.delete(param._id);
  }
}
