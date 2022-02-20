import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService, MongooseOption} from 'src/core';

// interfaces & models
import {
  CurrencyCreateModel,
  CurrencyUpdateModel,
  CurrencySearchModel
} from './models';
import {Currency, CurrencyModel} from './interfaces';
import {SymbolMap} from './currency.constants';

@Injectable({scope: Scope.REQUEST})
export class CurrencyService extends BaseCRUDService<
  Currency,
  CurrencyCreateModel,
  CurrencyUpdateModel,
  CurrencySearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Currencies')
    private readonly currencyRepository: CurrencyModel
  ) {
    super(currencyRepository, request);
  }

  public _castQuery(searchModel: CurrencySearchModel) {
    const query: any = {};
    const {_ids, q, code} = searchModel;

    if (q || code) {
      query.code = new RegExp(q || code, 'i');
    }

    if (_ids && _ids.length > 0) {
      query._id = {$in: [..._ids]};
    }

    return query;
  }

  // Override
  public async create(
    createModel: CurrencyCreateModel,
    options: MongooseOption
  ) {
    if (!createModel.symbol) {
      createModel.symbol = SymbolMap.get(createModel.code);
    }
    return super.create(createModel, options);
  }
}
