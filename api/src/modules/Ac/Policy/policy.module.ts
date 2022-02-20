import {Module} from '@nestjs/common';
import {PolicyResolver} from './policy.resolver';
import {PolicyService} from './policy.service';
// import {DatabaseModule} from '../../Database/database.module';
// import {policyProviders} from './policy.providers';
import {PolicyController} from './policy.controller';
import {Schema, CollectionName} from './schemas';
import {MongooseModule} from '@nestjs/mongoose';
// import {policyProviders} from './policy.providers';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  providers: [PolicyResolver, PolicyService],
  controllers: [PolicyController],
  exports: [PolicyResolver, PolicyService]
})
export class PolicyModule {}
