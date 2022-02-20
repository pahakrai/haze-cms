// import {
//   IsString,
//   IsBoolean,
//   IsNotEmpty,
//   IsOptional,
//   ValidateNested
// } from 'class-validator';
// import {ApiProperty} from '@nestjs/swagger';

import {ObjectId} from 'mongodb';

export class CouponLogCreateModel {
  user: string | ObjectId;

  workspace: string | ObjectId;

  coupon: string | ObjectId;
}
