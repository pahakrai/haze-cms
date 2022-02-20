import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {BadRequestException} from 'src/core';

// interfaces & models
import {
  PaymentMethodCreateModel,
  PaymentMethodUpdateModel,
  PaymentMethodSearchModel
} from './models';
import {PaymentMethodModel, PaymentMethod} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class PaymentMethodService extends BaseCRUDService<
  PaymentMethod,
  PaymentMethodCreateModel,
  PaymentMethodUpdateModel,
  PaymentMethodSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('PaymentMethods')
    private readonly paymentMethodRepository: PaymentMethodModel
  ) {
    super(paymentMethodRepository, request);
  }

  public _castQuery(searchModel: PaymentMethodSearchModel) {
    const query: any = {};
    const {q, isActive} = searchModel;

    if (q) {
      const qReg = new RegExp(q, 'i');
      query.$or = [
        {
          code: qReg
        },
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
    }
    if (typeof isActive === 'boolean') {
      query.isActive = isActive;
    }

    return query;
  }

  public async deletePaymentMethod(_id: string) {
    const paymentMethod = await this.findById(_id);
    if (!paymentMethod)
      throw new BadRequestException({
        code: 'err_paymentMethod_not_found'
      });
    if (paymentMethod.isActive === true)
      throw new BadRequestException({
        code: 'err_delete_not'
      });
    return super.delete(_id);
  }
}
