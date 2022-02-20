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
  UseFilters
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';
import {RequireLogin, WorkspaceId} from 'src/core/decorators';
import {DeserializeBodyInterceptor} from 'src/core';
import {UseInterceptors} from '@nestjs/common';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';

// services
import {CategoryService} from './category.service';
import {WorkspaceInterceptor} from 'src/core/interceptors';

// models
import {
  CategoryCreateModel,
  CategoryUpdateModel,
  CategorySearchModel
} from './models';

@Controller('categories')
@UseFilters(HttpExceptionFilter)
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @Post()
  @RequireLogin()
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
        const acceptExtensions = ['.jpg', '.jpeg', '.png', '.tiff'];
        if (!acceptExtensions.includes(extname(file.originalname))) {
          cb(new Error('invalid file'), false);
        }
        cb(null, true);
      }
    }),
    DeserializeBodyInterceptor
  )
  public async create(
    @Body() body: CategoryCreateModel,
    @UploadedFiles() files = []
  ) {
    return this.categoryService.createCategory(body, files);
  }

  @Put(':_id')
  @RequireLogin()
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
        const acceptExtensions = ['.jpg', '.jpeg', '.png', '.tiff'];
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
    @Body() body: CategoryUpdateModel,
    @UploadedFiles() files = []
  ) {
    return this.categoryService.updateCategory(param._id, body, files);
  }

  @Get()
  @UseInterceptors(WorkspaceInterceptor)
  public async find(
    @Query() query: CategorySearchModel,
    @WorkspaceId() workspace
  ) {
    let result: any;
    const {populates, paginate} = query;

    result = await this.categoryService.getCategories({...query, workspace});
    if (paginate) {
      // do populates
      result.docs = await this.categoryService._populate(
        result.docs,
        populates
      );
    } else {
      // do populates
      result = await this.categoryService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  @UseInterceptors(WorkspaceInterceptor)
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.categoryService.findById(param._id);
    return this.categoryService._populate(result, query ? query.populates : []);
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.categoryService.delete(param._id);
  }
}
