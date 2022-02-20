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
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {extname} from 'path';
import {diskStorage} from 'multer';
import {AnyFilesInterceptor} from '@nestjs/platform-express';

import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  DeserializeBodyInterceptor,
  AllowAction
} from 'src/core';

// services
import {RegionService} from './region.service';

// models
import {
  RegionCreateModel,
  RegionUpdateModel,
  RegionSearchModel,
  FindNearestRegionModel
} from './models';

@Controller('regions')
@UseFilters(HttpExceptionFilter)
export class RegionController extends BaseController {
  constructor(private readonly regionService: RegionService) {
    super();
  }

  @Post()
  @AllowAction('Region:Create')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
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
    @Body() body: RegionCreateModel,
    @UploadedFiles() files = []
  ) {
    return this.regionService.createRegion(body, files);
  }

  @Put(':_id')
  @AllowAction('Region:Update')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
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
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: RegionUpdateModel,
    @UploadedFiles() files = []
  ) {
    return this.regionService.updateRegion(param._id, body, files);
  }

  @Get()
  public async find(@Query() query: RegionSearchModel) {
    // return this.regionService.find(query);
    let result: any;

    const {populates, paginate, sort} = query;

    if (paginate) {
      result = await this.regionService.findWithPaginate(query);
      // do populates
      result.docs = await this.regionService._populate(result.docs, populates);
    } else {
      result = await this.regionService.find(query, {lean: true, sort});
      // do populates
      result = await this.regionService._populate(result, populates);
    }

    return result;
  }

  @Get('nearest')
  public async findNearestRegion(
    @Query() {latitude, longitude}: FindNearestRegionModel
  ) {
    const region = await this.regionService.findNearestRegion(
      latitude,
      longitude
    );

    return region;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel) {
    return this.regionService.findById(param._id, {lean: true});
  }

  @Delete(':_id')
  @AllowAction('Region:Delete')
  public async delete(@Param() param: ParamIdModel) {
    return this.regionService.delete(param._id);
  }
}
