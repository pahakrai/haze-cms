import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {LocalizeString} from 'src/core';
import {WorkspaceMetaModel} from 'src/modules/Workspace/models';

interface WorkspaceTypeFile {
  /**
   * file display name
   */
  name: LocalizeString;

  /**
   * file type e.g. license doc, ID card...etc
   */
  fileType: string;
}

interface WorkspaceTypeConfigPreference {
  // preference requirement for member/merchant/user
  preference: string;
  // value for workspace and user optional or not
  required: boolean;
  // if provided ref the value of the preference is id of a collection
  ref: string;
}

interface UserTypeConfig {
  /**
   * user type
   * diff user type require different files
   */
  userType: string;

  /**
   * specific file(s) required for workspaceType+userType combo
   */

  files: WorkspaceTypeFile[];

  meta: WorkspaceMetaModel[];

  preferences: WorkspaceTypeConfigPreference[];
}

interface UserTypeDisplay {
  type: string;

  name: LocalizeString;

  isShow: boolean;
}

interface ServiceTypeDisplay {
  type: string;

  name: LocalizeString;

  isShow: boolean;
}

export interface WorkspaceType extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * workspace type
   */
  type: string;

  payrollPayeeUserType: string;

  userTypeConfigs: UserTypeConfig[];

  userTypeDisplay: UserTypeDisplay[];

  serviceTypeDisplay: ServiceTypeDisplay[];

  // generated by mongoose
  /**
   * create time of this document
   */
  createdAt: Date;

  /**
   * update time of this document
   */
  updatedAt: Date;
}

export type WorkspaceTypeModel = PaginateModel<WorkspaceType>;
