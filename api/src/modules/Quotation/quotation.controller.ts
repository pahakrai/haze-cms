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
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {QuotationService} from './quotation.service';

// models
import {
  QuotationSearchModel,
  QuotationOrderModel,
  QuotationformCreateModel,
  QuotationFormUpdateModel
} from './models';

@RequireLogin()
@Controller('quotations')
@UseFilters(HttpExceptionFilter)
export class QuotationController extends BaseController {
  constructor(private readonly quotationService: QuotationService) {
    super();
  }

  @Post()
  public async create(@Body() body: QuotationformCreateModel) {
    return this.quotationService.createQuotation(body);
  }

  @Post('toOrder/:_id')
  public async convertToOrder(
    @Param() param: ParamIdModel,
    @Body() body: QuotationOrderModel
  ) {
    return this.quotationService.convertToOrder(param._id, body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: QuotationFormUpdateModel
  ) {
    return this.quotationService.updateQuotation(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: QuotationSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.quotationService.findWithPaginate(query);
      // do populates
      result.docs = await this.quotationService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.quotationService.find(query, {lean: true});
      // do populates
      result = await this.quotationService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.quotationService.findById(param._id, {
      lean: true
    });

    return this.quotationService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.quotationService.delete(param._id);
  }
}
