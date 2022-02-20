// import {
//   IsString,
//   IsBoolean,
//   IsNotEmpty,
//   IsOptional,
//   ValidateNested
// } from 'class-validator';
// import {ApiPropertyOptional} from '@nestjs/swagger';
import {BaseSearchModel} from 'src/core/models';

export class CouponLogSearchModel extends BaseSearchModel {
  user?: string;

  coupon?: string;
}
