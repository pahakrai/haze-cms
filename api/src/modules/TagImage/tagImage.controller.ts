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
import {DeserializeBodyInterceptor, RequireLogin} from 'src/core';

import {extname} from 'path';
import {diskStorage} from 'multer';
import {AnyFilesInterceptor} from '@nestjs/platform-express';

// services
import {TagImageService} from './tagImage.service';

// models
import {
  TagImageCreateModel,
  TagImageUpdateModel,
  TagImageSearchModel
} from './models';

@RequireLogin()
@Controller('tag-images')
@UseFilters(HttpExceptionFilter)
export class TagImageController extends BaseController {
  constructor(private readonly tagImageService: TagImageService) {
    super();
  }

  @Post()
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
    @Body() body: TagImageCreateModel,
    @UploadedFiles() files = []
  ) {
    return this.tagImageService.createTagAndImage(body, files);
  }

  @Put(':_id')
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
    @Body() body: TagImageUpdateModel,
    @UploadedFiles() files = []
  ) {
    return this.tagImageService.updateTagAndImage(param._id, body, files);
  }

  @Get()
  public async find(@Query() query: TagImageSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.tagImageService.findWithPaginate(query);
      // do populates
      result.docs = await this.tagImageService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.tagImageService.find(query, {lean: true});
      // do populates
      result = await this.tagImageService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.tagImageService.findById(param._id, {lean: true});

    return this.tagImageService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.tagImageService.delete(param._id);
  }
}
