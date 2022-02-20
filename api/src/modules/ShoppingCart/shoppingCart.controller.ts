import {
  Get,
  Body,
  Post,
  Param,
  Controller,
  UseFilters,
  Patch,
  Put
} from '@nestjs/common';
import {BaseController, HttpExceptionFilter, RequireLogin} from 'src/core';
// services
import {ShoppingCartService} from './shoppingCart.service';

// models
import {ShoppingCartItemModel, ShoppingCartItemsUpdateModel} from './models';

@RequireLogin()
@Controller('shopping-carts')
@UseFilters(HttpExceptionFilter)
export class ShoppingCartController extends BaseController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {
    super();
  }

  @Get()
  public async myShoppingCart() {
    return this.shoppingCartService.getMyShoppingCart();
  }

  @Post('add-to-cart')
  public async addToShoppingCart(@Body() item: ShoppingCartItemModel) {
    return this.shoppingCartService.addToCart(item);
  }

  @Patch('remove-item/:itemId')
  public async removeItem(@Param('itemId') itemId: string) {
    return this.shoppingCartService.removeItem(itemId);
  }

  @Put('update-item')
  public async updateItem(@Body() items: ShoppingCartItemsUpdateModel[]) {
    return this.shoppingCartService.updateItem(items);
  }

  @Put('clear-cart')
  public async clearCart() {
    return this.shoppingCartService.clearMyCart();
  }
}
