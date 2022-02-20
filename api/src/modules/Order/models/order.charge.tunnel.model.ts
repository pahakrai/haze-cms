import {IsNumber, IsPositive, IsMongoId} from 'class-validator';

export class OrderChargeTunnelModel {
  @IsMongoId()
  tunnel: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
