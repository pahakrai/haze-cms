import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/userCredit.schemas';
import {UserCreditController} from './userCredit.controller';
import {UserCreditService} from './userCredit.service';
import {UserCreditResolver} from './userCredit.resolver';
import {UserModule} from '../User';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName,
        schema: Schema
      }
    ]),
    UserModule
  ],
  controllers: [UserCreditController],
  providers: [UserCreditService, UserCreditResolver],
  exports: [UserCreditService]
})
export class UserCreditModule {}
