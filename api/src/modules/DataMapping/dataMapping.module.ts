import {Module} from '@nestjs/common';

import {DataMappingController} from './dataMapping.controller';
import {DataMappingService} from './dataMapping.service';
import {DataMappingResolver} from './dataMapping.resolver';

@Module({
  imports: [],
  controllers: [DataMappingController],
  providers: [DataMappingService, DataMappingResolver],
  exports: [DataMappingService]
})
export class DataMappingModule {}
