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
  UseInterceptors
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {WebMenuService} from './webMenu.service';

// models
import {
  WebMenuCreateModel,
  WebMenuUpdateModel,
  WebMenuSearchModel,
  WebMenuItemModel
} from './models';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Controller('web-menus')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class WebMenuController extends BaseController {
  constructor(private readonly webMenuService: WebMenuService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: WebMenuCreateModel) {
    return this.webMenuService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WebMenuUpdateModel
  ) {
    return this.webMenuService.update(param._id, body, {lean: true});
  }

  // @Get()
  // public async find(@Query() query: WebMenuSearchModel) {
  //   let result: any;
  //   const {populates, paginate} = query;

  //   if (String(paginate) === 'true') {
  //     result = await this.webMenuService.findWithPaginate(query);
  //     // do populates
  //     result.docs = await this.webMenuService._populate(result.docs, populates);
  //   } else {
  //     result = await this.webMenuService.find(query, {lean: true});
  //     // do populates
  //     result = await this.webMenuService._populate(result, populates);
  //   }

  //   return result;
  // }

  @Get()
  public async find(@Query() query: WebMenuSearchModel) {
    return this.webMenuService.findWebMenu(query);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.webMenuService.findById(param._id, {lean: true});
    return this.webMenuService._populate(result, query ? query.populates : []);
  }

  @Post('allow-access')
  public async accessAllowedPages(@Body() body) {
    const {to, code} = body;
    return this.webMenuService.accessAllowedByAction(code, to);
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.webMenuService.delete(param._id);
  }

  @Post(':_id/add-menu-item')
  @RequireLogin()
  public async addMenuItem(
    @Param() param: ParamIdModel,
    @Body() item: WebMenuItemModel
  ) {
    return this.webMenuService.addMenuItem(param?._id, item);
  }

  @Post(':_id/update-menu-item/:_itemId')
  @RequireLogin()
  public async updateMenuItem(
    @Param() param: ParamIdModel & {_itemId: string},
    @Body() item: WebMenuItemModel
  ) {
    return this.webMenuService.updateMenuItem(param?._id, param?._itemId, item);
  }
}
