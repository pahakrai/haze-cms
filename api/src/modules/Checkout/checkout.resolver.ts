import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {CheckoutService} from './checkout.service';
// import {CheckoutModel} from './interfaces';

@RequireLogin()
@Resolver('Checkout')
@UseFilters(GraphQLExceptionFilter)
export class CheckoutResolver {
  constructor(private readonly checkoutService: CheckoutService) {}

  @ResolveField('order')
  async getOrder(@Parent() checkout) {
    if (!checkout.order) {
      return null;
    }

    const {order} = await this.checkoutService._populate(checkout, ['order']);

    return order;
  }

  @ResolveField('payment')
  async getPayment(@Parent() checkout) {
    if (!checkout.payment) {
      return null;
    }

    const {payment} = await this.checkoutService._populate(checkout, ['order']);

    return payment;
  }

  @Query()
  async getCheckout(@Args('id') id: string) {
    return this.checkoutService.findById(id);
  }

  @Mutation()
  async checkout(
    @Args('checkoutOrderModel') checkoutOrderModel,
    @Args('finalize') finalize
  ) {
    return this.checkoutService.checkout(checkoutOrderModel, {finalize});
  }

  @Mutation()
  async finalize(@Args('id') id, @Args('payment') payment) {
    return this.checkoutService.finalize(id, payment);
  }
}
