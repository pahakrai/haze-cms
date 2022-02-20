import {Controller, Get, Param, Query, Body, Post, Put} from '@nestjs/common';
import {UseInterceptors, UseFilters} from '@nestjs/common';
// core
import {
  HttpExceptionFilter,
  extractPaginateOptions,
  MapDisplayLocalizeInterceptor,
  RequireLogin
} from 'src/core';
// modules
import {PageService} from './page.service';

import {
  PageCreateModel,
  PageUpdateModel,
  PageSearchModel,
  PageSearchQueryModel
} from './models';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@UseFilters(HttpExceptionFilter)
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  /**
   * Duplicate page path
   * @param req {object}
   * @param body {object}
   * @param body.path {string}
   * @param query {object}
   * @param query.workspace_code {string}
   */
  @RequireLogin()
  @Get('duplicate-path/:_id/:path')
  public async duplicatePath(@Param() param) {
    const duplicate = await this.pageService.duplicatePath(
      param._id,
      param.path
      // query.workspace_code
    );
    return {duplicate};
  }

  /**
   * find pages by query string
   * @param query req.query
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor, WorkspaceInterceptor)
  @Get()
  public async findPages(@Query() pageSearchQueryModel: PageSearchQueryModel) {
    const {isTemplate, isSystem, isActive, isSection} = pageSearchQueryModel;
    const pageSearchModel: PageSearchModel = {
      ...pageSearchQueryModel,
      isTemplate: isTemplate && isTemplate === 'true',
      isSystem: isSystem && isSystem === 'true',
      isActive: isActive && isActive === 'true',
      isSection: isSection && isSection === 'true'
    };
    const result = await this.pageService.getPages(
      pageSearchModel,
      extractPaginateOptions(pageSearchModel)
    );
    return result;
  }

  /**
   * find pages by path
   * @param query req.query
   */
  @Get('/by-query')
  public async findByQueryPath(@Query() query) {
    const result = await this.pageService.findByPath(query.path);
    return result;
  }

  /**
   * find pages by path
   * @param query req.query
   */
  @Get('/by-path/:path?')
  public async findByPath(@Param() param) {
    const result = await this.pageService.findByPath(param.path);
    return result;
  }

  /**
   * get all sitemap
   * @param query req.query
   */
  // @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get('/sitemap')
  public async getSitemap() {
    const result = await this.pageService.getSitemap();
    return result.map(({path}) => path);
  }

  @Get('/paths')
  public async getPaths() {
    const paths = await this.pageService.getSitemap();
    return paths.map(({path}) => path);
  }

  /**
   * find page by id
   * @param param req.param
   * @param param._id post ID
   */
  @UseInterceptors(WorkspaceInterceptor)
  @Get('/:_id')
  public async findPageById(@Param() param) {
    const page = await this.pageService.findById(param._id);
    return page;
  }

  /**
   * create a page
   * @param pageEditModel
   */
  @RequireLogin()
  @Post()
  public async createPage(@Body() pageCreateModel: PageCreateModel) {
    const workspaceId = this.pageService.getWorkspaceId();
    const page = await this.pageService.create({
      ...pageCreateModel,
      workspace: workspaceId || null
    });
    return page;
  }

  /**
   * get template= true  isActive= true page
   * @param pageSearchModel
   */
  @Get('get/template')
  public async getTemplateWhenCreatePage(
    @Query() pageSearchModel: PageSearchModel
  ) {
    const result = await this.pageService.getTemplateWhenCreatePage(
      {...pageSearchModel, isTemplate: true, isActive: true},
      extractPaginateOptions(pageSearchModel)
    );
    return result;
  }

  /**
   * update a page by id
   * @param param
   * @param body req.body
   */
  @RequireLogin()
  @Put(':_id')
  public async updatePage(
    @Param() param,
    @Body() pageUpdateModel: PageUpdateModel
  ) {
    const workspaceId = this.pageService.getWorkspaceId();
    const page = await this.pageService.updateById(param._id, {
      ...pageUpdateModel,
      workspace: workspaceId || null
    });
    return page;
  }

  /**
   * update a page content by id
   * @param param
   * @param body req.body
   */
  @RequireLogin()
  @Put(':_id/page-content')
  public async updatePageContent(
    @Param() param,
    @Body() pageUpdateModel: PageUpdateModel
  ) {
    const page = await this.pageService.update(param._id, {
      content: pageUpdateModel.content
    });
    return page;
  }
}
