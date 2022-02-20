import {AuthConfig} from './AuthConfig.interface';
import {AuthConfigContactMethodDetail} from './AuthConfigContactMethodDetail.interface';

export interface AuthConfigContactMethodDetailWithConfig
  extends AuthConfigContactMethodDetail {
  config: AuthConfig;
  get: (field: string) => any;
}
