import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UploadedFiles,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';
import {
  DeserializeBodyInterceptor,
  MapDisplayLocalizeInterceptor
} from 'src/core/interceptors';

import {extname} from 'path';
import {diskStorage} from 'multer';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
// services
import {CouponService} from './coupon.service';

// models
import {
  CouponCreateModel,
  CouponUpdateModel,
  CouponSearchModel,
  CouponRedeemModel
} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@Controller('coupons')
@UseFilters(HttpExceptionFilter)
export class CouponController extends BaseController {
  constructor(private readonly couponService: CouponService) {
    super();
  }

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        const acceptExtensions = [
          '.jpg',
          '.jpeg',
          '.png',
          '.tiff',
          '.gif',
          '.mp4',
          '.avi',
          '.wmv'
        ];
        if (!acceptExtensions.includes(extname(file.originalname))) {
          cb(new Error('invalid file'), false);
        }
        cb(null, true);
      }
    }),
    DeserializeBodyInterceptor
  )
  public async create(
    @Body() body: CouponCreateModel,
    @UploadedFiles() files = []
  ) {
    return this.couponService.create(body, files);
  }

  @Put(':_id')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        const acceptExtensions = [
          '.jpg',
          '.jpeg',
          '.png',
          '.tiff',
          '.gif',
          '.mp4',
          '.avi',
          '.wmv'
        ];
        if (!acceptExtensions.includes(extname(file.originalname))) {
          cb(new Error('invalid file'), false);
        }
        cb(null, true);
      }
    }),
    DeserializeBodyInterceptor
  )
  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: CouponUpdateModel,
    @UploadedFiles() files = []
  ) {
    return this.couponService.updateCoupon(param._id, body, files);
  }

  @Post('redeem/:code')
  public async redeemCoupon(
    @Body() body: CouponRedeemModel,
    @Param('code') code: string
  ) {
    return this.couponService.redeemCoupon(code, body);
  }

  @Get()
  public async find(@Query() query: CouponSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.couponService.findWithPaginate(query);
      // do populates
      result.docs = await this.couponService._populate(result.docs, populates);
    } else {
      result = await this.couponService.find(query, {lean: true});
      // do populates
      result = await this.couponService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.couponService.findById(param._id, {lean: true});

    return this.couponService._populate(result, query?.populates || []);
  }

  /**
   * find coupon by code
   * @param param params
   * @param query query string
   */
  @UseInterceptors()
  @Get('code/:code')
  public async findByCode(@Param('code') code: string, @Query() query?) {
    const result = await this.couponService.findByCode(code);
    return this.couponService._populate(result, query?.populates || []);
  }

  /**
   * whether workspace has the coupon
   * @param param param
   * @param query query string
   * @param query.workspace workspace
   * /exist/:code or /exist/:code?workspace=5c013e3e5ac56a159133f411
   */
  @Get('exist/:code')
  public async isCouponExist(@Param() param) {
    await this.couponService.isCouponExist(param.code);
    return true;
  }

  /**
   * check duplicate coupon code
   * @param req request
   * @param res response
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get('duplicate-code-value/:code/:_id?')
  public async duplicateCode(@Param() param) {
    return this.couponService.checkDuplicateCouponCode(param.code, param._id);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.couponService.delete(param._id);
  }
}
