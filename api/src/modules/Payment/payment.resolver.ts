import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  processMultiUpload,
  RequireLogin
} from 'src/core';
import {PaymentService} from './payment.service';

@Resolver('Payment')
@UseFilters(GraphQLExceptionFilter)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @ResolveField('order')
  async getOrder(@Parent() payment) {
    if (!payment.order) {
      return null;
    }
    const {order} = await this.paymentService._populate(payment, ['order']);
    return order;
  }

  @ResolveField('transactions')
  async getTransactions(@Parent() payment) {
    if (!payment.transactions.length) {
      return [];
    }
    const {transactions} = await this.paymentService._populate(payment, [
      '$transactions.paymentMethod',
      '$transactions.files'
    ]);
    return transactions;
  }

  @Query()
  async payment(@Args('id') id: string) {
    return this.paymentService.findById(id, {lean: true});
  }

  @Query()
  async payments(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.paymentService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  @RequireLogin()
  async paymentByOrderId(@Args('orderId') orderId) {
    return this.paymentService.findOne({
      order: orderId
    });
  }

  @Mutation()
  @RequireLogin()
  async createPayment(
    @Args('paymentCreateModel') paymentCreateModel,
    @Args('files')
    files
  ) {
    // save file stream to uploads/
    const uploadedFiles = await processMultiUpload(files);
    return this.paymentService.createPayment(paymentCreateModel, uploadedFiles);
  }

  @Mutation()
  @RequireLogin()
  async updatePayment(
    @Args('id') id: string,
    @Args('paymentUpdateModel') paymentUpdateModel
  ) {
    return this.paymentService.update(id, paymentUpdateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async appendTransaction(
    @Args('id') id: string,
    @Args('transaction') transaction,
    @Args('files') files
  ) {
    // save file stream to uploads/
    const uploadedFiles = await processMultiUpload(files);
    return this.paymentService.appendTransaction(
      id,
      {...transaction, _paymentMethod: transaction.paymentMethod},
      uploadedFiles
    );
  }

  @Mutation()
  @RequireLogin()
  async updateTransaction(
    @Args('id') id: string,
    @Args('transactionId') transactionId: string,
    @Args('transaction') transaction,
    @Args('files') files
  ) {
    // save file stream to uploads/
    const uploadedFiles = await processMultiUpload(files);
    return this.paymentService.updateTransaction(
      id,
      transactionId,
      {
        ...transaction,
        _paymentMethod: transaction.paymentMethod
      },
      uploadedFiles
    );
  }
}
