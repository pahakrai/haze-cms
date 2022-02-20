'use strict';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Query,
  UploadedFiles,
  UseFilters,
  Delete
} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import {extname} from 'path';
import {diskStorage} from 'multer';
import {
  HttpExceptionFilter,
  DeserializeBodyInterceptor,
  ParamIdModel,
  RequireLogin,
  ProgrammaticAPI
} from 'src/core';

// models
import {NotificationScheduleCreateModel} from './models';

// services
import {NotificationScheduleService} from './notificationSchedule.service';

@RequireLogin()
@UseFilters(HttpExceptionFilter)
@Controller('notification-schedules')
export class NotificationScheduleController {
  constructor(
    private readonly notificationScheduleService: NotificationScheduleService
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        const acceptExtensions = ['.jpg', '.jpeg', '.png'];
        if (!acceptExtensions.includes(extname(file.originalname))) {
          cb(new Error('invalid file'), false);
        }
        cb(null, true);
      }
    }),
    DeserializeBodyInterceptor
  )
  public async create(
    @Body() createNotificationScheduleModel: NotificationScheduleCreateModel,
    @UploadedFiles() files: Array<any>
  ) {
    return this.notificationScheduleService.create(
      createNotificationScheduleModel,
      files
    );
  }

  @Post('put-job')
  @ProgrammaticAPI()
  public async doJobAfterCreateNotification(@Body() notificationSchedule) {
    const result = await this.notificationScheduleService.sendNotification(
      notificationSchedule
    );
    return result;
  }

  @Get()
  public async find(@Query() query) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.notificationScheduleService.findWithPaginate(query);
      // do populates
      result.docs = await this.notificationScheduleService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.notificationScheduleService.find(query);
      // do populates
      result = await this.notificationScheduleService._populate(
        result,
        populates
      );
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.notificationScheduleService.findById(param._id);

    return this.notificationScheduleService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.notificationScheduleService.delete(param._id);
  }
}
