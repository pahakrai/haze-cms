import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {PolicyService} from './policy.service';
@Resolver('Policy')
export class PolicyResolver {
  constructor(private readonly policyService: PolicyService) {}

  @Query()
  async policy() {
    return this.policyService.findPolicy({});
  }

  @Query('policies')
  async policies() {
    return this.policyService.findPolicies({});
  }

  @Mutation('createPolicy')
  async createPolicy(@Args('statement') statement) {
    return this.policyService.create({
      Statement: statement
    });
  }

  @Mutation('updatePolicy')
  async updatePolicy(@Args('id') id, @Args('statement') statement) {
    return this.policyService.updatePolicy(
      {
        _id: id
      },
      {Statement: statement}
    );
  }
}
