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

import {RequireLogin} from 'src/core';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {PricingService} from './pricing.service';

// models
import {
  PricingCreateModel,
  PricingUpdateModel,
  PricingSearchModel
} from './models';
import {PricingAdjustmentSearchModel} from './submodules/PricingAdjustment/models';
import {PricingAdjustmentService} from './submodules/PricingAdjustment/pricingAdjustment.service';

import {PricingServiceSearchModel} from './submodules/PricingService/models';
import {PricingServiceService} from './submodules/PricingService/pricingService.service';

@RequireLogin()
@Controller('pricings')
@UseFilters(HttpExceptionFilter)
export class PricingController extends BaseController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly pricingServiceSevice: PricingServiceService,
    private readonly pricingAdjustmentService: PricingAdjustmentService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: PricingCreateModel) {
    return this.pricingService.create(body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: PricingUpdateModel
  ) {
    return this.pricingService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: PricingSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.pricingService.findWithPaginate(query);
      // do populates
      result.docs = await this.pricingService._populate(result.docs, populates);
    } else {
      result = await this.pricingService.find(query);
      // do populates
      result = await this.pricingService._populate(result, populates);
    }

    return result;
  }

  @Get('adjustments')
  public async findAdjustmentPricings(
    @Query() searchModel: PricingAdjustmentSearchModel
  ) {
    let result: any;
    const {populates, paginate} = searchModel;

    if (paginate) {
      result = await this.pricingAdjustmentService.findWithPaginate(
        searchModel
      );
      // do populates
      result.docs = await this.pricingAdjustmentService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.pricingAdjustmentService.find(searchModel);
      // do populates
      result = await this.pricingAdjustmentService._populate(result, populates);
    }

    return result;
  }

  @Get('services')
  public async findServicePricing(
    @Query() searchModel: PricingServiceSearchModel
  ) {
    let result: any;
    const {populates, paginate} = searchModel;

    if (paginate) {
      // result = await this.pricingService.findWithPaginate(query);
      result = await this.pricingServiceSevice.findWithPaginate(searchModel);
      // do populates
      result.docs = await this.pricingServiceSevice._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.pricingServiceSevice.find(searchModel);
      // do populates
      result = await this.pricingServiceSevice._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.pricingService.findById(param._id, {
      lean: true
    });

    return this.pricingService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.pricingService.delete(param._id);
  }

  //   @Post('import-prices-from-excel')
  //   @UseInterceptors(
  //     FileInterceptor('file', {
  //       storage: diskStorage({
  //         destination: './uploads/',
  //         filename: (req, file, cb) => {
  //           const randomName = Array(32)
  //             .fill(null)
  //             .map(() => Math.round(Math.random() * 16).toString(16))
  //             .join('');
  //           cb(null, `${randomName}${extname(file.originalname)}`);
  //         }
  //       }),
  //       fileFilter: (req, file, cb) => {
  //         const acceptExtensions = ['.xlsx'];
  //         if (!acceptExtensions.includes(extname(file.originalname))) {
  //           cb(new Error('invalid file'), false);
  //         }
  //         cb(null, true);
  //       }
  //     })
  //   )
  //   public async upload(@UploadedFile() file: Express.Multer.File, @Body() body) {
  //     const sheets = body?.sheets.split(',');
  //     await this.pricingService.importRoutePricingFromExcel(file, sheets);
  //     return true;
  //   }
}
