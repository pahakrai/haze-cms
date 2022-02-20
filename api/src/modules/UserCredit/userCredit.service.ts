import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
// import {ObjectId} from 'mongodb';
import common from '@golpasal/common';

// core
import {BaseCRUDService, BadRequestException} from 'src/core';

// interfaces & models
import {
  UserCreditCreateModel,
  UserCreditUpdateModel,
  UserCreditSearchModel
} from './models';
import {IUserCreditModel, IUserCredit} from './interfaces';

const {TransactionType} = common.type;

@Injectable({scope: Scope.REQUEST})
export class UserCreditService extends BaseCRUDService<
  IUserCredit,
  UserCreditCreateModel,
  UserCreditUpdateModel,
  UserCreditSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('UserCredits')
    private readonly userCreditRepository: IUserCreditModel
  ) {
    super(userCreditRepository, request);
  }

  public _castQuery(searchModel: UserCreditSearchModel) {
    const query: any = {};
    const {userId, amountType, transactionType, currency} = searchModel;

    if (userId) {
      query.user = userId;
    }
    if (amountType) {
      query.amountType = amountType;
    }
    if (currency) {
      currency === 'null' ? null : currency;
    }

    if (transactionType) {
      query.transactionType = transactionType;
    }

    return query;
  }

  // Override
  public async create(model: UserCreditCreateModel) {
    // calculate latest balance
    const prevBalance = await this.getBalance(
      model.user,
      model.amountType,
      model.currency
    );
    const balance =
      model.transactionType === TransactionType.IN
        ? prevBalance + model.amount
        : prevBalance - model.amount;

    if (balance < 0) {
      throw new BadRequestException({code: 'err_user_balance_overdraft'});
    }
    // set new balance
    model.balance = balance;

    // create UserBalance
    return super.create(model);
  }

  /**
   * the latest balance of user
   *
   * @param userId user ID
   */
  public async getBalance(
    userId: string,
    amountType: string,
    currency: string = null
  ) {
    const lastUserCredit = await this.find(
      {
        userId,
        amountType,
        currency: currency === 'null' ? null : currency
      },
      {sort: {transactionDate: -1}, limit: 1}
    );

    if (lastUserCredit.length === 0) {
      // no credit history for this user
      return 0;
    }

    // return balance of the last transaction
    return lastUserCredit[0].balance;
  }

  /**
   * get credit history list of a user
   *
   * @param userId user ID
   */
  public async getUserHistory(
    userId: string,
    amountType: string,
    currency: string = null
  ) {
    return super.find(
      {userId, amountType, currency},
      {
        lean: true,
        sort: {transactionDate: 1}
      }
    );
  }
}
