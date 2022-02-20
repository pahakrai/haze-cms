import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  Response,
  HttpStatus,
  Controller,
  UseFilters,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {
  // WorkspaceId,
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  DeserializeBodyInterceptor,
  RequireLogin
} from 'src/core';
import {extname, join} from 'path';
import {diskStorage} from 'multer';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import {CursorPaginateOptions} from 'mongoose';

// services
import {ProductService} from './product.service';

// models
import {
  ProductSearchModel,
  ProductSKUQueryModel,
  ProductFormUpdateModel,
  ProductFormCreateModel
} from './models';
import {ProductSkuService} from './submodules/ProductSku/productSku.service';

@Controller('products')
@UseFilters(HttpExceptionFilter)
export class ProductController extends BaseController {
  constructor(
    private readonly productService: ProductService,
    private readonly productSKUService: ProductSkuService
  ) {
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
        const acceptExtensions = [
          '.jpg',
          '.jpeg',
          '.png',
          '.tiff',
          '.gif',
          '.mp4',
          '.avi',
          '.wmv',
          '.pdf',
          '.xlsx'
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
    @Body() body: ProductFormCreateModel,
    @UploadedFiles() files = []
  ) {
    return this.productService.createProductWithSKU(body, files);
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
        const acceptExtensions = [
          '.jpg',
          '.jpeg',
          '.png',
          '.tiff',
          '.gif',
          '.mp4',
          '.avi',
          '.wmv',
          '.pdf',
          '.xlsx'
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
    @Body() body: ProductFormUpdateModel,
    @UploadedFiles() files = []
  ) {
    return this.productService.updateProductWithSKU(param._id, body, files);
  }

  @Get()
  public async find(@Query() query: ProductSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    result = await this.productService.getProducts({...query});

    if (paginate) {
      // do populates
      result.docs = await this.productService._populate(result.docs, populates);
    } else {
      // do populates
      result = await this.productService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param('_id') id: string, @Query() query) {
    const product = await this.productService.findById(id);

    return this.productService._populate(product, query?.populates || []);
  }

  @Get(':_id/sku')
  public async findProductSKU(
    @Param() param: ParamIdModel,
    @Query() query: ProductSKUQueryModel
  ) {
    // transform querySpecs to {spec, value}
    const specs = query.specs.map(spec => {
      const split = spec.split('_');

      return {
        spec: split[0],
        value: split[1]
      };
    });

    return this.productSKUService.find(
      {
        product: param._id,
        specs,
        expiryDateGte: query?.expiryDateGte,
        expiryDateLte: query?.expiryDateLte
      },
      {lean: true}
    );
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.productService.delete(param._id);
  }

  @Patch(':_id/status/:status')
  @RequireLogin()
  public async updateStatus(@Param() param: ParamIdModel & {status: number}) {
    const product = await this.productService.updateStatus(
      param?._id,
      param?.status
    );
    return product;
  }

  @Get('/may/like')
  @RequireLogin()
  public async findByMayYouLike(
    @Query() query: ProductSearchModel,
    @Param() options: CursorPaginateOptions
  ) {
    return this.productService.findProductByMayLike(query, options);
  }

  /**
   * name
   */

  @Post('/imports')
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
        const acceptExtensions = ['.xlsx', '.xlx'];
        if (!acceptExtensions.includes(extname(file.originalname))) {
          cb(new Error('invalid file'), false);
        }
        cb(null, true);
      }
    }),
    DeserializeBodyInterceptor
  )
  public importProducts(@UploadedFiles() files = []) {
    return this.productService.importProducts(files);
  }

  @Get('views/templates')
  public async file(@Response() res, @Query() query) {
    const file = join(process.cwd(), 'views/templates', query.filepath);
    return res.status(HttpStatus.OK).download(file);
  }
}
