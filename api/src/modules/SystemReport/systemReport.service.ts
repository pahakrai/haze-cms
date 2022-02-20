/* eslint-disable max-len */
import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {promisify} from 'util';
import mongoose from 'mongoose';
import {PassThrough} from 'stream';
import {access, readFile, constants as FSConstants} from 'fs';
import {BaseCRUDService, NotFoundException, MongodbHelper} from 'src/core';
import ExcelManager, {Data} from '@golpasal/common/dist/helpers/ExcelManager';
import {Workspace} from 'src/modules/Workspace/interfaces';
// interfaces & models
import {
  SystemReportCreateModel,
  SystemReportUpdateModel,
  SystemReportSearchModel
} from './models';
import {SystemReport, SystemReportModel, SPROCQuery} from './interfaces';
import {IUser} from '../User';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);

@Injectable({scope: Scope.REQUEST})
export class SystemReportService extends BaseCRUDService<
  SystemReport,
  SystemReportCreateModel,
  SystemReportUpdateModel,
  SystemReportSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('SystemReports')
    private readonly systemReportRepository: SystemReportModel
  ) {
    super(systemReportRepository, request);
  }

  public async _castQuery(query: SystemReportSearchModel = {}): Promise<any> {
    const {q, isActive, createdAtFr, createdAtTo} = query;
    const searchQuery: any = {
      $and: []
    };
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (query.workspace) {
      workspace = query.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    if (workspace) {
      searchQuery.$and.push({workspaces: {$in: workspace ? workspace : null}});
    }
    if (typeof isActive === 'boolean') {
      searchQuery.$and.push({isActive: isActive});
    }
    // if (name) {
    //   const nameString = 'name.' + currentLanguage;
    //   searchQuery.$and.push({[nameString]: name});
    // }
    if (q) {
      const qReg = new RegExp(q, 'i');
      const $or = [
        {
          'name.en': qReg
        },
        {
          'name.zh-hk': qReg
        },
        {
          'name.zh-cn': qReg
        }
      ];
      searchQuery.$and.push({$or});
    }

    if (createdAtFr || createdAtTo) {
      const createdAtQuery = MongodbHelper.formatDateQueryRange(
        createdAtFr,
        createdAtTo
      );
      if (createdAtQuery) {
        searchQuery.$and.push({createdAt: createdAtQuery});
      }
    }

    if (searchQuery.$and && searchQuery.$and.length === 0) {
      delete searchQuery.$and;
    }
    return searchQuery;
  }

  public async getReportsWorkspaceAllowToAccess(): Promise<any> {
    const workspace = await this.getCurrentWorkspace<Workspace>();
    const result = await this.systemReportRepository.find({
      $or: [
        {workspaceTypes: {$in: workspace?.type}},
        {workspaces: {$in: workspace?._id}}
      ]
    });
    return result;
  }

  public async getReportData(
    reportName: string,
    query: any
  ): Promise<Array<Data>> {
    const sprocList: Array<SPROCQuery> = JSON.parse(
      await readFileAsync('./report/query.json', 'utf8')
    );
    const sproc = sprocList.find(s => s.name === reportName);
    if (!sproc) throw new NotFoundException({});

    const runQueryFunc = async (connection: any, script: string) => {
      // const that = this;
      /**
       * IMPORTANT: Report query development guide
       * 1. comment the `return eval...` statement
       * 2. write your func here and return what you want
       * 3. after test, minify your func to keep it in 1 line
       * 4. copy your 1-line code back to query.json func field
       * 5. DON'T forget to uncomment the return statement
       *
       * CAUTION:
       * 1. Here you can only access the REPOSITORY layer (not the service layer)
       * 2. Some module imported in the top may not be used inside eval function (I also don't know why🤷‍🤷‍🤷‍)
       * 3. Handle date range (convert to 00:00:00.000z and 23:59:59.999z) in client side to prevent wrong time range
       *    since server mostly use UTC timezone
       */
      // tslint:disable-next-line:no-eval
      // cannot comment
      const {ObjectId} = mongoose.Types;
      return eval(`(async function() {${script}}())`);
    };
    const result = await runQueryFunc(mongoose.connections[1], sproc.func);
    return result;
  }

  /**
   * get excel report and return an excel file stream
   *
   * @param reportName report name, should same as query.json, the xlsx and json template file name
   * @param query custom query of your report, passed from admin through query string
   */
  public async getExcelReport(
    reportName: string,
    query: any
  ): Promise<PassThrough> {
    const templatePath = `./report/${reportName}.xlsx`;
    const templateMapPath = `./report/${reportName}.json`;

    try {
      // check whether template, template map accessable
      await accessAsync(templatePath, FSConstants.R_OK);
      await accessAsync(templateMapPath, FSConstants.R_OK);
    } catch (e) {
      throw new NotFoundException({
        code: 'err__not_exists',
        payload: {key: 'key_report'}
      });
    }
    if (query.startDateFrom && !query.startDateTo) {
      query.startDateFrom = new Date(
        new Date(
          new Date(query.startDateFrom).setDate(
            new Date(query.startDateFrom).getDate() + 1
          )
        ).getTime() -
          (1 * 60 * 1000 - 59 * 1000 + query.utcOffset * 60 * 1000)
      );
    }
    if (query.startDateTo && !query.startDateFrom) {
      query.startDateTo = new Date(
        new Date(
          new Date(query.startDateTo).setDate(
            new Date(query.startDateTo).getDate() + 1
          )
        ).getTime() -
          (1 * 60 * 1000 - 59 * 1000 + query.utcOffset * 60 * 1000)
      );
    }
    if (query.startDateFrom && query.startDateTo) {
      query.startDateFrom = new Date(
        new Date(query.startDateFrom).getTime() - query.utcOffset * 60 * 1000
      );

      query.startDateTo = new Date(
        new Date(
          new Date(query.startDateTo).setDate(
            new Date(query.startDateTo).getDate() + 1
          )
        ).getTime() -
          (1 * 60 * 1000 - 59 * 1000 + query.utcOffset * 60 * 1000)
      );
    }

    // get data for report
    const data = await this.getReportData(reportName, query);
    // initialize ExcelManager instance
    const excelManager = await ExcelManager.init(
      templatePath,
      JSON.parse(await readFileAsync(templateMapPath, 'utf8'))
    );
    // push data to template
    excelManager.pushDataToWorksheet(data);

    return excelManager.exportStream(new PassThrough());
  }

  /**
   * update a systemReport
   */
  public async updateReport(
    _id: string,
    systemReportUpdateModel: SystemReportUpdateModel
  ) {
    // build systemReport
    const systemReport = await this.systemReportRepository
      .findById({_id: _id})
      .exec();
    // check systemReport exists
    if (!systemReport) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_systemReport'}
      });
    }

    const updateReport = await this.systemReportRepository
      .findByIdAndUpdate(
        _id,
        {
          workspaces: systemReportUpdateModel.workspaces,
          workspaceTypes: systemReportUpdateModel.workspaceTypes
        },
        {new: true}
      )
      .exec();

    return updateReport;
  }
}
