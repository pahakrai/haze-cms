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
  Patch,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  RequireLogin,
  DeserializeBodyInterceptor
} from 'src/core';
import {diskStorage} from 'multer';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {
  filename,
  imageFileFilter
} from '../../../../core/utils/fileInterceptor.helper';
// services
import {ProductSpecService} from './productSpec.service';

// models
import {
  ProductSpecCreateModel,
  ProductSpecUpdateModel,
  ProductSpecSearchModel,
  ProductSpecIconModel
} from './models';

@Controller('productspecs')
@UseFilters(HttpExceptionFilter)
export class ProductSpecController extends BaseController {
  constructor(private readonly productSpecService: ProductSpecService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: ProductSpecCreateModel) {
    return this.productSpecService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ProductSpecUpdateModel
  ) {
    return this.productSpecService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: ProductSpecSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.productSpecService.findWithPaginate(query);
      // do populates
      result.docs = await this.productSpecService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.productSpecService.find(query, {lean: true});
      // do populates
      result = await this.productSpecService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.productSpecService.findById(param._id, {
      lean: true
    });

    return this.productSpecService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.productSpecService.delete(param._id);
  }

  @Patch(':_id')
  @RequireLogin()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {name: 'icon', maxCount: 1},
        {name: 'activeIcon', maxCount: 1}
      ],
      {
        storage: diskStorage({
          destination: './uploads/',
          filename
        }),
        fileFilter: imageFileFilter
      }
    ),
    DeserializeBodyInterceptor
  )
  public async updateIcon(
    @Param() param: ParamIdModel,
    @Body() body: ProductSpecIconModel,
    @UploadedFiles()
    files: {
      activeIcon: Array<Express.Multer.File>;
      icon: Array<Express.Multer.File>;
    }
  ) {
    return this.productSpecService.updateIcon(param._id, body, {
      icon:
        files?.icon?.length > 0 && files?.icon[0] ? files?.icon[0] : undefined,
      activeIcon:
        files?.activeIcon?.length > 0 && files?.activeIcon[0]
          ? files?.activeIcon[0]
          : undefined
    });
  }
}
