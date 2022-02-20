import {
  Get,
  Param,
  Query,
  Put,
  Body,
  Response,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {
  BaseController,
  HttpExceptionFilter,
  BadRequestException,
  RequireLogin
} from 'src/core';

// services
import {SystemReportService} from './systemReport.service';

// models
import {ParamIdModel} from 'src/core/models';
import {SystemReportSearchModel, SystemReportUpdateModel} from './models';
import moment from 'moment';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Controller('system-reports')
@UseFilters(HttpExceptionFilter)
export class SystemReportController extends BaseController {
  constructor(private readonly systemReportService: SystemReportService) {
    super();
  }

  @Get()
  @RequireLogin()
  public async find(@Query() query: SystemReportSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.systemReportService.findWithPaginate(query);
      // do populates
      result.docs = await this.systemReportService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.systemReportService.find(query, {lean: true});
      // do populates
      result = await this.systemReportService._populate(result, populates);
    }

    return result;
  }

  @Get('getReportsWorkspaceAllowToAccess')
  @RequireLogin()
  @UseInterceptors(WorkspaceInterceptor)
  public async getReportsWorkspaceAllowToAccess() {
    const result = await this.systemReportService.getReportsWorkspaceAllowToAccess();
    return result;
  }

  /**
   * find report by id
   * @param res response
   * @param param req.param
   * @param param._id report ID
   */
  @Get(':_id')
  public async findById(@Param() param, @Query() query) {
    const report = await this.systemReportService.findById(param._id);
    return this.systemReportService._populate(report, query?.populates || []);
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: SystemReportUpdateModel
  ) {
    return this.systemReportService.updateReport(param._id, body);
  }

  @Get('get-data/:reportName')
  public async getData(@Query() query, @Param() {reportName}) {
    const result = await this.systemReportService.getReportData(
      reportName,
      query
    );
    return result;
  }

  @Get('export/:reportName/:format?')
  public async exportReport(
    @Query() query: any,
    @Param() params: {reportName: string; format: 'excel' | 'json'},
    @Response() res
  ) {
    const {format = 'excel', reportName} = params;
    const serverUtcOffset = moment().utcOffset();
    const actualUtcOffset = query.utcOffset - serverUtcOffset;
    query.utcOffset = actualUtcOffset;
    switch (format) {
      case 'excel':
        const filename = `${reportName} ${moment().format(
          'YYYYMMDDHHmmss'
        )}.xlsx`;
        // get excel stream
        const reportStream = await this.systemReportService.getExcelReport(
          reportName,
          query
        );

        if (reportStream) {
          // pipe stream to response
          res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          );
          res.setHeader(
            'Content-Disposition',
            `attachment; filename=${filename}`
          );
          return reportStream.pipe(res);
        }
        res.end();
        break;
      default:
        // not supported format
        throw new BadRequestException({
          code: 'data__not_support',
          payload: {key: 'key_format'}
        });
        break;
    }
  }
}
