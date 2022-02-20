import {UseFilters} from '@nestjs/common';
import {Args, Query, Resolver} from '@nestjs/graphql';
import {GraphQLExceptionFilter} from 'src/core';

import {ParamService} from './param.service';

@Resolver('Param')
@UseFilters(GraphQLExceptionFilter)
export class ParamResolver {
  constructor(private readonly paramService: ParamService) {}

  @Query()
  paramSupportContact() {
    return this.paramService.getSupportContact();
  }

  @Query()
  paramFeedbackSeleciton() {
    return this.paramService.paramFeedbackSelection();
  }

  @Query()
  param(@Args('type') type: string) {
    return this.paramService.getParameter(type);
  }
}
