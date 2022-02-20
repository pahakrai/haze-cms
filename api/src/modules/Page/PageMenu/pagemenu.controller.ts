import {Get, Param, Query, Body, Post, Patch, Delete} from '@nestjs/common';

import {Controller, UseFilters, UseInterceptors} from '@nestjs/common';

import {
  HttpExceptionFilter,
  MapDisplayLocalizeInterceptor,
  RequireLogin
} from 'src/core';
import {PageMenuService} from './pagemenu.service';
import {
  PageMenuCreateModel,
  PageMenuSearchModel,
  PageMenuUpdateModel
} from './models';
import {PageMenuItemInsertModel} from './models';

@UseFilters(HttpExceptionFilter)
@Controller('page-menus')
export class PageMenuController {
  constructor(private readonly pageMenuService: PageMenuService) {}

  /**
   * create a pageMenu
   * @param req request
   * @param pageMenuCreateModel
   * @param currentUser
   */
  @RequireLogin()
  @Post()
  public async createPageMenu(
    @Body() pageMenuCreateModel: PageMenuCreateModel
  ) {
    const pageMenu = await this.pageMenuService.createPageMenu(
      pageMenuCreateModel
    );
    return pageMenu;
  }

  /**
   * insert a pageMenuItem by page menu id
   * @param req request
   * @param pageMenuCreateModel
   * @param param._id items or mItems
   * @param param.field items or mItems
   */
  @RequireLogin()
  @Post('insert-item-to/:_id/:field')
  public async insertPageMenuItem(
    @Param() param,
    @Body() pageMenuItemInsertModel: PageMenuItemInsertModel
  ) {
    const pageMenu = await this.pageMenuService.insertPageMenuItemTo(
      param._id,
      param.field,
      pageMenuItemInsertModel
    );
    return pageMenu;
  }

  /**
   * remove a pageMenuItem from page menu id and
   * @param req request
   * @param pageMenuCreateModel
   * @param param.menuId menuId
   * @param param.menuItemId menuItemId
   * @param param.field items or mItems
   */
  @RequireLogin()
  @Patch('remove-item-from/:menuId/:menuItemId/:field')
  public async removePageMenuItem(@Param() param) {
    const pageMenu = await this.pageMenuService.removePageMenuItemFromMenuIdAndMenuItemId(
      param.menuId,
      param.menuItemId,
      param.field
    );
    return pageMenu;
  }

  /**
   * paginate pageMenu
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get()
  public async find(@Query() pageMenuSearchModel: PageMenuSearchModel) {
    const pageMenus = await this.pageMenuService.find(pageMenuSearchModel);
    return pageMenus;
  }

  /**
   * find pageMenu by id
   * @param param req.param
   */
  @Get('by-id/:_id')
  public async findById(@Param() param) {
    const pageMenu = await this.pageMenuService.findById(param._id);
    return pageMenu;
  }

  /**
   * find pageMenu by id
   * @param param req.param
   */
  @Get('by-code/:code')
  public async findByCode(@Param() param) {
    const pageMenu = await this.pageMenuService.findByCode(param.code);
    return pageMenu;
  }

  /**
   * Duplicate page menu code
   * @param req {object}
   * @param param {object}
   * @param param._id {string}
   * @param param.code {string}
   */
  @RequireLogin()
  @Get('duplicate-code/:_id/:code')
  public async duplicateCode(@Param() param) {
    const duplicate = await this.pageMenuService.duplicateCode(
      param._id,
      param.code
    );
    return {duplicate};
  }

  /**
   * update a pageMenu by id
   * @param param
   * @param body req.body
   */
  @RequireLogin()
  @Patch(':_id')
  public async update(
    @Param() param,
    @Body() pageMenuUpdateModel: PageMenuUpdateModel
  ) {
    const pageMenu = await this.pageMenuService.update(
      param._id,
      pageMenuUpdateModel
    );
    return pageMenu;
  }

  /**
   * update a pageMenu by id
   * @param param
   * @param body req.body
   */
  @RequireLogin()
  @Delete(':_id')
  public async delete(@Param() param) {
    const pageMenu = await this.pageMenuService.deleteById(param._id);
    return pageMenu;
  }
}
