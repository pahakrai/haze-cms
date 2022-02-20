import {
  Controller,
  Delete,
  Get,
  Response,
  UseFilters,
  HttpStatus,
  Request,
  Post,
  Body,
  Param,
  Put,
  Query,
  BadRequestException,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import {HttpExceptionFilter} from 'src/core/filters';
import {DeserializeBodyInterceptor} from 'src/core/interceptors';

import {BlobService} from './blob.service';
import {FilemetaService} from '../FileMeta/filemeta.service';
import {FileMetaSearchModel, FileMetaUpdateModel} from '../FileMeta/models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@UseFilters(HttpExceptionFilter)
@Controller('blobs')
export class BlobController {
  constructor(
    private readonly blobService: BlobService,
    private readonly filemetaService: FilemetaService
  ) {}

  /**
   * delete file in cloud server
   * @param req request
   * @param res response
   * @param param req.param
   * @param param._id filemeta _id
   */
  @Delete(':_id')
  public async delete(@Request() req, @Response() res, @Param() param) {
    await this.blobService.delete(param._id, process.env.BLOB_ENGINE);
    return res.status(HttpStatus.OK).json();
  }

  /**
   * get file in cloud server by id
   * @param req request
   * @param res response
   * @param param req.param
   * @param param._id filemeta _id
   */
  @Get(':_id')
  public async findById(@Request() req, @Response() res, @Param() param) {
    const file = await this.filemetaService.findById(param._id);
    return res.status(HttpStatus.OK).json(file);
  }

  /**
   * find filemetas by query
   * @param req request
   * @param res response
   * @param param req.param
   * @param query req.query
   */
  @Get('/')
  public async find(
    @Request() req,
    @Response() res,
    @Param() param,
    @Query() fileMetaSearchModel: FileMetaSearchModel
  ) {
    const filemetas = await this.filemetaService.find(fileMetaSearchModel);
    return res.status(HttpStatus.OK).json(filemetas);
  }

  /**
   * update a filemeta by id
   * @param req request
   * @param res response
   * @param body FileMeta Model object
   * @param query req.query
   */
  @Put(':_id')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    }),
    DeserializeBodyInterceptor
  )
  public async update(
    @Request() req,
    @Response() res,
    @Body() fileMetaUpdateModel: FileMetaUpdateModel,
    @Param() param,
    @UploadedFiles() files
  ) {
    const filemeta = await this.blobService.update(
      param._id,
      fileMetaUpdateModel,
      files
    );
    return res.status(HttpStatus.OK).json(filemeta);
  }

  /**
   * upload file to cloud server
   * @param req request
   * @param req.files
   * @param req.body.folder
   * @param req.body.tags
   * @param res response
   * @param param req.param
   */
  @Post('/')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    }),
    DeserializeBodyInterceptor
  )
  public async upload(@Body() body, @UploadedFiles() files) {
    let fileMeta;
    if (files && files.length) {
      // file meta with upload new file
      fileMeta = await this.blobService.uploadFiles(
        files,
        body.folder,
        body.tags,
        body.isSystemFile
      );
    } else if (body.uri) {
      // clone existing file meta/create with url
      // create fileMeta with body
      fileMeta = await this.filemetaService.create(body);
    } else {
      throw new BadRequestException({
        code: 'data__not_support',
        payload: {key: 'files'}
      });
    }

    return fileMeta;
  }
}
