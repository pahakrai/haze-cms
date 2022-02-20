import {IProductReview} from './IProductReview';
import {ProductReviewCreateModel, ProductReviewUpdateModel} from '../models';

export interface IProductReviewService {
  create(
    productreviewCreateModel: ProductReviewCreateModel
  ): Promise<IProductReview>;
  findById(_id: string): Promise<IProductReview | null>;
  update(
    _id: string,
    ProductReviewUpdateModel: ProductReviewUpdateModel
  ): Promise<IProductReview | null>;
  delete(_id: string): void;
}
