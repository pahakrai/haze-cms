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
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  DeserializeBodyInterceptor,
  RequireLogin
} from 'src/core';
import {extname} from 'path';
import {diskStorage} from 'multer';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
// services
import {ServiceService} from './service.service';

// models
import {
  ServiceCreateModel,
  ServiceUpdateModel,
  ServiceSearchModel
} from './models';

@RequireLogin()
@Controller('services')
@UseFilters(HttpExceptionFilter)
export class ServiceController extends BaseController {
  constructor(private readonly serviceService: ServiceService) {
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
    @Body() body: ServiceCreateModel,
    @UploadedFiles() files = []
  ) {
    return this.serviceService.createService(body, files);
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
    @Body() body: ServiceUpdateModel,
    @UploadedFiles() files = []
  ) {
    return this.serviceService.updateService(param._id, body, files);
  }

  @Get()
  public async find(@Query() query: ServiceSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.serviceService.findWithPaginate(query);
      // do populates
      result.docs = await this.serviceService._populate(
        result.docs,
        populates
        // {
        //   populateFields: {
        //     pricing: {vehicleType: query.vehicleType}
        //   }
        // }
      );
    } else {
      result = await this.serviceService.find(query, {lean: true});
      // do populates
      result = await this.serviceService._populate(
        result,
        populates
        //  {
        //   populateFields: {
        //     pricing: {vehicleType: query.vehicleType}
        //   }
        // }
      );
    }

    return result;
  }

  @Get('shown-in-user-profile')
  public async getServiceShowInUserProfile() {
    return this.serviceService.getServiceShowInUserProfile();
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.serviceService.findById(param._id, {lean: true});

    return this.serviceService._populate(result, query ? query.populates : [], {
      populateFields: {
        pricing: {vehicleType: query.vehicleType}
      }
    });
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.serviceService.delete(param._id);
  }
}
