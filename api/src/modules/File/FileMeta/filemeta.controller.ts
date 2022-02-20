'use strict';
import {
  Get,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Request,
  Response,
  Controller,
  HttpStatus,
  UseFilters
} from '@nestjs/common';
import {HttpExceptionFilter} from 'src/core/filters';

import {FilemetaService} from './filemeta.service';
import {FileMetaSearchModel, FileMetaUpdateModel} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@UseFilters(HttpExceptionFilter)
@Controller('filemetas')
export class FilemetaController {
  constructor(private readonly filemetaService: FilemetaService) {}

  /**
   * find fileMetas by query string
   * @param res response
   * @param query req.query
   */
  @Get()
  public async findFileMetas(
    @Request() req,
    @Response() res,
    @Query() fileMetaSearchModel: FileMetaSearchModel
  ) {
    const fileMetas = await this.filemetaService.find({
      ...fileMetaSearchModel,
      _ids: fileMetaSearchModel._ids
    });
    return res.status(HttpStatus.OK).json(fileMetas);
  }

  /**
   * delete fileMetas by id
   * @param res response
   * @param query req.query
   */
  @Delete(':_id')
  public async deleteFileMeta(@Request() req, @Response() res, @Param() param) {
    const result = await this.filemetaService.delete(param._id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Patch(':_id')
  public async updateFileMeta(
    @Param() param,
    @Body() fileMetaUpdateModel: FileMetaUpdateModel
  ) {
    const fileMeta = await this.filemetaService.update(
      param._id,
      fileMetaUpdateModel
    );

    return fileMeta;
  }
}
