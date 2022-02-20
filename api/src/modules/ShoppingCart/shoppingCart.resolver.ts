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
import {ShoppingCartService} from './shoppingCart.service';

@RequireLogin()
@Resolver('ShoppingCart')
@UseFilters(GraphQLExceptionFilter)
export class ShoppingCartResolver {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ResolveField('user')
  async getUser(@Parent() shoppingCart) {
    const {user} = await this.shoppingCartService._populate(shoppingCart, [
      'user'
    ]);

    return user;
  }

  @ResolveField('items')
  async getItems(@Parent() shoppingCart) {
    if (!(shoppingCart.items?.length > 0)) {
      return [];
    }

    // populate items.product
    const {items} = await this.shoppingCartService._populate(shoppingCart, [
      '$items.product',
      '$items.productSku'
    ]);
    return items;
  }

  @Query()
  async myShoppingCart() {
    return this.shoppingCartService.getMyShoppingCart();
  }

  @Mutation()
  async addToShoppingCart(@Args('item') item) {
    return this.shoppingCartService.addToCart(item);
  }

  @Mutation()
  async updateCartItem(@Args('itemsUpdateModel') itemsUpdateModel) {
    return this.shoppingCartService.updateItem(itemsUpdateModel);
  }

  @Mutation()
  async removeItemFromCart(@Args('itemId') itemId) {
    return this.shoppingCartService.removeItem(itemId);
  }

  @Mutation()
  async removeItemsFromCart(@Args('itemIds') itemIds) {
    return this.shoppingCartService.removeItems(itemIds);
  }

  @Mutation()
  async clearCart() {
    return this.shoppingCartService.clearMyCart();
  }
}
