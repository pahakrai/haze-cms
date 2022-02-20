import {Injectable, Scope, Inject, BadRequestException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {PaginateModel} from 'mongoose';

import {Stripe} from '../../../lib/stripe';

// interfaces & models
import {
  WalletBankCardCreateModel,
  WalletBankCardUpdateModel,
  WalletBankCardSearchModel
} from './models';
import {IWalletBankCard, IWalletBankCardService} from './interfaces';
import {WalletBankCardChargeModel} from './models/walletBankCard.charge.model';
// eslint-disable-next-line max-len
import {WalletBankCardTransactionService} from '../WalletBankCardTransaction/walletBankCardTransaction.service';
import {IWallet} from '../Wallet/interfaces';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

@Injectable({scope: Scope.REQUEST})
export class WalletBankCardService
  extends BaseCRUDService<
    IWalletBankCard,
    WalletBankCardCreateModel,
    WalletBankCardUpdateModel,
    WalletBankCardSearchModel
  >
  implements IWalletBankCardService {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WalletBankCards')
    private readonly walletBankCardRepository: PaginateModel<IWalletBankCard>,
    @InjectModel('Wallets')
    private readonly walletRepository: PaginateModel<IWallet>,
    private readonly walletBankCardTransactionService: WalletBankCardTransactionService
  ) {
    super(walletBankCardRepository, request);
  }

  public _castQuery(query: WalletBankCardSearchModel) {
    return query;
  }

  public async chargeCard(transaction: WalletBankCardChargeModel) {
    let source = '';
    let customer: string;
    let bankCard: IWalletBankCard = null;

    // get stripe source of wallet
    if (!transaction.sourceId && !transaction.cardId) {
      throw new Error('cardId or sourceId must be included');
    } else if (transaction.cardId) {
      // retrieve source id from bank card and it's wallet
      bankCard = await this.findById(transaction.cardId);
      if (!bankCard) {
        throw new Error('bank card not found');
      }

      const wallet = await this.walletRepository.findById(bankCard.wallet);
      if (!wallet) {
        throw new Error('wallet not found');
      }
      source = bankCard.stripeSource;
      customer = wallet.stripeCustomerId;
    } else {
      // source id is provided
      source = transaction.sourceId;
    }

    // charge card through stripe
    let stripeCharge;
    const stripe = new Stripe(transaction.stripeKey);
    try {
      stripeCharge = await stripe.charge({
        amount: stripe.convertCharge(transaction.amount),
        currency: transaction.currency,
        customer,
        source,
        description: transaction.description,
        capture: transaction.chargeImmediately
      });
    } catch (e) {
      // charge error, throw translated message
      throw new BadRequestException({code: `err_stripe_${e.code}`});
    }

    if (bankCard) {
      // log bank card charge
      const log = await this.walletBankCardTransactionService.create({
        walletBankCard: bankCard._id.toHexString(),
        event: 'default',
        description: transaction.description,
        change: transaction.amount,
        amount: transaction.amount,
        stripeLog: stripeCharge
      });
      console.info('stripeCharge log', log);
    }

    if (!stripeCharge.paid) {
      // payment error
      throw new Error('card charge not successful');
    }

    return stripeCharge;
  }

  // Override
  public async create(model: WalletBankCardCreateModel) {
    const wallet = await this.walletRepository.findById(model.wallet);
    if (!wallet) {
      throw new Error('wallet not found');
    }

    // update stripe
    const stripe = new Stripe('');
    await stripe.addCustomerSource(
      wallet.stripeCustomerId,
      model.stripeSource,
      model.default
    );

    // if new card is default, change current cards to default: false
    if (model.default) {
      const session = this.getMongoSession();

      // not using super.updateMany() since it will run
      // updateMany() & find(), which not required here
      await this.walletBankCardRepository
        .updateMany(
          {
            wallet: model.wallet
          },
          {$set: {default: false}}
        )
        .session(session)
        .exec();
    }

    // create new bank card
    return super.create(model);
  }

  /**
   * get no. of card hold by wallet
   * @param wallet wallet id
   */
  public async getCount(wallet: string) {
    const count = await this.walletBankCardRepository
      .countDocuments({
        wallet
      })
      .exec();

    return count;
  }

  public async setDefaultBankCard(walletId: string, bankCardId: string) {
    const bankCard = await this.findOne({
      wallet: walletId,
      brand: bankCardId
    });
    const wallet = await this.walletRepository.findById(walletId);

    if (!(wallet && bankCard)) {
      throw new BadRequestException({});
    }

    // calling stripe
    const stripe = new Stripe('');
    await stripe.setCustomerDefaultSource(
      wallet.stripeCustomerId,
      bankCard.stripeSource
    );

    // update database and return
    return this.updateDefaultCard(walletId, bankCardId);
  }

  public async updateDefaultCard(walletId: string, bankCardId: string) {
    // set others to {default: false}

    // not using super.updateMany() since it will run
    // updateMany() & find(), which is not required here
    const session = this.getMongoSession();
    await this.walletBankCardRepository
      .updateMany(
        {
          wallet: walletId,
          _id: {$ne: bankCardId}
        },
        {$set: {default: false}}
      )
      .session(session)
      .exec();

    // update target bank-card to default: true and return it
    const bankCard = await this.update(bankCardId, {default: true});

    return bankCard;
  }
}
