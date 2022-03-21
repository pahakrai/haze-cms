import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {
  UserTypes,
  CurrentUser,
  RequireLogin,
  ParamIdModel,
  BaseController,
  HttpExceptionFilter
} from 'src/core';
import common from '@golpasal/common';

import {WorkspaceInterceptor} from 'src/core/interceptors';

// services
import {MemberService} from './member.service';

// models
import {
  MemberSearchModel,
  MemberUserModel,
  MemberUserUpdateModel
} from './models';
import {AddressCreateModel, AddressUpdateModel} from '../Address/models';

const {UserType} = common.type;
const {UserStatus} = common.status;

@Controller('members')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class MemberController extends BaseController {
  constructor(private readonly memberService: MemberService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() memberUserModel: MemberUserModel) {
    return this.memberService.signUp(memberUserModel);
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() memberUserModel: MemberUserUpdateModel
  ) {
    return this.memberService.updateUserMember(param._id, memberUserModel);
  }

  @Get()
  @RequireLogin()
  public async find(@Query() query: MemberSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.memberService.findWithPaginate(query);
      // do populates
      result.docs = await this.memberService._populate(result.docs, populates);
    } else {
      result = await this.memberService.find(query);
      // do populates
      result = await this.memberService._populate(result, populates);
    }

    return result;
  }

  // NOTE: FOR ORGANIZATION SELECT FIELD ON FRONTEND WITH MINIMUM FIELDS
  @Get('organizations')
  public async getMemberOrganizations(@Query() query: MemberSearchModel) {
    let result: any;
    const fieldMaps = ['organizationName', 'user'];
    const {paginate} = query;
    if (paginate) {
      result = await this.memberService.findWithPaginate(query);
      result.docs = result.docs.map(d =>
        fieldMaps.reduce((obj, field) => ({...obj, [field]: d[field]}), {})
      );
    } else {
      result = await this.memberService.find(query);
      result = result.map(d =>
        fieldMaps.reduce((obj, field) => ({...obj, [field]: d[field]}), {})
      );
    }
    return result;
  }

  @Get('total-member-count')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async memberCount() {
    const count = await this.memberService.getMemberStats(
      'MEMBER_COUNT_USER_STATUS',
      {
        userStatuses: [UserStatus.ACTIVE]
      }
    );
    return {total: count.total};
  }

  @Get('statistics-member')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async statisticsMember() {
    const result = await this.memberService.statisticsMember(
      'COUNT_TOTAL_MEMBERS',
      {}
    );
    return {total: result};
  }

  @Get('my-addresses')
  @RequireLogin()
  public async getMyAddresses(@CurrentUser() user, @Query() query?) {
    return this.memberService.getAddressByUserId(
      user?._id?.toHexString(),
      query || {}
    );
  }

  @Get('user-requirements/:requirementType')
  public async getRequirements(
    @Param() param: ParamIdModel & {requirementType: string}
  ) {
    return this.memberService.getRequirements(param?.requirementType);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.memberService.findById(param._id, {lean: true});

    return this.memberService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.memberService.delete(param._id);
  }

  /**  create current user address (token) */
  @Post('/create-my-address')
  @RequireLogin()
  public async createMyAddress(
    @Body() body: AddressCreateModel,
    @CurrentUser() user
  ) {
    return this.memberService.createAddressByUserId(user?._id?.toHexString(), {
      ...body
    });
  }

  /**  update current user address (token) */
  @Put('/update-my-address/:addressId')
  @RequireLogin()
  public async updateMyAddress(
    @Param() param: ParamIdModel & {addressId: string},
    @Body() body: AddressUpdateModel,
    @CurrentUser() user
  ) {
    return this.memberService.updateAddressByUserId(
      user?._id?.toHexString(),
      param?.addressId,
      {...body}
    );
  }

  @Put('/my-default-address/:addressId')
  @RequireLogin()
  public async myDefaultAddress(
    @Param() param: ParamIdModel & {addressId: string},
    @CurrentUser() user
  ) {
    return this.memberService.setDefaultAddress(
      user?._id?.toHexString(),
      param?.addressId
    );
  }

  @Delete('/delete-address/:addressId')
  @RequireLogin()
  public async deleteMyAddress(
    @Param() param: ParamIdModel & {addressId?: string},
    @CurrentUser() user
  ) {
    return this.memberService.deleteAddressByAddressId(
      user?._id?.toHexString(),
      param?.addressId
    );
  }
}
