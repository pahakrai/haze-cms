import {
  Get,
  Put,
  Body,
  Post,
  Patch,
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
import {CustomerEnquiryService} from './customerEnquiry.service';

// models
import {
  CustomerEnquiryCreateModel,
  CustomerEnquiryUpdateModel,
  CustomerEnquirySearchModel
} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@Controller('customer-enquiries')
@UseFilters(HttpExceptionFilter)
export class CustomerEnquiryController extends BaseController {
  constructor(private readonly customerEnquiryService: CustomerEnquiryService) {
    super();
  }

  @Post()
  public async create(@Body() body: CustomerEnquiryCreateModel) {
    return this.customerEnquiryService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: CustomerEnquiryUpdateModel
  ) {
    return this.customerEnquiryService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: CustomerEnquirySearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.customerEnquiryService.findWithPaginate(query);
      // do populates
      result.docs = await this.customerEnquiryService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.customerEnquiryService.find(query, {lean: true});
      // do populates
      result = await this.customerEnquiryService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.customerEnquiryService.findById(param._id, {
      lean: true
    });

    return this.customerEnquiryService._populate(
      result,
      query?.populates || []
    );
  }

  /**
   * update isFollow whoFollow followTime by id
   * @param param id
   */
  @Patch(':_id/updateToFollow')
  public async updateToFollow(@Param() param: ParamIdModel) {
    return this.customerEnquiryService.updateToFollow(param._id);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.customerEnquiryService.delete(param._id);
  }
}
