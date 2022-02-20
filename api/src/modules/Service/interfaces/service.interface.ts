import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeString} from 'src/core';
import {Workspace} from 'src/modules/Workspace/interfaces';

export interface Service extends Document {
  _id: ObjectId;

  workspace: Workspace | Workspace['_id'];
  /**
   * service name (multi-locale)
   */
  name: LocalizeString;

  /**
   * service description (multi-locale)
   */
  description: LocalizeString;

  /**
   * service type (defined in common)
   */
  type: string;

  /**
   * alias
   */
  alias: string;

  /**
   * unit of measure (defined in common)
   */
  unit: string;

  /**
   * if true, it is configurable by users
   * if false, only configurable by admin
   */
  isConfigurable: boolean;

  /**
   * unit meta?
   */
  unitMeta: any;

  /**
   * condition to display service
   */
  conditions: Array<{
    key: string;
    comparison: string;
    value: any;
  }>;

  /**
   * display some special badge
   */
  isUserInfo: boolean;

  /**
   * if true, driver is required to have this service in order to accept
   */
  isMatchCriteria: boolean;

  /**
   * is active?
   */
  isActive: boolean;
}

export type ServiceModel = PaginateModel<Service>;
