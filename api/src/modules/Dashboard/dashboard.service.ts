import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  DashboardCreateModel,
  DashboardUpdateModel,
  DashboardSearchModel
} from './models';
import {Dashboard, DashboardModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class DashboardService extends BaseCRUDService<
  Dashboard,
  DashboardCreateModel,
  DashboardUpdateModel,
  DashboardSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Dashboards')
    private readonly dashboardRepository: DashboardModel
  ) {
    super(dashboardRepository, request);
  }

  public _castQuery(searchModel: DashboardSearchModel) {
    const query: any = {};
    const {workspaces, widgetType} = searchModel;

    if (Array.isArray(workspaces) && workspaces?.length > 0) {
      query.$or = [{workspaces: {$in: workspaces}}, {workspaces: {$eq: []}}];
    }

    if (widgetType) {
      query.widgetType = widgetType;
    }
    return query;
  }

  /**
   * find a dashboard by query
   * @param dashboardSearchModel DashboardSearchModel
   */
  public async find(dashboardSearchModel: DashboardSearchModel): Promise<any> {
    const currentWorkspace = await this.getCurrentWorkspace<Dashboard>();
    const query = {
      ...dashboardSearchModel,
      workspaces: [currentWorkspace?._id?.toHexString(), null]
    };
    return super.find(query);
  }

  /**
   * find a dashboard conditions
   * @param conditions
   */
  public async findOne(conditions: DashboardSearchModel): Promise<Dashboard> {
    return this.dashboardRepository
      .findOne(conditions)
      .populate({path: 'layout'})
      .exec();
  }

  /**
   * find a dashboard by _id
   */
  public async findById(_id: string): Promise<Dashboard | null> {
    const currentWorkspace = await this.getCurrentWorkspace<Dashboard>();
    const query = this._castQuery({
      _ids: [_id],
      workspaces: [currentWorkspace?._id?.toHexString(), null]
    });
    return this.findOne(query);
  }
}
