import {UseFilters} from '@nestjs/common';
import {Resolver} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {DataMappingService} from './dataMapping.service';

@Resolver('DataMapping')
@UseFilters(GraphQLExceptionFilter)
export class DataMappingResolver {
  constructor(private readonly dataMappingService: DataMappingService) {}
}
