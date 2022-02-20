import {IWebMenu} from './IWebMenu';
import {WebMenuCreateModel, WebMenuUpdateModel} from '../models';

export interface IWebMenuService {
  create(webMenuCreateModel: WebMenuCreateModel): Promise<IWebMenu>;
  findById(_id: string): Promise<IWebMenu | null>;
  update(
    _id: string,
    webMenuUpdateModel: WebMenuUpdateModel
  ): Promise<IWebMenu | null>;
  delete(_id: string): void;
}
