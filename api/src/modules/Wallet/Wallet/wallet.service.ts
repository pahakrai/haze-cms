import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {PaginateModel} from 'mongoose';

// core
import {Stripe} from '../../../lib/stripe';

// interfaces & models
import {
  WalletCreateModel,
  WalletUpdateModel,
  WalletSearchModel
} from './models';
import {IWallet, IWalletService, IWalletInfo} from './interfaces';
import {WalletBalanceService} from '../WalletBalance/walletBalance.service';
import {WalletBankCardService} from '../WalletBankCard/walletBankCard.service';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
@Injectable({scope: Scope.REQUEST})
export class WalletService
  extends BaseCRUDService<
    IWallet,
    WalletCreateModel,
    WalletUpdateModel,
    WalletSearchModel
  >
  implements IWalletService {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Wallets')
    private readonly walletRepository: PaginateModel<IWallet>,
    private readonly walletBalanceService: WalletBalanceService,
    private readonly walletBankCardService: WalletBankCardService
  ) {
    super(walletRepository, request);
  }

  public _castQuery(query: WalletSearchModel): any {
    return query;
  }

  public async create(walletObj: WalletCreateModel) {
    const {bankCards, isEmailUnique, ...walletFields} = walletObj;
    // initial checkings
    if (isEmailUnique && (await this.isEmailExists(walletFields.email))) {
      throw new Error('email already exists');
    }
    // add customer to stripe
    const stripe = new Stripe('');
    const customer = await stripe.addCustomer(walletFields.email.toLowerCase());
    // create the wallet
    const newWallet = await this.repository.create({
      stripeCustomerId: customer.id,
      email: walletFields.email.toLowerCase(),
      name: walletFields.name,
      type: walletFields.type
    });
    // create a balance for the wallet
    const newBalance = await this.walletBalanceService.create({
      wallet: newWallet._id.toHexString(),
      type: 'default',
      amount: walletFields.balance
    });
    // if there are bankCards, create the cards as well
    const newBankCards = [];
    if (bankCards && bankCards.length) {
      for (const bankCard of bankCards) {
        newBankCards.push(await this.walletBankCardService.create(bankCard));
      }
    }

    // save all items
    await newWallet.save();
    await newBalance.save();
    for (const newBankCard of newBankCards) {
      newBankCard.save();
    }
    // return the new wallet object
    return newWallet.toObject();
  }

  public async getFirstOrCreateWalletByEmail(email: string): Promise<IWallet> {
    const wallets = await this.getWalletsByEmail(email);
    if (wallets.length) {
      // already have wallet, just return first one
      return wallets[0];
    }
    // there are no wallets with this email,
    // so create one and return
    return this.create({
      email,
      name: '',
      isEmailUnique: false,
      balance: 0,
      bankCards: []
    });
  }

  /**
   * get more than 1 wallet balance with specific types
   * @param walletId wallet id
   * @param type wallet type
   */
  public async getWalletBalances(walletId: string, types: string[]) {
    const walletBalances = await this.walletBalanceService.find({
      wallet: walletId,
      types
    });

    // if wallet balance empty, check if wallet exist
    // and throw error if not exist
    if (!walletBalances.length) {
      const wallet = await this.findById(walletId);
      if (!wallet) {
        throw new Error('Wallet not found');
      }
    }

    return walletBalances;
  }

  /**
   * get wallet detail info (balance, no. of bank cards)
   * @param walletId wallet id
   */
  public async getWalletInfo(walletId: string): Promise<IWalletInfo> {
    const wallet = await this.findById(walletId);

    // wallet not found, return null
    if (!wallet) {
      return null;
    }

    // get no. of bank card
    const bankCardCount = await this.walletBankCardService.getCount(walletId);
    // get default balance
    const balance = await this.walletBalanceService.findOne({
      wallet: walletId,
      type: 'default'
    });

    return Object.assign(wallet, {
      bankCardCount,
      balance: balance ? balance.amount : 0
    });
  }

  public async getWalletsByEmail(email: string): Promise<IWallet[]> {
    return this.walletRepository.find({
      email: {$regex: new RegExp(email, 'i')}
    });
  }

  /**
   * check whether wallet with @param email already exists
   * @param email email address
   */
  public async isEmailExists(email: string): Promise<boolean> {
    const count = await this.walletRepository
      .countDocuments({
        email: {$regex: new RegExp(email, 'i')}
      })
      .exec();

    return count > 0;
  }
}
