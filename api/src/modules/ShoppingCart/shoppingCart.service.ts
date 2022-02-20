import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {
  BadRequestException
  // ForbiddenException,
  // BadRequestException
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  ShoppingCartCreateModel,
  ShoppingCartUpdateModel,
  ShoppingCartSearchModel,
  ShoppingCartItemModel,
  ShoppingCartItemsUpdateModel
} from './models';
import {ShoppingCartModel, ShoppingCart} from './interfaces';
import {ProductService} from '../Product/product.service';
import {ProductSkuService} from '../Product/submodules/ProductSku/productSku.service';
import {IUser} from '../User';

@Injectable({scope: Scope.REQUEST})
export class ShoppingCartService extends BaseCRUDService<
  ShoppingCart,
  ShoppingCartCreateModel,
  ShoppingCartUpdateModel,
  ShoppingCartSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('ShoppingCarts')
    private readonly shoppingCartRepository: ShoppingCartModel,
    private readonly productService: ProductService,
    private readonly productSkuService: ProductSkuService
  ) {
    super(shoppingCartRepository, request);
  }

  public _castQuery(searchModel: ShoppingCartSearchModel) {
    const query: any = {};
    const {user} = searchModel;

    if (user) {
      query.user = user;
    }

    return searchModel;
  }

  /**
   * add item to shopping cart
   * will create a new cart if not exists
   *
   * @param item porduct (SKU) to be add
   */
  public async addToCart(item: ShoppingCartItemModel) {
    await this.checkMaxAllow(item?.product, item?.productSku, item.qty);

    // get current user's cart
    const shoppingCart = await this.getMyShoppingCart();

    if (!shoppingCart) {
      throw new BadRequestException({code: 'err_cart_not_found'});
    }

    let isExist = false;
    // If product and productsku exist, increase the quantity
    isExist = shoppingCart.items.some(i => {
      return (
        i.product.toString() === item?.product &&
        i.productSku.toString() === item?.productSku
      );
    });
    if (isExist) {
      // update item qty
      return this.shoppingCartRepository.findOneAndUpdate(
        {
          _id: shoppingCart._id.toHexString(),
          'items.product': item?.product,
          'items.productSku': item?.productSku
        },
        {
          $inc: {
            'items.$.qty': item?.qty
          }
        },
        {new: true}
      );
    } else {
      // add item
      return this.update(
        shoppingCart._id.toHexString(),
        {$push: {items: item}},
        {lean: true}
      );
    }
  }

  /**
   * check max allow
   * @param productId       need to check the product
   * @param productSkuId    need to check the productskus
   * @param qty             quantity
   */
  public async checkMaxAllow(
    productId: string,
    productSkuId: string,
    qty: number
  ) {
    const product = await this.productService.findById(productId);
    const productSku = await this.productSkuService.findById(productSkuId);

    if (!product) {
      throw new BadRequestException({code: 'err_product_not_found'});
    }
    if (!productSku) {
      throw new BadRequestException({code: 'err_productSku_not_found'});
    }
    if (product.maxAllow !== 0 && product.maxAllow < qty) {
      throw new BadRequestException({code: 'err_exceed_maxAllow'});
    }
    if (productSku.maxAllow !== 0 && productSku.maxAllow < qty) {
      throw new BadRequestException({code: 'err_exceed_maxAllow'});
    }
  }

  /**
   * clear shopping cart for current user
   */
  public async clearMyCart() {
    const user = this.getCurrentUser<IUser>();
    const session = this.getMongoSession();

    return this.shoppingCartRepository
      .findOneAndUpdate({user: user._id}, {items: []}, {new: true, session})
      .exec();
  }

  /**
   * get shopping cart of current user
   * return dummy cart object if cart not exist
   */
  public async getMyShoppingCart() {
    let shoppingCart: ShoppingCart;
    const user = this.getCurrentUser<IUser>();
    shoppingCart = await this.findOne(
      {user: user._id.toHexString()},
      {lean: true}
    );

    // cart not found, create empty cart
    if (!shoppingCart) {
      shoppingCart = await this.create(
        {user: user._id.toHexString()},
        {lean: true}
      );
    }
    return shoppingCart;
  }

  /**
   * remove item from cart
   *
   * @param itemId item to be removed from cart
   */
  public async removeItem(itemId: string) {
    const itemIds: Array<string> = [];
    itemIds.push(itemId);

    return this.removeItems(itemIds);
  }

  /**
   * remove items from cart
   *
   * @param itemIds items to be removed from cart
   */
  public async removeItems(itemIds: Array<string>) {
    const user = this.getCurrentUser<IUser>();
    const shoppingCart = await this.findOne(
      {user: user._id.toHexString()},
      {lean: true}
    );

    // cart not found, throw exception
    if (!shoppingCart) {
      throw new BadRequestException({code: 'err_cart_not_found'});
    }

    return this.update(
      shoppingCart._id,
      {$pull: {items: {_id: itemIds}}},
      {lean: true}
    );
  }

  public async removeItemsByProsuctSKU(productSKUs: string[]) {
    const user = this.getCurrentUser<IUser>();

    const shoppingCart = await this.findOne(
      {user: user._id.toHexString()},
      {lean: true}
    );

    // cart not found, throw exception
    if (!shoppingCart) {
      return;
    }

    return this.update(
      shoppingCart._id,
      {$pull: {items: {productSku: productSKUs}}},
      {lean: true}
    );
  }

  /**
   * update item from cart
   * @param itemIds     cart item id
   * @param qty         quantity
   */
  public async updateItem(itemsUpdateModel: ShoppingCartItemsUpdateModel[]) {
    const user = this.getCurrentUser<IUser>();
    const session = this.getMongoSession();

    // filter item id
    const ids = itemsUpdateModel.map(i => {
      return i.itemId;
    });

    // get shoppingCart by items id
    const shoppingCart = await this.shoppingCartRepository.findOne({
      user: user._id.toHexString(),
      'items._id': {$in: ids}
    });

    // shoppingCart not exist
    if (!shoppingCart) {
      throw new BadRequestException({code: 'err_cart_not_found'});
    }

    for (let i = 0; i < itemsUpdateModel.length; i++) {
      let productId = null;
      let productSkuId = null;
      shoppingCart.items.filter(item => {
        if (item._id.toString() === itemsUpdateModel[i].itemId) {
          productId = item.product;
          productSkuId = item.productSku;
        }
      });
      // check product and product sku max allow
      await this.checkMaxAllow(
        productId,
        productSkuId,
        itemsUpdateModel[i].qty
      );
      return this.shoppingCartRepository
        .findOneAndUpdate(
          {
            user: user._id.toHexString(),
            'items._id': itemsUpdateModel[i].itemId
          },
          {
            $set: {
              'items.$.qty': itemsUpdateModel[i].qty
            }
          },
          {new: true}
        )
        .session(session)
        .exec();
    }
  }
}
