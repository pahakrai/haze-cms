import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {AddressService} from './address.service';

// models
import {
  AddressCreateModel,
  AddressUpdateModel,
  AddressSearchModel
} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@Controller('addresss')
@UseFilters(HttpExceptionFilter)
export class AddressController extends BaseController {
  constructor(private readonly addressService: AddressService) {
    super();
  }

  @Post()
  public async create(@Body() body: AddressCreateModel) {
    return this.addressService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: AddressUpdateModel
  ) {
    return this.addressService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: AddressSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.addressService.findWithPaginate(query);
      // do populates
      result.docs = await this.addressService._populate(result.docs, populates);
    } else {
      result = await this.addressService.find(query, {lean: true});
      // do populates
      result = await this.addressService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.addressService.findById(param._id, {lean: true});

    return this.addressService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.addressService.delete(param._id);
  }
}
