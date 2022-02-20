import {IsOptional, IsBoolean} from 'class-validator';
import {BaseSearchModel} from 'src/core/models';

export class CustomerEnquirySearchModel extends BaseSearchModel {
  @IsBoolean()
  @IsOptional()
  isFollow?: boolean;
}
