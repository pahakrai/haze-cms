import {Injectable, Scope, Inject, BadRequestException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import moment from 'moment';
import {BaseCRUDService} from 'src/core';
import common from '@golpasal/common';

// interfaces & models
import {
  SalesVolumeCreateModel,
  SalesVolumeUpdateModel,
  SalesVolumeSearchModel,
  SalesVolumeFormCreateModel,
  SalesVolumeFormUpdateModel
} from './models';
import {SalesVolume, SalesVolumeModel} from './interfaces';

import {IUser} from '../User';
import {OrderService} from '../Order/order.service';

const {OrderStatus} = common.status;

@Injectable({scope: Scope.REQUEST})
export class SalesVolumeService extends BaseCRUDService<
  SalesVolume,
  SalesVolumeCreateModel,
  SalesVolumeUpdateModel,
  SalesVolumeSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('SalesVolumes')
    private readonly salesVolumeRepository: SalesVolumeModel,
    private readonly orderService: OrderService
  ) {
    super(salesVolumeRepository, request);
  }

  public _castQuery(searchModel: SalesVolumeSearchModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const query: any = {};
    const {q, time, currency, notId} = searchModel;

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    // always pass workspace as query
    query.workspace = workspace ? workspace : null;

    if (q) {
      const qReg = new RegExp(q, 'i');
      query.$or = [
        {
          time: qReg
        },
        {
          currency: qReg
        }
      ];
    }
    if (time) {
      query.time = time;
    }
    if (currency) {
      query.currency = currency;
    }
    if (notId) {
      query._id = {$ne: notId};
    }

    return query;
  }

  /**
   * create  sales volume
   * @param createModel
   * @param options
   */
  public async createSalesVolume(createModel: SalesVolumeFormCreateModel) {
    const user = this.getCurrentUser<IUser>();
    const workspace = user.currentWorkspace.toHexString();

    // format time into YYYY-MM
    const time = moment(createModel.time).format('YYYY-MM');

    // check data base on  workspace and time
    const sales = await this.findOne({time});

    if (sales) {
      throw new BadRequestException({
        code: 'err_sales_volume_exist'
      });
    }

    return this.create({...createModel, time, workspace});
  }

  /**
   *
   * @param currency currency (default: HKD)
   * @param year year (default: this year)
   * @param month month (default: this month)
   */
  public async findMonthOverview(
    currency: string,
    year?: number,
    month?: number
  ) {
    const utcOffset = this.getUTCOffset();

    // use this year/month if not specified
    year = year || moment().utcOffset(utcOffset).year();
    month = !isNaN(month) ? month : moment().utcOffset(utcOffset).month();

    // get sales volume
    const salesVolume = await this.findOne(
      {
        currency,
        time: moment().year(year).month(month).format('YYYY-MM')
      },
      {lean: true}
    );

    // get orders
    const orderSales = await this.orderService.findOrderMonthlyAmount({
      // order within the month
      dateFr: moment()
        .utcOffset(utcOffset)
        .year(year)
        .month(month)
        .startOf('month')
        .toDate(),
      dateTo: moment()
        .utcOffset(utcOffset)
        .year(year)
        .month(month)
        .endOf('month')
        .toDate(),
      // exclude cancelled order
      statuses: [
        OrderStatus.PREPARE_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.COMPLETED
      ]
    });
    // calculate sales of the month
    const salesAmount = orderSales.length > 0 ? orderSales[0].total : 0;

    return {
      currency,
      salesAmount,
      target: salesVolume?.amount ?? 0,
      // archievement rate = sales / target, 0 if any of value not applicable
      achievementRate:
        salesVolume?.amount > 0 && salesAmount > 0
          ? salesAmount / salesVolume?.amount
          : 0
    };
  }

  /**
   * get sales amount and target by year
   *
   * @param currency currency (default HKD)
   * @param year year for query (default this year)
   */
  public async findYearOverview(
    currency = 'HKD',
    year = new Date().getFullYear()
  ) {
    const utcOffset = this.getUTCOffset();

    // get sales volume
    const salesVolumes = await this.find(
      {
        currency,
        q: year.toString()
      },
      {lean: true}
    );

    // get order monthly sales summary
    const orderSalesSummary = await this.orderService.findOrderMonthlyAmount({
      // order within the month
      dateFr: moment().utcOffset(utcOffset).year(year).startOf('year').toDate(),
      dateTo: moment().utcOffset(utcOffset).year(year).endOf('year').toDate(),
      // exclude cancelled order
      statuses: [
        OrderStatus.PREPARE_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.COMPLETED
      ]
    });

    // loop 12 months and return
    return [...Array(12).keys()]
      .map(month => {
        const yearMonth = `${year}-${
          month + 1 < 10 ? `0${month + 1}` : month + 1
        }`;
        // find sales volume of the month
        const salesVolume = salesVolumes.find(s => s.time === yearMonth);
        // target amount of the month
        const target = salesVolume?.amount ?? 0;

        // find order sales of the month
        const orderSales = orderSalesSummary.find(
          o => o.yearMonth === yearMonth
        );
        // extract amount from order sales (default 0)
        const salesAmount: number = orderSales?.total ?? 0;

        return {
          _id: salesVolume ? salesVolume._id : null,
          year,
          target,
          currency,
          salesAmount,
          month: month + 1,
          // archievement rate = sales / target, 0 if any of value not applicable
          achievementRate:
            target > 0 && salesAmount > 0 ? salesAmount / target : 0
        };
      })
      .sort((a, b) => b.month - a.month);
  }

  /**
   * update salesVolume
   * @param _id
   * @param updateModel
   * @param options
   */
  public async updateSalesVolume(
    _id: string,
    updateModel: SalesVolumeFormUpdateModel
  ) {
    // parse new time
    const time = moment(updateModel.time).format('YYYY-MM');

    // validate duplicate time
    const sales = await this.findOne({notId: _id, time});
    if (sales) {
      throw new BadRequestException({
        code: 'err_sales_volume_exist'
      });
    }

    return this.update(_id, {...updateModel, time}, {lean: true});
  }
}
