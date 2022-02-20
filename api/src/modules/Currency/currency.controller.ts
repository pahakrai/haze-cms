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
import {CurrencyService} from './currency.service';

// models
import {
  CurrencyCreateModel,
  CurrencyUpdateModel,
  CurrencySearchModel
} from './models';

@Controller('currencies')
@UseFilters(HttpExceptionFilter)
export class CurrencyController extends BaseController {
  constructor(private readonly currencyService: CurrencyService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: CurrencyCreateModel) {
    return this.currencyService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: CurrencyUpdateModel
  ) {
    return this.currencyService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: CurrencySearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.currencyService.findWithPaginate(query);
      // do populates
      result.docs = await this.currencyService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.currencyService.find(query, {lean: true});
      // do populates
      result = await this.currencyService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.currencyService.findById(param._id, {lean: true});

    return this.currencyService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.currencyService.delete(param._id);
  }
}
