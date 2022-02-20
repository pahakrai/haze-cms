import {
  Query,
  Args,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';

import {GroupService} from './group.service';
import {PolicyService} from '../Policy/policy.service';

@Resolver('Group')
export class GroupResolver {
  constructor(
    private readonly groupSerivce: GroupService,
    private readonly policyService: PolicyService
  ) {}

  @Query()
  async group() {
    return this.groupSerivce.findGroup({});
  }

  @Query('groups')
  async groups() {
    return this.groupSerivce.findGroups({});
  }

  @ResolveField('users')
  async getUsers(@Parent() parent) {
    return null;
  }

  @ResolveField('policies')
  async getPolicies(@Parent() parent) {
    return this.policyService.findPolicies({_ids: parent.policies});
  }

  @Mutation('createGroup')
  async createGroup(
    @Args('name') name,
    @Args('users') users,
    @Args('policies') policies
  ) {
    return this.groupSerivce.create({name, users, policies});
  }

  @Mutation('updateGroup')
  async updateGroup(
    @Args('id') id,
    @Args('name') name,
    @Args('users') users,
    @Args('policies') policies
  ) {
    return this.groupSerivce.update(id, {name, users, policies});
  }
}
