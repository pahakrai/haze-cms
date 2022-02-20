import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class AuthConfigSearchModel extends BaseSearchModel {
  userTypes?: string[];

  workspaces?: string[];

  workspace?: string;
}
