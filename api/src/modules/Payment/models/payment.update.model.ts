import {IsNumber, IsOptional, IsEmpty} from 'class-validator';
import {PaymentTransactionModel} from './payment.transaction.model';

export class PaymentUpdateModel {
  @IsNumber()
  @IsOptional()
  status?: number;

  @IsEmpty()
  $push?: {transactions: PaymentTransactionModel};
}
