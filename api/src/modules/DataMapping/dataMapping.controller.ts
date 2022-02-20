import {
  Controller,
  UseFilters,
  Get,
  Response,
  Query,
  HttpStatus
} from '@nestjs/common';
import {join} from 'path';

import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {DataMappingService} from './dataMapping.service';

@Controller('data-mappings')
@UseFilters(HttpExceptionFilter)
export class DataMappingController extends BaseController {
  constructor(private readonly dataMappingService: DataMappingService) {
    super();
  }

  @Get('views/templates')
  public async file(@Response() res, @Query() query) {
    const file = join(process.cwd(), 'views/templates', query.filepath);
    return res.status(HttpStatus.OK).download(file);
  }
}
