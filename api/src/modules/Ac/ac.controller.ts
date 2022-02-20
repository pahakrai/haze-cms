import {Controller, UseFilters} from '@nestjs/common';
import {HttpExceptionFilter} from 'src/core/filters';
import {ACService} from './ac.service';

@UseFilters(HttpExceptionFilter)
@Controller('ac')
export class ACController {
  constructor(private readonly acService: ACService) {}
}
